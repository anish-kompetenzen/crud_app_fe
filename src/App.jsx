import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import StudentRegistration from './components/StudentRegistration';
import ViewStudents from './components/ViewStudents';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<StudentRegistration />} />
        <Route path='/v' element={<ViewStudents />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
