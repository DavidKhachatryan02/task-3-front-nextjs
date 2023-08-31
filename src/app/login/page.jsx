import dynamic from "next/dynamic";
import { getCookie } from "~/actions/cookie-actions";
import Navigate from "~/ui/Navigate";
import { PATHS } from "~/constants/paths";
import { COOKIES_TOKEN_KEY } from "~/constants/config";

<<<<<<< HEAD
const LoginInput = dynamic(() => import("./_components/LoginInput"), {
=======
const LoginInput = dynamic(() => import('./_components/LoginInput'), {
>>>>>>> aeae28ef8ad3c7c5c929a16692c0238e2a98082d
  loading: () => <p>Loading...</p>,
});
const LoginPageLeftSplit = dynamic(() => import("~/ui/LoginPageLeftSplit"), {
  loading: () => <p>Loading...</p>,
});

const styles = { container: "grid grid-cols-1 md:grid-cols-2 h-screen" };

const LoginPage = async () => {
  const accessToken = await getCookie(COOKIES_TOKEN_KEY);

  if (accessToken) {
    return <Navigate path={PATHS.HOME} replace />;
  }

  return (
    <div className={styles.container}>
      <LoginPageLeftSplit />
      <LoginInput />
    </div>
  );
};

export default LoginPage;
