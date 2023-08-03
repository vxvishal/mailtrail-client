import "./App.css";
import CreateEmail from "./pages/CreateEmail/CreateEmail";
import Dashboard from "./pages/Dashboard/Dashboard";
import SidebarNav from "./pages/SidebarNav/SidebarNav";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

export default function App() {

  const router = createBrowserRouter(
    [
      {
        element: <SidebarNav />,
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
      }
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