
import { Header } from '@/widgets';
import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Intro, ProtectedRoute } from '@/components';
import { AuthPage, IntroPage, MainPage } from '@/pages';
import { useAppDispatch, useAppSelector } from '@/storage/hooks/hooks';
import { useEffect, useState } from 'react';
import { userLogin } from '@/storage/slices/userSlice';
import { Profile } from '@/pages/ProfilePage';


function App() {

  const [isInitializing, setIsInitializing] = useState(true);
  const cars = useAppSelector(state => state.cars.cars);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const userStr = localStorage.getItem('user');
      if (userStr) {
          const user = JSON.parse(userStr);
          dispatch(userLogin(user));
      }
          setIsInitializing(false);
  },[])

  if (isInitializing) {
      return <div>Проверка авторизации...</div>
  }

  return (
    <>
      <Header/>
        <Routes>
          <Route 
            path='/'
            element={
              <Navigate to='/login'
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
                // children={cars.length === 0 ? <Intro name='Salva' /> : <MainPage />}
                children={cars.length === 0 ? <IntroPage/> : <MainPage />}
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
      
      

      <footer></footer>
      </>
  )
}

export default App
