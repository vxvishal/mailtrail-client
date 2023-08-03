import "./App.css";
import CreateEmail from "./pages/CreateEmail/CreateEmail";
import Dashboard from "./pages/Dashboard/Dashboard";
import SidebarNav from "./pages/SidebarNav/SidebarNav";
import Error404 from "./pages/Error404/Error404";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

export default function App() {

  const router = createBrowserRouter(
    [
      {
        element: <SidebarNav />,
        errorElement: <Error404 />,
        children: [
          {
            path: '/',
            element: <Dashboard />
          },
          {
            path: '/create',
            element: <CreateEmail />
          }
        ]
      },
    ]
  );

  return (
    <>
      <div className="App">
        <RouterProvider router={router} />
      </div>
    </>
  );
}