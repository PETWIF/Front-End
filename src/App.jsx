import { useLocation, Outlet } from 'react-router-dom';

import { ThemeProvider } from 'styled-components';

import { Header } from './components/Header';

import { routeList } from './route.jsx';
import theme from './styles/theme';
import { findRouteByPath } from './utils/findRouteByPath.js';

function App() {
  const { pathname } = useLocation();
  const route = findRouteByPath(pathname, routeList);
  const hideHeader = route?.meta?.hideHeader ?? false;

  return (
    <ThemeProvider theme={theme}>
      {!hideHeader && <Header />}
      <Outlet />
    </ThemeProvider>
  );
}

export default App;
