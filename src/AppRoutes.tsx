import { Navigate, Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import Patients from './pages/Patients';
import Doctors from './pages/Doctors';
import Admin from './pages/Admin';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin" element={<Admin />}>
        <Route path="" element={<Navigate to="patients" replace />} />
        <Route path="patients" element={<Patients />} />
        <Route path="doctors" element={<Doctors />} />
      </Route>
    </Routes>
  );
}
