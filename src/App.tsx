import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Loading from '@/components/Loading';
import { useAppSelector } from '@/redux/hooks';
import { selectIsLogin } from '@/redux/features/isLogin/isLoginSlice';

const Login = lazy(() => import('@/pages/Login'));
const Home = lazy(() => import('@/pages/Home'));
const PageNotFound = lazy(() => import('@/pages/PageNotFound'));

function App() {
  const isLogin = useAppSelector(selectIsLogin);

  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route
          path="/"
          element={
            <Navigate to={isLogin ? '/home' : '/login'} />
          }
        />
        <Route
          path={'/login'}
          element={
            <Login />
          }
        />
        <Route
          path={'/home'}
          element={
            <Navigate to={isLogin ? '/home/company' : '/login'} />
          }
        />
        <Route
          path={'/home/*'}
          element={
            isLogin ? <Home /> : <Navigate to='/login' />
          }
        />
        <Route
          path="*"
          element={
            <PageNotFound />
          }
        />
      </Routes>
    </Suspense>
  )
}

export default App
