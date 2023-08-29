import { ToastContainer } from "react-toastify";
import Provider from "./Provider";

export default function RootTemplate({ children }) {
  return (
    <Provider>
      <ToastContainer />
      {children}
    </Provider>
  );
}
