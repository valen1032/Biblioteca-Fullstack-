import { Link, useLocation } from 'react-router-dom';
import { BookOpen, Users, BookMarked, Home } from 'lucide-react';

export default function Navbar() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: '/', label: 'Inicio', icon: Home },
    { path: '/usuarios', label: 'Usuarios', icon: Users },
    { path: '/libros', label: 'Libros', icon: BookOpen },
    { path: '/prestamos', label: 'Préstamos', icon: BookMarked },
  ];

  return (
    <header className="bg-slate-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <BookOpen className="w-7 h-7 text-blue-400" />
          <span className="font-bold text-xl tracking-tight">Biblioteca App</span>
        </div>

        <nav className="flex items-center gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                  active
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}