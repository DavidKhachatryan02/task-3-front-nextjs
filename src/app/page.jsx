import { COOKIES_TOKEN_KEY } from "~/constants/config";
import { PATHS } from "~/constants/paths";
import { getCookie } from "~/actions/cookie-actions";
import Navigate from "~/ui/Navigate";
import dynamic from "next/dynamic";
import UserSidebar from "./_components/UserSidebar";

const styles = {
  container: "h-screen flex flex-row ",
};

const UserInfo = dynamic(() => import("./_components/UserInfo"), {
  loading: () => <p>Loading...</p>,
});

const HomePage = async () => {
  const accessToken = await getCookie(COOKIES_TOKEN_KEY);

  if (!accessToken) {
    return <Navigate path={PATHS.LOGIN} replace />;
  }
  return (
    <div className={styles.container}>
      <UserSidebar />
      <UserInfo />
    </div>
  );
};

export default HomePage;
