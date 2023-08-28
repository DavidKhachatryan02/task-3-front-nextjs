import dynamic from "next/dynamic";
import CodeInput from "./_components/CodeInput";
import { getCookie } from "~/actions/cookie-actions";
import { COOKIES_TOKEN_KEY } from "~/constants/config";
import { PATHS } from "~/constants/paths";
import Navigate from "~/ui/Navigate";

const LoginPageLeftSplit = dynamic(() => import("~/ui/LoginPageLeftSplit"),{
  loading: () => <p>Loading...</p>,
});

const styles = { container: "grid grid-cols-1 md:grid-cols-2 h-screen " };

const VerifyPage = async () => {
  const accessToken = await getCookie(COOKIES_TOKEN_KEY);

  if (accessToken) {
    return <Navigate path={PATHS.HOME} replace />;
  }

  return (
    <div className={styles.container}>
      <LoginPageLeftSplit />
      <CodeInput />
    </div>
  );
};

export default VerifyPage;
