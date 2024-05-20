import { createContext, useContext, useEffect, useReducer } from 'react';
import AppReducer from './app-reducer';
import i18n from '@core/i18n';
const AppContext = createContext();
const initialState = {
  language: localStorage.getItem('language') || 'fa',
  theme: localStorage.getItem('theme') || 'light',
  showSidebar: true,
};
const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);
  const changeLang = (language) => {
    dispatch({ type: 'CHANGE-LANGUAGE', payload: language });
  };
  const changeTheme = (theme) => {
    dispatch({ type: 'CHANGE_THEME', payload: theme });
  };
  const toggleSidebar = () => {
    dispatch({ type: 'TOGGLE_SIDEBAR' });
  };
  useEffect(() => {
    localStorage.setItem('language', state.language);
    i18n.changeLanguage(state.language);
    document.body.dataset.direction = state.language === 'fa' ? 'rtl' : 'ltr';
    document.body.dataset.sidebarPosition =
      state.language === 'fa' ? 'right' : 'left';
  }, [state.language]);

  useEffect(() => {
    localStorage.setItem('theme', state.theme);
  }, [state.theme]);
  return (
    <AppContext.Provider
      value={{ ...state, changeLang, changeTheme, toggleSidebar }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, useAppContext };
