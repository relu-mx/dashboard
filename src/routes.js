import {Navigate, useRoutes} from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import BlogPage from './pages/BlogPage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import ProductsPage from './pages/ProductsPage';
import DashboardAppPage from './pages/DashboardAppPage';
import RequestsPage from "./pages/RequestsPage";
import Protected from "./components/auth/Protected";

// ----------------------------------------------------------------------

export default function Router() {

  return useRoutes([
    {
      path: '/dashboard',
      element: <Protected><DashboardLayout/></Protected>,
      children: [
        {element: <Navigate to="/dashboard/app"/>, index: true},
        {path: 'app', element: <DashboardAppPage/>},
        {path: 'user', element: <UserPage/>},
        {path: 'products', element: <ProductsPage/>},
        {path: 'blog', element: <BlogPage/>},
        {path: 'requests', element: <RequestsPage/>}
      ],
    },
    {
      path: 'login',
      element: <LoginPage/>,
    },
    {
      element: <SimpleLayout/>,
      children: [
        {element: <Navigate to="/dashboard/app"/>, index: true},
        {path: '404', element: <Page404/>},
        {path: '*', element: <Navigate to="/404"/>},
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace/>,
    },
  ]);
}
