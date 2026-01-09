import { FC } from "react";
import { useSelector } from "react-redux";

import classes from "./LogsPage.module.scss";

import { collectionType } from "../../context/collection/collectionSlice";

const LogsPage: FC = () => {
  const collections = useSelector(
    (state: any) => state.collection.collections as collectionType[]
  );
  console.log(collections);
  return (
    <div className={classes.app}>
      <div className={classes.app_header}>
        <p>Action Logs</p>
      </div>

      <div className={classes.app_body}>
        {collections.length === 0 && <>Waiting for actions!</>}
        {collections.length > 0 && (
          <table>
            <tr>
              <th>Complexity</th>
              <th>Mold Country</th>
              <th>Cavity</th>
              <th>Macro Date</th>
              <th>X (mm)</th>
              <th>Y (mm)</th>
              <th>x (mm)</th>
              <th>Cost</th>
            </tr>

            {collections.map((elm, ind) => (
              <tr key={ind}>
                <td>{elm.complexity}</td>
                <td>{elm.country}</td>
                <td>{elm.cavity}</td>
                <td>{elm.date}</td>
                <td>{elm.x}</td>
                <td>{elm.y}</td>
                <td>{elm.z}</td>
                <td>{elm.cost}</td>
              </tr>
            ))}
          </table>
        )}
      </div>
    </div>
  );
};

export default LogsPage;
