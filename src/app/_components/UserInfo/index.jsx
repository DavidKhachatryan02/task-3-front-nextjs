"use client";

import { useState, useEffect } from "react";
import UserAccounts from "../UserAccounts";
import UserDetails from "../UserDetails";
import { useApiClient } from "~/hooks/useClient";
import { getCookie } from "~/actions/cookie-actions";
import { COOKIES_TOKEN_KEY } from "~/constants/config";

const styles = {
  container:
    "w-full md:flex-row items-start md:items-center md:justify-between px-20 py-6 md:py-8 ",
  title: "text-sky-900 text-3xl md:text-4xl font-medium leading-loose mb-4",
  wrapper: "flex flex-col md:flex-row mb-10  md:mb-0",
};

const UserInfo = () => {
  const [userData, setUserData] = useState({});
  const { get } = useApiClient();

  useEffect(() => {
    const getUser = async () => {
      const accessToken = await getCookie(COOKIES_TOKEN_KEY);

      if (!accessToken) {
        throw new Error("Access token not defined");
      }

      const { data } = await get("/auth/getMe", {
        cache: "no-store",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      setUserData(data);
    };

    getUser();
  }, [get]);
  
  const { gitHubUserName, slackUserName, ...userDetails } = userData;

  return (
    <div className={styles.container}>
      <p className={styles.title}>My Profile</p>
      <div className={styles.wrapper}>
        <UserDetails data={userDetails} />
        <UserAccounts data={{ gitHubUserName, slackUserName }} />
      </div>
    </div>
  );
};

export default UserInfo;
