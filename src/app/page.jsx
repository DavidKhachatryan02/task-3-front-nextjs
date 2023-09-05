import { COOKIES_TOKEN_KEY } from "~/constants/config";
import { PATHS } from "~/constants/paths";
import { getCookie } from "~/actions/cookie-actions";
import Navigate from "~/ui/Navigate";
import UserSidebar from "./_components/UserSidebar";
import UserInfo from "./_components/UserInfo";

const styles = {
  container: "h-screen flex flex-row ",
};

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
