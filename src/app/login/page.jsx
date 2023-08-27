import LeftSplit from "~/ui/Sidebar";
import LoginInput from "./_compoents/LoginInput";
import { toast } from "react-toastify";
const styles = { container: "grid grid-cols-1 md:grid-cols-2 h-screen" };

const LoginPage = () => {
  return (
    <div className={styles.container}>
      <LeftSplit />
      <LoginInput />
    </div>
  );
};

export default LoginPage;
