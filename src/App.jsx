import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import StudentRegistrationBE from './components/StudentRegistrationBE';
import ViewStudentsBE from './components/ViewStudentsBE';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<StudentRegistrationBE />} />
        <Route path='/v' element={<ViewStudentsBE />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
