import { createBrowserRouter, Navigate } from 'react-router-dom';

import { Home } from './pages/Home';
import { Admin } from './pages/Admin';
import { Patient as PatientsManagement } from './pages/Admin/Patient';
import { Doctor as DoctorsManagement } from './pages/Admin/Doctor';
import { Consult } from './pages/Admin/Consult';
import { RecordConsults } from './pages/Admin/RecordConsults';
import { Doctor } from './pages/Doctor';
import { Patient } from './pages/Patient';

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
      { path: 'patients', element: <PatientsManagement /> },
      { path: 'doctors', element: <DoctorsManagement /> },
      { path: 'consults', element: <Consult /> },
      { path: 'consults/record', element: <RecordConsults /> },
    ],
  },
  {
    path: '/doctors/:doctorCrm',
    element: <Doctor />,
  },
  {
    path: '/patients/:patientCpf',
    element: <Patient />,
  },
]);
