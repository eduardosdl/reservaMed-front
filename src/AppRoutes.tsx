import { Navigate, Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import Admin from './pages/Admin';
import Patients from './pages/Admin/Patients';
import Doctors from './pages/Admin/Doctors';
import Consults from './pages/Admin/Consults';
import CreateConsult from './pages/CreateConsult';
import ShowConsults from './pages/ShowConsults';
import HistoryConsults from './pages/Admin/HistoryConsults';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin" element={<Admin />}>
        <Route path="" element={<Navigate to="patients" replace />} />
        <Route path="patients" element={<Patients />} />
        <Route path="doctors" element={<Doctors />} />
        <Route path="consults" element={<Consults />} />
        <Route path="history" element={<HistoryConsults />} />
      </Route>
      <Route path="/appointment" element={<CreateConsult />} />
      <Route path="/consults" element={<ShowConsults />} />
    </Routes>
  );
}
