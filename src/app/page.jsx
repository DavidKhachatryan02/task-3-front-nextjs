import { COOKIES_TOKEN_KEY } from "~/constants/config";
import { PATHS } from "~/constants/paths";
import { fetchUser } from "~/actions/fetchUser";
import { getCookie } from "~/actions/cookie-actions";
import Navigate from "~/ui/Navigate";
import dynamic from "next/dynamic";

const styles = {
  container: "h-screen flex flex-row ",
};

const UserSidebar = dynamic(() => import("./_components/UserSidebar"),{
  loading: () => <p>Loading...</p>,
});
const UserInfo = dynamic(() => import("./_components/UserInfo"),{
  loading: () => <p>Loading...</p>,
});

const getUser = async () => {
  try {
    const user = await fetchUser();

    return user;
  } catch (e) {
    console.log(e);
  }
};

const HomePage = async () => {
  
  const accessToken = await getCookie(COOKIES_TOKEN_KEY);

  if (!accessToken) {
    return <Navigate path={PATHS.LOGIN} replace />;
  }

  const userData = await getUser();

  return (
    <div className={styles.container}>
      <UserSidebar />
      {userData && <UserInfo data={userData} />}
    </div>
  );
};

export default HomePage;
