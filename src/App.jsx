import { RouterProvider } from 'react-router-dom';
import router from './router';
import '@core/i18n';
import { useEffect } from 'react';
import { useAppContext } from './contexts/app/app-context/app-context';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from 'react-toastify';
const App = () => {
  const { theme } = useAppContext();
  useEffect(() => {
    const headElement = document.head;
    const linkElement = document.createElement('link');
    linkElement.rel = 'stylesheet';
    linkElement.href = `/css/${theme}.css`;
    headElement.appendChild(linkElement);
    return () => {
      headElement.removeChild(linkElement);
    };
  }, [theme]);
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer rtl />
    </>
  );
};

export default App;
