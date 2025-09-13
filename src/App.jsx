import { useState } from 'react'
import './App.css'
import { Button } from './components/ui/button.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AppLayout from './layout/app-layout.jsx'
import LandingPage from './pages/landing.jsx'
import Onboarding from './pages/onboarding.jsx'
import JobListing from './pages/job-listing'
import JobPage from './pages/job'
import MyJobs from './pages/my-jobs'
import PostJob from './pages/post-job'
import SaveJob from './pages/saved-job'
import { ThemeProvider } from "@/components/theme-provider"
import ProtectedRoute from './components/protected-route'

function App() {
  
  const router = createBrowserRouter([
    {
      element : <AppLayout/>,
      children : [
        {
          path : '/',
          element : <LandingPage/>
        },
        {
          path : '/onboarding',
          element : <ProtectedRoute><Onboarding/></ProtectedRoute>
        },
        {
          path : '/jobs',
          element : <ProtectedRoute><JobListing/></ProtectedRoute>
        },
        {
          path : '/job/:id',
          element : <ProtectedRoute><JobPage/></ProtectedRoute>
        },
        {
          path : '/post-job',
          element : <ProtectedRoute><PostJob/></ProtectedRoute>
        },
        {
          path : '/saved-jobs',
          element : <ProtectedRoute><SaveJob/></ProtectedRoute>
        },
        {
          path : '/my-jobs',
          element : <ProtectedRoute><MyJobs/></ProtectedRoute>
        },
      ]
    }
  ])

  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <RouterProvider router={router}/>
    </ThemeProvider>
  )
}

export default App
