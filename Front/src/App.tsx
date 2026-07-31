import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import UsuariosPage from './pages/UsuariosPage';
import LibrosPage from './pages/LibrosPage';
import PrestamosPage from './pages/PrestamosPage';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
        <Navbar />
        <main className="max-w-7xl mx-auto p-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/usuarios" element={<UsuariosPage />} />
            <Route path="/libros" element={<LibrosPage />} />
            <Route path="/prestamos" element={<PrestamosPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
