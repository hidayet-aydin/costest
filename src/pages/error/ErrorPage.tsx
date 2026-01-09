import { FC } from "react";
import { useRouteError } from "react-router-dom";

const ErrorPage: FC = () => {
  const error = useRouteError() as Object;

  let status = 500;
  if ("status" in error) {
    status = Number(error.status);
  }

  let statusText = "An unexpected error occurred.";
  if ("statusText" in error) {
    statusText = String(error.statusText);
  }

  return (
    <>
      <div>
        {"Status:"}
        {status}
      </div>
      <div>
        {"Message:"}
        {statusText}
      </div>
    </>
  );
};

export default ErrorPage;
