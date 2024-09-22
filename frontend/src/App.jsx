
import './App.css'
import {Route,Routes,Navigate,BrowserRouter} from 'react-router-dom'
import Layout from './layouts/Layout'
import AdminDashboard from './pages/adminDashboard'
import RestaurantDashboard from './pages/restaurantDashboard'
function App() {
  

  return (
   
    <Routes>
      <Route path='/v2/dashboard/'
        element={
          // add checkAuth
          <Layout/>
        }
        
      >
        <Route path='admin' element={<AdminDashboard/>} />
        <Route path='restaurant' element={<RestaurantDashboard/>}/>
      </Route>
    </Routes>
   
  )
}

export default App
