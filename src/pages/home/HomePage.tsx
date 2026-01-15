import React, { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import * as ort from "onnxruntime-web";

import { FaMoneyBillWave } from "@react-icons/all-files/fa/FaMoneyBillWave";
import { FaTrashAlt } from "@react-icons/all-files/fa/FaTrashAlt";

import SCEstimator from "../../models/SCLinearRegession";
import CCEstimator from "../../models/CCLinearRegession";

import classes from "./HomePage.module.scss";

import { setCollections } from "../../context/collection/collectionSlice";

ort.env.wasm.simd = true; // Performance-safe defaults
ort.env.wasm.numThreads = navigator.hardwareConcurrency || 4;
ort.env.logLevel = "error"; // Optional: suppress verbose logs

const initInputs = {
  complexity: 1,
  country: 0,
  cavity: 1,
  gf: 0,
  graining: 1,
  thickness: 1.2,
  date: 2025,
  x: 1,
  y: 1,
  z: 1,
};

function HomePage() {
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState(initInputs);
  const [CCSession, setCCSession] = useState<ort.InferenceSession | null>(null);
  const [SCSession, setSCSession] = useState<ort.InferenceSession | null>(null);
  const [ccResult, setCCResult] = useState<number>(0.0);
  const [scResult, setSCResult] = useState<number>(0.0);
  const [meanResult, setMeanResult] = useState<number>(0.0);

  useEffect(() => {
    async function loadModel() {
      const CCSession = await ort.InferenceSession.create(
        "/models/cc_linear.onnx",
        {
          executionProviders: ["wasm"],
        }
      );
      setCCSession(CCSession);

      const SCSession = await ort.InferenceSession.create(
        "/models/sc_linear.onnx",
        {
          executionProviders: ["wasm"],
        }
      );
      setSCSession(SCSession);
    }
    loadModel();
  }, []);

  const changeHandler = (
    evt:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>,
    select: string
  ) => {
    // console.log(select, evt.currentTarget.value);
    let getVal = parseInt(evt.currentTarget.value);
    if (!Number.isNaN(getVal) && select === "thickness") {
      getVal = parseFloat(evt.currentTarget.value);
    }
    setInputs({ ...inputs, [select]: getVal });
  };

  const clearHandler = () => {
    setInputs(initInputs);
    setCCResult(0);
    setSCResult(0);
    setMeanResult(0);
  };

  const estimateHandler = useCallback(async () => {
    let ccPred = 0.0;
    let scPred = 0.0;

    if (CCSession) {
      ccPred = await CCEstimator(CCSession, inputs);
    }
    if (SCSession) {
      scPred = await SCEstimator(SCSession, inputs);
    }
    setCCResult(ccPred);
    setSCResult(scPred);
    setMeanResult((scPred + ccPred) / 2);
    dispatch(
      setCollections({
        inputs,
        kinds: {
          "Closed Cost": ccPred,
          "Shut Cost": scPred,
          "Mean Cost": ((scPred + ccPred) / 2).toFixed(2),
        },
      })
    );
  }, [dispatch, inputs, CCSession, SCSession]);

  return (
    <div className={classes.app}>
      <div className={classes.app_header}>
        <p>Plastic Injection Cost Estimation Application</p>
      </div>

      <div className={classes.app_body}>
        <div className={classes.panel}>
          <div className={classes.section}>
            <label htmlFor="complexity">Complexity</label>
            <select
              name="complexity"
              id="complexity"
              onChange={(evt) => changeHandler(evt, "complexity")}
            >
              <option value="1">Complexity - 1</option>
              <option value="2">Complexity - 2</option>
              <option value="3">Complexity - 3</option>
              <option value="4">Complexity - 4</option>
              <option value="5">Complexity - 5</option>
            </select>
          </div>

          <div className={classes.section}>
            <label htmlFor="country">Mold Country</label>
            <select
              name="country"
              id="country"
              onChange={(evt) => changeHandler(evt, "country")}
            >
              <option value="0">Turkey</option>
              <option value="1">China</option>
            </select>
          </div>

          <div className={classes.section}>
            <label htmlFor="cavity">Cavity</label>
            <select
              name="cavity"
              id="cavity"
              onChange={(evt) => changeHandler(evt, "cavity")}
            >
              <option value="1">Cavity - 1</option>
              <option value="2">Cavity - 2</option>
              <option value="4">Cavity - 4</option>
              <option value="8">Cavity - 8</option>
            </select>
          </div>

          <div className={classes.section}>
            <label htmlFor="date">Macro Date</label>
            <input
              type="number"
              name="date"
              id="date"
              value={inputs.date}
              onChange={(evt) => changeHandler(evt, "date")}
            />
          </div>

          <div className={classes.section}>
            <label htmlFor="x">X (mm)</label>
            <input
              type="number"
              name="x"
              id="x"
              value={inputs.x}
              onChange={(evt) => changeHandler(evt, "x")}
            />
          </div>

          <div className={classes.section}>
            <label htmlFor="y">Y (mm)</label>
            <input
              type="number"
              name="y"
              id="y"
              value={inputs.y}
              onChange={(evt) => changeHandler(evt, "y")}
            />
          </div>

          <div className={classes.section}>
            <label htmlFor="date">Z (mm)</label>
            <input
              type="number"
              name="z"
              id="z"
              value={inputs.z}
              onChange={(evt) => changeHandler(evt, "z")}
            />
          </div>

          <div className={classes.section}>
            <label htmlFor="gf">Glass Fiber</label>
            <select
              name="gf"
              id="gf"
              onChange={(evt) => changeHandler(evt, "gf")}
            >
              <option value="0">False</option>
              <option value="1">True</option>
            </select>
          </div>

          <div className={classes.section}>
            <label htmlFor="thickness">Thickness</label>
            <select
              name="thickness"
              id="thickness"
              onChange={(evt) => changeHandler(evt, "thickness")}
            >
              <option value="1.2">1.2</option>
              <option value="1.5">1.5</option>
              <option value="1.6">1.6</option>
              <option value="2">2</option>
              <option value="2.2">2.2</option>
              <option value="2.5">2.5</option>
              <option value="2.7">2.7</option>
              <option value="2.8">2.5</option>
              <option value="3">3</option>
              <option value="3.5">3.5</option>
              <option value="4">4</option>
              <option value="4.5">4.5</option>
            </select>
          </div>

          <div className={classes.section}>
            <label htmlFor="graining">Graining</label>
            <select
              name="graining"
              id="graining"
              onChange={(evt) => changeHandler(evt, "graining")}
              disabled
            >
              <option value="0">False</option>
              <option value="1">True</option>
            </select>
          </div>

          <div className={classes.section}>
            <button
              className={classes.warning}
              type="button"
              onClick={clearHandler}
            >
              <FaTrashAlt />
            </button>

            <button
              className={classes.success}
              type="button"
              onClick={estimateHandler}
            >
              <FaMoneyBillWave />
            </button>
          </div>
        </div>

        <div className={classes.result}>
          <div className={classes.results}>
            <p>Closed Cost</p> {ccResult} {"$"}
          </div>
          <div className={classes.results}>
            <p>Shut Cost</p> {scResult} {"$"}
          </div>
          <div className={classes.results}>
            <p>Mean Cost</p> {meanResult.toFixed(2)} {"$"}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
