import * as ort from "onnxruntime-web";

type inputsType = {
  complexity: number;
  country: number;
  cavity: number;
  gf: number;
  graining: number;
  thickness: number;
  date: number;
  x: number;
  y: number;
  z: number;
};

type scaParamsType = {
  x: {
    mean: number;
    sd: number;
  };
  y: {
    mean: number;
    sd: number;
  };
  z: {
    mean: number;
    sd: number;
  };
  date: {
    mean: number;
    sd: number;
  };
};

async function estimator(
  session: ort.InferenceSession | null,
  initInputs: inputsType
): Promise<number> {
  if (!session) return 0.0;
  const cc_linear = await fetch("/models/cc_linear.json");
  const scaParams = await cc_linear.json();

  const x_new = preprocessSample(initInputs, scaParams);
  const tensor = new ort.Tensor("float32", x_new, [1, 11]);
  const output = await session.run({ input: tensor });
  const outputName = session.outputNames[0];
  const prediction = Math.exp(Number(output[outputName].data[0]));
  return Math.floor(prediction * 1000) / 1000;
}

function preprocessSample(initInputs: inputsType, scaParams: scaParamsType) {
  const sample = {
    country: [initInputs.country],
    complexity: [initInputs.complexity],
    cavity: [initInputs.cavity],
    date: [initInputs.date],
    x: [initInputs.x],
    y: [initInputs.y],
    z: [initInputs.z],
  };

  const catCategories = {
    complexity: [1, 2, 3, 4, 5],
    country: [0, 1],
    cavity: [1, 2, 4],
  };

  const row = [];
  row.push(...oneHotEncode(sample.complexity[0], catCategories.complexity));
  row.push(...oneHotEncode(sample.country[0], catCategories.country));
  row.push(...oneHotEncode(sample.cavity[0], catCategories.cavity));
  row.push(normalize(sample.date[0], scaParams.date.mean, scaParams.date.sd));
  row.push(normalize(sample.x[0], scaParams.x.mean, scaParams.x.sd));
  row.push(normalize(sample.y[0], scaParams.y.mean, scaParams.y.sd));
  row.push(normalize(sample.z[0], scaParams.z.mean, scaParams.z.sd));
  console.log({ row });

  return new Float32Array(row);
}
function normalize(value: number, mean: number, sd: number) {
  return (value - mean) / sd;
}

function oneHotEncode(catValue: number, categories: (number | string)[]) {
  //   const ref = categories[0];
  return categories.slice(1).map((z) => (catValue === z ? 1 : 0));
}

export default estimator;
