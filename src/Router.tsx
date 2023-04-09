import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { View } from './components'
import Trending from './views/Trending/Trending'

const router = createBrowserRouter([{
  path: '/',
  element: <View><Trending /></View>
}])

export default function Router (): JSX.Element {
  return <RouterProvider router={router} />
}
