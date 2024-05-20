import { useNavigate } from 'react-router-dom';
import ChangeLanguage from '../../components/change-language';
import ChangeTheme from '../../components/change-theme';
import { useAppContext } from '../../contexts/app/app-context/app-context';
const TopNav = () => {
  const { showSidebar, toggleSidebar } = useAppContext();
  const { language } = useAppContext();
  const navigate = useNavigate();
  const logOut = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };
  return (
    <nav className="navbar">
      <a
        className="sidebar-toggle"
        onClick={() => {
          toggleSidebar(!showSidebar);
        }}
      >
        <i className="hamburger align-self-center"></i>
      </a>
      <div className="d-flex align-items-center  me-3 gap-3">
        <ChangeLanguage />
        <ChangeTheme />
      </div>
      <div className={`${language === 'fa' ? 'me-auto' : 'ms-auto'}`}>
        <button
          className="btn btn-outline-danger ms-2 fw-bolder"
          onClick={logOut}
        >
          خارج شوید
        </button>
      </div>
    </nav>
  );
};
export default TopNav;
