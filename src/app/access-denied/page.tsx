export default function AccessDeniedPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold text-red-600">Acceso Denegado</h1>
      <p className="mt-4 text-gray-600">
        No tienes permisos para acceder a esta página
      </p>
    </div>
  )
} 