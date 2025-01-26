import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      {/* Barra de navegación */}
      <nav className="flex justify-between items-center p-6">
        <div className="flex items-center gap-2">
          <Image
            src="/gym-logo.svg" // Necesitarás crear este logo
            alt="GymPro Logo"
            width={40}
            height={40}
          />
          <span className="text-2xl font-bold">GymPro</span>
        </div>
        <Link
          href="/auth/login"
          className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg transition-colors"
        >
          Iniciar Sesión
        </Link>
      </nav>

      {/* Hero Section */}
      <main className="flex flex-col items-center text-center px-8 pt-20 pb-12">
        <h1 className="text-5xl font-bold mb-6">
          Administra tu gimnasio de manera profesional
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mb-12">
          Gestiona membresías, controla accesos, maneja pagos y más con la plataforma más completa para la administración de gimnasios.
        </p>
        
        <div className="flex gap-4 flex-col sm:flex-row">
          <Link
            href="/auth/register"
            className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
          >
            Comenzar prueba gratuita
          </Link>
          <a
            href="#features"
            className="border border-white/20 hover:bg-white/10 px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
          >
            Ver características
          </a>
        </div>
      </main>

      {/* Footer simplificado */}
      <footer className="text-center py-8 text-gray-400">
        <div className="flex justify-center gap-8">
          <a href="#" className="hover:text-white transition-colors">Características</a>
          <a href="#" className="hover:text-white transition-colors">Precios</a>
          <a href="#" className="hover:text-white transition-colors">Contacto</a>
        </div>
      </footer>
    </div>
  );
}
