export default function ProfileDashboard() {
  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      {/* Panel Principal */}
      <div style={{ 
        display: 'flex',
        gap: '20px',
        flexWrap: 'wrap'
      }}>
        {/* Perfil */}
        <div style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          flex: '1',
          minWidth: '250px'
        }}>
          <img 
            src="https://via.placeholder.com/100"
            alt="Perfil"
            style={{
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              display: 'block',
              margin: '0 auto'
            }}
          />
          <h2 style={{ textAlign: 'center', margin: '10px 0' }}>Juan Pérez</h2>
          <p style={{ textAlign: 'center', color: '#666' }}>Desarrollador</p>
        </div>

        {/* Información */}
        <div style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          flex: '2',
          minWidth: '300px'
        }}>
          <h3>Información Personal</h3>
          <div style={{ marginTop: '10px' }}>
            <p><strong>Email:</strong> juan@ejemplo.com</p>
            <p><strong>Teléfono:</strong> +34 123 456 789</p>
            <p><strong>Ubicación:</strong> Madrid, España</p>
          </div>

          <h3 style={{ marginTop: '20px' }}>Estadísticas</h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
            gap: '10px',
            marginTop: '10px'
          }}>
            <div style={{ textAlign: 'center' }}>
              <h4>Proyectos</h4>
              <p>12</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <h4>Tareas</h4>
              <p>48</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <h4>Completadas</h4>
              <p>36</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
