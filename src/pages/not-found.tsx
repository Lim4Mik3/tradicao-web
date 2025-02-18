import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-4xl font-bold text-red-500">404</h1>
      <p className="text-lg text-white">Página não encontrada</p>

      <Link
        to="/"
        className="mt-4 px-4 py-2 bg-red-400 text-gray-800 rounded-md"
      >
        Voltar para Home
      </Link>
    </div>
  );
}
