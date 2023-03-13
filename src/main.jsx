import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css'
import Root from './routes/root';
import Home, { loader as homeLoader} from './routes/home';
import Post, {loader as postLoader, action as postAction} from './routes/post';
import ErrorPage from './routes/errorPage';
const router = createBrowserRouter([
  {
    path:'/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children:[
      { index: true,
        element:<Home />,
        loader: homeLoader,     
      },
      {
        path:'/posts/:postId',
        element:<Post />,
        loader: postLoader,
        action: postAction,
        errorElement: <ErrorPage />,
      }
    ],
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
