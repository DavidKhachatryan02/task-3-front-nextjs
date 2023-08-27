import LeftSplit from '~/ui/Sidebar';
import LoginInput from './_compoents/LoginInput';

const styles = { container: 'grid grid-cols-1 md:grid-cols-2 h-screen' };

const LoginPage = () => {
  return (
    <div className={styles.container}>
      <LeftSplit />
      <LoginInput />
    </div>
  );
};

export default LoginPage;
