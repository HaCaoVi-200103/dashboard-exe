import './App.css'
import { lazy } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'
import ProtectedRoute from './utils/protected.router'
const Login = lazy(() => import('./pages/Login'));
const Product = lazy(() => import('./pages/Product'));
const Category = lazy(() => import('./pages/Category'));
const LayoutDashboard = lazy(() => import('./components/Layout'));
const Dashboard = lazy(() => import('./pages/Dashboard'));

const App = () => {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<LayoutDashboard />}>
              <Route index element={<Dashboard />} />
              <Route path='management-product' element={<Product />} />
              <Route path='management-category' element={<Category />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
