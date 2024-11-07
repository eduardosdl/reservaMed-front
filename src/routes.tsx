import { createBrowserRouter, Navigate } from 'react-router-dom';

import { Home } from './pages/Home';
import { Admin } from './pages/Admin';
import { Patient } from './pages/Admin/Patient';
import { Doctor as DoctorsManagement } from './pages/Admin/Doctor';
import { Consult } from './pages/Admin/Consult';
import { RecordConsults } from './pages/Admin/RecordConsults';
import { Doctor } from './pages/Doctor';

export const routes = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/admin',
    element: <Admin />,
    children: [
      { path: '', element: <Navigate to="patients" replace /> },
      { path: 'patients', element: <Patient /> },
      { path: 'doctors', element: <DoctorsManagement /> },
      { path: 'consults', element: <Consult /> },
      { path: 'consults/record', element: <RecordConsults /> },
    ],
  },
  {
    path: '/doctors/:doctorCrm',
    element: <Doctor />,
  },
]);

/*
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/admin",
    element: <Admin />,
    children: [
      { path: "", element: <Navigate to="patients" replace /> },
      { path: "patients", element: <Patients /> },
      { path: "doctors", element: <Doctors /> },
      { path: "consults", element: <Consults /> },
      { path: "history", element: <HistoryConsults /> },
    ],
  },
  {
    path: "/appointment",
    element: <CreateConsult />,
  },
  {
    path: "/consults",
    element: <ShowConsults />,
  },
]);

*/
