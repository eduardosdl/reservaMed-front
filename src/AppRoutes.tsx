import { Navigate, Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import Patients from './pages/Patients/index';
import Doctors from './pages/Doctors';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route path="" element={<Navigate to="patients" replace />} />
        <Route path="patients" element={<Patients />} />
        <Route path="doctors" element={<Doctors />} />
      </Route>
    </Routes>
  );
}
