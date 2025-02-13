import './App.css'
import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'
import ProtectedRoute from './utils/protected.router'
import { Spin } from 'antd';
import ErrorBoundary from './components/ErrorBoundary';
const Login = lazy(() => import('./pages/Login'));
const Product = lazy(() => import('./pages/Product'));
const Category = lazy(() => import('./pages/Category'));
const LayoutDashboard = lazy(() => import('./components/Layout'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Blog = lazy(() => import('./pages/Blog'));

const App = () => {

  return (
    <>
      <BrowserRouter>
        <Suspense fallback={
          <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh"
          }}>
            <Spin size='large' />
          </div>
        }>
          <ErrorBoundary>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/" element={<LayoutDashboard />}>
                  <Route index element={<Dashboard />} />
                  <Route path='management-product' element={<Product />} />
                  <Route path='management-category' element={<Category />} />
                  <Route path='management-blog' element={<Blog />} />
                </Route>
              </Route>
            </Routes>
          </ErrorBoundary>
        </Suspense>
      </BrowserRouter>
    </>
  )
}

export default App