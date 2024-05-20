import { Outlet } from 'react-router-dom';
import ChangeLanguage from '../components/change-language';
import ChangeTheme from '../components/change-theme';

const IdentityLayout = () => {
  return (
    <>
      <nav className="navbar shadow-sm justify-content-start gap-3">
        <ChangeTheme />
        <ChangeLanguage />
      </nav>
      <div className="container">
        <Outlet />
      </div>
    </>
  );
};

export default IdentityLayout;
