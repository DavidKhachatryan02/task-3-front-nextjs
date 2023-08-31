"use client";

import dynamic from "next/dynamic";
import { useSession } from "next-auth/react";
import { PATHS } from "~/constants/paths";
import Navigate from "~/ui/Navigate";

const UserSidebar = dynamic(() => import("./_components/UserSidebar"), {
  loading: () => <p>Loading...</p>,
});
const UserInfo = dynamic(() => import("./_components/UserInfo"), {
  loading: () => <p>Loading...</p>,
});

const styles = {
  container: "h-screen flex flex-row ",
};

const HomePage = () => {
  const { data: session, status } = useSession();
<<<<<<< HEAD
  console.log("==================", session?.user, status);

  if (status === "unauthenticated") {
    return <Navigate path={PATHS.LOGIN} replace />;
  }
=======
  const data = { ...session };
  console.log("CONSOLE FROM HOMEPAGE", data);
>>>>>>> aeae28ef8ad3c7c5c929a16692c0238e2a98082d

  return (
    <div className={styles.container}>
      <UserSidebar />
      {session?.user && <UserInfo data={session.user} />}
    </div>
  );
};

export default HomePage;
