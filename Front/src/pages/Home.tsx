import { Link } from 'react-router-dom';
import { Users, BookOpen, BookMarked, ArrowRight } from 'lucide-react';

export default function Home() {
  const cards = [
    {
      title: 'Gestión de Usuarios',
      description: 'Registra, edita y consulta la información de los lectores de la biblioteca.',
      icon: Users,
      link: '/usuarios',
      color: 'bg-blue-500',
    },
    {
      title: 'Catálogo de Libros',
      description: 'Administra el inventario de libros disponibles, sus autores y categorías.',
      icon: BookOpen,
      link: '/libros',
      color: 'bg-emerald-500',
    },
    {
      title: 'Control de Préstamos',
      description: 'Gestiona los préstamos activos, fechas de devolución y registros.',
      icon: BookMarked,
      link: '/prestamos',
      color: 'bg-violet-500',
    },
  ];

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm text-center max-w-3xl mx-auto my-8">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-3">
          Sistema de Gestión de Biblioteca
        </h1>
        <p className="text-slate-600 text-base max-w-xl mx-auto">
          Bienvenido al panel de administración. Selecciona un módulo para gestionar los registros del sistema.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.title}
              className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className={`${card.color} text-white w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h2 className="text-lg font-bold text-slate-800 mb-2">{card.title}</h2>
                <p className="text-sm text-slate-500 mb-6">{card.description}</p>
              </div>

              <Link
                to={card.link}
                className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 group"
              >
                Ir al módulo <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}