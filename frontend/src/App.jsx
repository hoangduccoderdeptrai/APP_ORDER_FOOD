import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { DefaultLayout } from './components/Layout'
import RestaurantLayout from './components/Layout/RestaurantLayout'
import { Fragment } from 'react'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import Layout from './layouts/Layout'
import AdminDashboard from './pages/adminDashboard'
import RestaurantDashboard from './pages/restaurantDashboard'
import ManageItems from './pages/restaurantDashboard/manageItems'
import ManageOrders from './pages/restaurantDashboard/manageOrders'
import ManageMails from './pages/restaurantDashboard/manageMails'
import MyRestaurant from './pages/restaurantDashboard/myrestaurant'
import ManageAccount from './pages/adminDashboard/manageAccount'
import ManageRestaurant from './pages/adminDashboard/manageRestaurant'
import SpecialtyFood from './pages/adminDashboard/SpecialtyFood'
import OTPCode from './pages/OTPCode'
import ChangePassword from './pages/ChangePassword'
import 'react-toastify/dist/ReactToastify.min.css'
import ScrollToTop from './ScrollToTop'
import ProtectedRouteWrapper from './components/Layout/Components/_components/ProtectedRouteWrapper'
import useAuth from './stores/useAuth'

// CLIENT
import Home from '~/pages/Home'
import AboutUs from '~/pages/AboutUs'
import Menu from '~/pages/Menu'
import SellerRegisterForm from '~/pages/SellerRegisterForm'
import CustomerRegisterForm from '~/pages/CustomerRegisterForm'
import OrderTrackingPage from '~/pages/OrderTracking'
import DetailsPage from './pages/DetailsPage'
import DetailAccount from './pages/DetailAccount'
import OurCommit from './pages/OurCommitNew'
import PrivacyPolicy from './pages/PrivacyPolicyNew'
import OrderInstructions from './pages/OrderInstructionsNew'
import ContactInstructions from './pages/ContactInstructionsNew'
import OperatingPolicy from './pages/OperatingPolicyNew'

function App() {
  const { user } = useAuth()
  const userRole = user?.role

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route path='/' element={<Home />} />
          <Route path='/about-us' element={<AboutUs />} />
          <Route path='/menu' element={<Menu />} />
          <Route path='/register/seller' element={<SellerRegisterForm />} />
          <Route path='/register' element={<CustomerRegisterForm />} />
          <Route path='/order-tracking' element={<OrderTrackingPage />} />
          <Route path='/details/:id' element={<DetailsPage />} />
          <Route path='/detail-account' element={<DetailAccount />} />
          <Route path='/our-commit' element={<OurCommit />} />
          <Route path='/privacy-policy' element={<PrivacyPolicy />} />
          <Route path='/order-instructions' element={<OrderInstructions />} />
          <Route path='/contact-instructions' element={<ContactInstructions />} />
          <Route path='/operating-policy' element={<OperatingPolicy />} />
          <Route path='/otp-code' element={<OTPCode />} />
          <Route path='/change-password' element={<ChangePassword />} />
        </Route>

        <Route
          element={
            <ProtectedRouteWrapper role={userRole} allowedRoles={['admin']} layout={Layout} />
          }
        >
          <Route path='/v2/dashboard/admin/account' element={<ManageAccount />} />
          <Route path='/v2/dashboard/admin/restaurant' element={<ManageRestaurant />} />
          <Route path='/v2/dashboard/admin/specialty-food' element={<SpecialtyFood />} />
        </Route>

        <Route
          element={
            <ProtectedRouteWrapper role={userRole} allowedRoles={['seller']} layout={Layout} />
          }
        >
          <Route path='/v2/dashboard/restaurant' element={<RestaurantDashboard />} />
          <Route path='/v2/dashboard/restaurant/manage-items' element={<ManageItems />} />
          <Route path='/v2/dashboard/restaurant/manage-orders' element={<ManageOrders />} />
          <Route path='/v2/dashboard/restaurant/send-email' element={<ManageMails />} />
          <Route path='/v2/dashboard/restaurant/my-restaurant' element={<MyRestaurant />} />
        </Route>
      </Routes>
      <ToastContainer />
    </>
  )
}

export default App
