import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import { CreateTrip } from './pages/create-trip'
import { TripDetails } from './pages/trip-details'

const router = createBrowserRouter([
  {
    path: '/',
    element: <CreateTrip />,
  },
  {
    path: '/trips/:tripId',
    element: <TripDetails />,
  },

  {
    path: '*',
    element: <Navigate to="/" />,
  },
])

export function App() {
  return <RouterProvider router={router} />
}
