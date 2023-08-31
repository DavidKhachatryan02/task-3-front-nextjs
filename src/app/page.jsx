"use client";

import { COOKIES_TOKEN_KEY } from "~/constants/config";
import { PATHS } from "~/constants/paths";
import { fetchUser } from "~/actions/fetchUser";
import { getCookie } from "~/actions/cookie-actions";
import Navigate from "~/ui/Navigate";
import dynamic from "next/dynamic";
import { getSession, useSession } from "next-auth/react";

const styles = {
  container: "h-screen flex flex-row ",
};

const UserSidebar = dynamic(() => import("./_components/UserSidebar"), {
  loading: () => <p>Loading...</p>,
});
const UserInfo = dynamic(() => import("./_components/UserInfo"), {
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

const HomePage = () => {
  // const accessToken = await getCookie(COOKIES_TOKEN_KEY);

  // if (!accessToken) {
  //   return <Navigate path={PATHS.LOGIN} replace />;
  // }

  //const userData = await getUser();
  const { data: session, status } = useSession();
  console.log("==================", session);

  return (
    <div className={styles.container}>
      <UserSidebar />
      {/* {userData && 
      <UserInfo data={userData} />
      } */}
      <UserInfo />
    </div>
  );
};

export default HomePage;
