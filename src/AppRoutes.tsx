import { Navigate, Route, Routes } from 'react-router-dom';

import Home from './pagesOld/Home';
import Admin from './pagesOld/Admin';
import Patients from './pagesOld/Admin/Patients';
import Doctors from './pagesOld/Admin/Doctors';
import Consults from './pagesOld/Admin/Consults';
import CreateConsult from './pagesOld/CreateConsult';
import ShowConsults from './pagesOld/ShowConsults';
import HistoryConsults from './pagesOld/Admin/HistoryConsults';

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
