import { Footer, Header } from '@/widgets';
import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from '@/components';
import { AuthPage, CarPage, IntroPage, MainPage } from '@/pages';
import { useAppSelector } from '@/storage/hooks/hooks';
import { Profile } from '@/pages/ProfilePage';
import { useEffect } from 'react';


function App() {

  const userIsAuth = useAppSelector(state => state.user.isAuth);
  const cars = useAppSelector(state => state.cars.cars);
  const theme = useAppSelector(state => state.user.themeColor);

    useEffect(() => {
        document.documentElement.dataset.theme = theme;
        localStorage.setItem('theme', theme);
    }, [ theme ]);

  return (
    <>
      <Header/>
        <Routes>
          <Route 
            path='/'
            element={
              <Navigate to={userIsAuth ? '/main' : '/login'}
            />}/>
          <Route 
            path='/login' 
            element={<AuthPage initialTab={'login'}/>}
            />
          <Route 
            path='/signup' 
            element={<AuthPage initialTab={'signup'}/>}
            />
          <Route 
            path='/main' 
            element={
              <ProtectedRoute 
                children={cars.length === 0 ? <IntroPage/> : <MainPage />}
                // children={<IntroPage/>}
              />}
          />
          <Route 
            path='/car' 
            element={
              <ProtectedRoute 
                children={<CarPage/>}
              />}
          />
          <Route 
            path='/profile' 
            element={
              <ProtectedRoute 
                children={<Profile/>}
              />}
          />
        </Routes>
        <Footer/>
      </>
  )
}

export default App
