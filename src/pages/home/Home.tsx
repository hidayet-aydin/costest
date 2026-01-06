import React from "react";

import classes from "./Home.module.css";

function Home() {
  return (
    <div className={classes.app}>
      <header className={classes.app_header}>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className={classes.app_link}
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default Home;
