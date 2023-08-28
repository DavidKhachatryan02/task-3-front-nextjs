import dynamic from "next/dynamic";

const LoginInput = dynamic(() => import("./_compoents/LoginInput"));
const LoginPageLeftSplit = dynamic(() => import("~/ui/LoginPageLeftSplit"));

const styles = { container: "grid grid-cols-1 md:grid-cols-2 h-screen" };

const LoginPage = () => {
  return (
    <div className={styles.container}>
      <LoginPageLeftSplit />
      <LoginInput />
    </div>
  );
};

export default LoginPage;
