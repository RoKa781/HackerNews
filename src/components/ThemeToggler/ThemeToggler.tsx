import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import st from './ThemeToggler.module.css';
import { GiMoonOrbit, GiSun } from 'react-icons/gi';
import { selectTheme, toggleTheme } from '../../shared/slices/themeSlice';

const ThemeToggler: React.FC = () => {
  const dispatch = useDispatch();
  const theme = useSelector(selectTheme);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.body.classList.remove('light-theme');
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
      document.body.classList.add('light-theme');
    }
  }, [theme]);

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div
      className={st.switch}
      onClick={handleToggleTheme}
      role="button"
      aria-pressed={theme === 'dark'}
    >
      <div className={`${st.toggle} ${theme === 'dark' ? st.active : ''}`}>
        {theme === 'dark' ? (
          <GiMoonOrbit size={25} className={st.moon} />
        ) : (
          <GiSun size={25} className={st.sun} />
        )}
      </div>
    </div>
  );
};

export default ThemeToggler;
