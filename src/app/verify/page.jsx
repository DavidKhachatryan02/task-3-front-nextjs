import LoginPageLeftSplit from "~/ui/Sidebar";
import CodeInput from "./_components/CodeInput";

const styles = { container: "grid grid-cols-1 md:grid-cols-2 h-screen " };

const VerifyPage = () => {
  return (
    <div className={styles.container}>
      <LoginPageLeftSplit />
      <CodeInput />
    </div>
  );
};

export default VerifyPage;
