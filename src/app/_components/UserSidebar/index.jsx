"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import MenuIcon from "@mui/icons-material/Menu";
import PermContactCalendarOutlinedIcon from "@mui/icons-material/PermContactCalendarOutlined";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import { COOKIE_TOKEN_KEY, COOKIES_REFRESH_KEY } from "~/constants/config";
import { PATHS } from "~/constants/paths";
import { removeCookie } from '~/actions/cookie-actions';

const styles = {
  navbar:
    "fixed bg-[#003367] h-full left-0 w-16 flex flex-col items-center py-5",
  menuIcon: "mb-3 md:mb-10 cursor-pointer ",
  dashboard: "mb-3 md:mb-7 opacity-60 cursor-pointer hover:opacity-100",
  userInfo: "cursor-pointer",
  logoutIcon: "opacity-60 mt-auto cursor-pointer hover:opacity-100",
};

const iconColorWhite = "#f3e5f5";

const UserSidebar = ({ error }) => {
  const router = useRouter();

  const handleLogout = async () => {
    await removeCookie(COOKIE_TOKEN_KEY);
    await removeCookie(COOKIES_REFRESH_KEY);

    router.push(PATHS.LOGIN);
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <div className={styles.navbar}>
      <MenuIcon htmlColor={iconColorWhite} className={styles.menuIcon} />
      <DashboardOutlinedIcon
        htmlColor={iconColorWhite}
        className={styles.dashboard}
      />
      <PermContactCalendarOutlinedIcon
        className={styles.userInfo}
        htmlColor={iconColorWhite}
      />
      <LogoutIcon
        className={styles.logoutIcon}
        htmlColor={iconColorWhite}
        onClick={handleLogout}
      />
    </div>
  );
};

export default UserSidebar;
