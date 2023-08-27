import { Fragment } from "react";
import { ToastContainer } from "react-toastify";

export default function RootTemplate({ children }) {
  return (
    <Fragment>
      <ToastContainer />
      {children}
    </Fragment>
  );
}
