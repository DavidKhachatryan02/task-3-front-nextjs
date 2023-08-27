import UserAccounts from "../UserAccounts";
import UserDetails from "../UserDetails";

const styles = {
  container:
    "w-full md:flex-row items-start md:items-center md:justify-between px-20 py-6 md:py-8 ",
  title: "text-sky-900 text-3xl md:text-4xl font-medium leading-loose mb-4",
  wrapper: "flex flex-col md:flex-row mb-10  md:mb-0",
};

const UserInfo = ({ data }) => {
  const { gitHubUserName, slackUserName, ...userDetails } = data;

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
