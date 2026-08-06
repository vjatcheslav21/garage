
import { Main, Header } from '@/widgets';
import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from '@/components';
import { AuthPage } from '@/pages';


function App() {

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
                children={<Main/>}
              />}
          />
        </Routes>
      
      

      <footer></footer>
      </>
  )
}

export default App
