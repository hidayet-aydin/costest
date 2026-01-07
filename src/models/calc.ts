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

export async function estimator(
  session: ort.InferenceSession | null,
  initInputs: inputsType
): Promise<number> {
  if (!session) return 0.0;

  const x_new = preprocessSample(initInputs);
  const tensor = new ort.Tensor("float32", x_new, [1, 11]);
  const output = await session.run({ input: tensor });
  const outputName = session.outputNames[0];
  const prediction = Math.exp(Number(output[outputName].data[0]));
  return Math.floor(prediction * 1000) / 1000;
}

function preprocessSample(initInputs: inputsType) {
  const sample = {
    country: [initInputs.country],
    complexity: [initInputs.complexity],
    cavity: [initInputs.cavity],
    date: [initInputs.date],
    a: [initInputs.x],
    b: [initInputs.y],
    c: [initInputs.z],
  };

  const scaParams = {
    a: { mean: 607.73091473, std: 500.76702592 },
    b: { mean: 259.7730155, std: 191.92602203 },
    c: { mean: 142.91213953, std: 129.89410025 },
    date: { mean: 2023.95348837, std: 1.18033279 },
  };

  const catCategories = {
    complexity: [1, 2, 3, 4, 5],
    country: [1, 2],
    cavity: [1, 2, 4],
  };

  const row = [];
  row.push(normalize(sample.a[0], scaParams.a.mean, scaParams.a.std));
  row.push(normalize(sample.b[0], scaParams.b.mean, scaParams.b.std));
  row.push(normalize(sample.c[0], scaParams.c.mean, scaParams.c.std));
  row.push(normalize(sample.date[0], scaParams.date.mean, scaParams.date.std));
  row.push(...oneHotEncode(sample.complexity[0], catCategories.complexity));
  row.push(...oneHotEncode(sample.country[0], catCategories.country));
  row.push(...oneHotEncode(sample.cavity[0], catCategories.cavity));
  console.log({ row });

  return new Float32Array(row);
}
function normalize(value: number, mean: number, std: number) {
  return (value - mean) / std;
}

function oneHotEncode(catValue: number, categories: (number | string)[]) {
  //   const ref = categories[0];
  return categories.slice(1).map((c) => (catValue === c ? 1 : 0));
}
