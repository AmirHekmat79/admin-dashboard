import usFlag from '@assets/images/us.png';
import faFlag from '@assets/images/fa.png';
import { useRef, useState } from 'react';
import { useEffect } from 'react';
import { useAppContext } from '../contexts/app/app-context/app-context';
const ChangeLanguage = () => {
  const { language, changeLang } = useAppContext();
  const [show, setShow] = useState(false);
  const ref = useRef();
  useEffect(() => {
    const clickOutSide = (e) => {
      if (show && ref.current && !ref.current.contains(e.target)) {
        setShow(false);
      }
    };
    document.addEventListener('mousedown', clickOutSide);
    return () => {
      document.removeEventListener('mousedown', clickOutSide);
    };
  }, [show]);
  useEffect(() => {
    setShow(false);
  }, [language]);
  return (
    <div className="dropdown">
      <a
        className="nav-flag dropdown-toggle"
        onClick={() => {
          setShow(true);
        }}
      >
        <img src={language === 'en' ? usFlag : faFlag} alt="flag" />
      </a>
      <div
        ref={ref}
        className={`dropdown-menu dropdown-menu-end ${
          show ? 'show' : undefined
        }`}
      >
        <a
          className="dropdown-item fw-bolder"
          style={{ textAlign: language === 'fa' ? 'right' : 'left' }}
          onClick={() => {
            changeLang('fa');
          }}
        >
          <img src={faFlag} alt="persian" width="20" className="ms-2" />
          <span className="align-middle">فارسی</span>
        </a>
        <a
          className="dropdown-item fw-bolder"
          style={{ textAlign: language === 'fa' ? 'right' : 'left' }}
          onClick={() => {
            changeLang('en');
          }}
        >
          <img src={usFlag} alt="English" width="20" className="ms-2" />
          <span className="align-middle">English</span>
        </a>
      </div>
    </div>
  );
};
export default ChangeLanguage;
