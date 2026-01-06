import React, { useState } from "react";

import classes from "./Home.module.scss";

function Home() {
  const [estimate, setEstimate] = useState<number>(0);

  const estimate_handler = () => {
    setEstimate(1000);
  };

  return (
    <div className={classes.app}>
      <div className={classes.app_header}>
        <p>Plastic Injection Cost Estimation Application</p>
      </div>

      <div className={classes.app_container}>
        <div className={classes.section}>
          <label htmlFor="complexity">Complexity</label>
          <select name="complexity" id="complexity">
            <option value="1">Complexity - 1</option>
            <option value="2">Complexity - 2</option>
            <option value="3">Complexity - 3</option>
            <option value="4">Complexity - 4</option>
            <option value="5">Complexity - 5</option>
          </select>
        </div>

        <div className={classes.section}>
          <label htmlFor="country">Mold Country</label>
          <select name="country" id="country">
            <option value="0">Turkey</option>
            <option value="1">China</option>
          </select>
        </div>

        <div className={classes.section}>
          <label htmlFor="cavity">Cavity</label>
          <select name="cavity" id="cavity">
            <option value="1">Cavity - 1</option>
            <option value="2">Cavity - 2</option>
            <option value="4">Cavity - 4</option>
            <option value="8">Cavity - 8</option>
          </select>
        </div>

        <div className={classes.section}>
          <label htmlFor="gf">Glass Fiber</label>
          <select name="gf" id="gf">
            <option value="0">False</option>
            <option value="1">True</option>
          </select>
        </div>

        <div className={classes.section}>
          <label htmlFor="graining">Graining</label>
          <select name="graining" id="graining">
            <option value="0">False</option>
            <option value="1">True</option>
          </select>
        </div>

        <div className={classes.section}>
          <label htmlFor="thickness">Thickness</label>
          <select name="thickness" id="thickness">
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
          <label htmlFor="date">Macro Date</label>
          <input type="number" name="date" id="date" value={2025} />
        </div>

        <div className={classes.section}>
          <label htmlFor="x">X (mm)</label>
          <input type="number" name="x" id="x" />
        </div>

        <div className={classes.section}>
          <label htmlFor="y">Y (mm)</label>
          <input type="number" name="y" id="y" />
        </div>

        <div className={classes.section}>
          <label htmlFor="date">Z (mm)</label>
          <input type="number" name="z" id="z" />
        </div>

        <div className={classes.section}>
          <button className={classes.warning} type="button">
            Clear
          </button>
          <button
            className={classes.success}
            type="button"
            onClick={estimate_handler}
          >
            Estimate
          </button>
        </div>
      </div>

      <div className={classes.app_result}>
        <p>Result:</p>
        <p>{estimate}</p>
      </div>
    </div>
  );
}

export default Home;
