
import './App.css'
import {Route,Routes,Navigate,BrowserRouter} from 'react-router-dom'
import Layout from './layouts/Layout'
import AdminDashboard from './pages/adminDashboard'
import RestaurantDashboard from './pages/restaurantDashboard'
import ManageItems from './pages/restaurantDashboard/manageItems'
import ManageOrders from './pages/restaurantDashboard/manageOrders'
import ManageMails from './pages/restaurantDashboard/manageMails'
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
        <Route path='restaurant/manage-items' element={<ManageItems/>} />
        <Route path='restaurant/manage-orders' element={<ManageOrders/>}/>
        <Route path='restaurant/send-email' element={<ManageMails/>}/>
        
      </Route>
    </Routes>
   
  )
}

export default App
