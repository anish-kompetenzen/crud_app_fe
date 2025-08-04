import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import StudentRegistrationBE from './components/StudentRegistrationBE';
import ViewStudentsBE from './components/ViewStudentsBE';
import ChatBot from './components/ChatBot';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<ChatBot />} />
        <Route path='/v' element={<ViewStudentsBE />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
