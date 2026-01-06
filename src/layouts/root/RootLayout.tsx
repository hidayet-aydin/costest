import { FC } from "react";
import { Outlet } from "react-router-dom";
import { useCookies } from "react-cookie";

import classes from "./RootLayout.module.css";

import Header from "../../components/header/Header";

interface CookieValues {
  lang?: string;
}

const RootLayout: FC = () => {
  const [cookies, setCookie] = useCookies<"lang", CookieValues>(["lang"]);
  if (!cookies.lang) {
    setCookie("lang", "en");
  }

  return (
    <div className={classes.container}>
      <Header>
        <div />
      </Header>
      <Outlet />
    </div>
  );
};

export default RootLayout;
