import { FC } from "react";

import classes from "./LogsPage.module.scss";

const LogsPage: FC = () => {
  return (
    <div className={classes.app}>
      <div className={classes.app_header}>
        <p>Action Logs</p>
      </div>

      <div className={classes.app_body}>
        
      </div>
    </div>
  );
};

export default LogsPage;
