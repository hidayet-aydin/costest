import { FC } from "react";
import { useSelector, useDispatch } from "react-redux";

import { FaTrashAlt } from "@react-icons/all-files/fa/FaTrashAlt";

import classes from "./LogsPage.module.scss";

import {
  collectionType,
  clearCollections,
} from "../../context/collection/collectionSlice";

const LogsPage: FC = () => {
  const dispatch = useDispatch();
  const collections = useSelector(
    (state: any) => state.collection.collections as collectionType[]
  );

  const clearHandler = () => {
    dispatch(clearCollections({}));
  };

  return (
    <div className={classes.app}>
      <div className={classes.app_header}>
        <p>Logs</p>
      </div>

      <div className={classes.control_panel}>
        <button
          className={classes.warning}
          type="button"
          onClick={clearHandler}
        >
          <FaTrashAlt />
        </button>
      </div>

      <div className={classes.app_body}>
        {collections.length === 0 && <>Waiting for actions!</>}
        {collections.length > 0 && (
          <table>
            <tr>
              <th>Kind</th>
              <th>Complexity</th>
              <th>Mold Country</th>
              <th>Cavity</th>
              <th>Macro Date</th>
              <th>X (mm)</th>
              <th>Y (mm)</th>
              <th>x (mm)</th>
              <th>Thickness</th>
              <th>Glass Fiber</th>
              <th>Cost</th>
            </tr>

            {collections.map((elm, ind) => (
              <tr key={ind}>
                <td>{elm.kind}</td>
                <td>{elm.complexity}</td>
                <td>{elm.country}</td>
                <td>{elm.cavity}</td>
                <td>{elm.date}</td>
                <td>{elm.x}</td>
                <td>{elm.y}</td>
                <td>{elm.z}</td>
                <td>{elm.thickness}</td>
                <td>{elm.gf}</td>
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
