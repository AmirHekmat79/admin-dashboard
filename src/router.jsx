import { createBrowserRouter } from 'react-router-dom';
import Login from './features/identity/components/login';
import Register from './features/identity/components/register';
import { registerAction } from './features/identity/components/register';
import { loginAction } from './features/identity/components/login';
import IdentityLayout from './layouts/identity-layout';
import MainLayout from './layouts/main-layout/main-layout';
import Courses from './pages/courses';
import { coursesLoader } from './pages/courses';
import CourseCategories from './pages/course-categories';
import { courseCategoriesLoader } from './pages/course-categories';
import CourseDetails, {
  courseDetailsLoader,
} from './features/Cources/components/course-details';
import { CategoryProvider } from './features/Categories/components/category-context';
import NotFound from './pages/not-found';
import UnhandledException from './pages/unhandled-exception';
const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <UnhandledException />,
    children: [
      {
        element: <Courses />,
        index: true,
        loader: coursesLoader,
      },
      {
        path: '/course-categories',
        element: (
          <CategoryProvider>
            <CourseCategories />
          </CategoryProvider>
        ),
        loader: courseCategoriesLoader,
      },
      {
        path: 'courses/:id',
        element: <CourseDetails />,
        loader: courseDetailsLoader,
      },
    ],
  },
  {
    element: <IdentityLayout />,
    children: [
      {
        path: 'login',
        element: <Login />,
        action: loginAction,
        errorElement: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
        action: registerAction,
        errorElement: <Register />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default router;
