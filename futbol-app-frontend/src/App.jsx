import React, { useState } from 'react';
import { Route, Routes, Navigate, Link } from 'react-router-dom';
import AddMatch from './components/AddMatch';
import PlayerRanking from './components/PlayerRanking';

// Componente Navbar con enlaces
const Navbar = () => {
  return (
    <nav style={styles.navbar}>
      <ul style={styles.navList}>
        <li style={styles.navItem}>
          <Link to="/player-ranking" style={styles.navLink}>Ranking</Link>
        </li>
        <li style={styles.navItem}>
          <Link to="/add-match" style={styles.navLink}>Registrar Partido</Link>
        </li>
      </ul>
    </nav>
  );
};

// Estilos para el Navbar
const styles = {
  navbar: {
    backgroundColor: '#333',
    padding: '10px 20px',
    color: 'white',
  },
  navList: {
    listStyleType: 'none',
    margin: 0,
    padding: 0,
    display: 'flex',
    justifyContent: 'space-around',
  },
  navItem: {
    margin: '0 15px',
  },
  navLink: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '18px',
  }
};

const App = () => {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');

  // Cambia la contraseña de acceso
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // Verifica la contraseña
  const handleLogin = () => {
    const correctPassword = '12345'; // La contraseña secreta para AddMatch
    if (password === correctPassword) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Contraseña incorrecta');
    }
  };

  return (
    <>
      <Navbar /> {/* Navbar para la navegación en todas las páginas */}

      <Routes>
        {/* Ruta para el ranking, siempre accesible */}
        <Route path="/player-ranking" element={<PlayerRanking />} />

        {/* Ruta privada para AddMatch */}
        <Route
          path="/add-match"
          element={
            isAuthenticated ? (
              <AddMatch />
            ) : (
              <div className="login-container">
                <h2>Ingresar Contraseña</h2>
                <input
                  type="password"
                  placeholder="Ingresa la contraseña"
                  value={password}
                  onChange={handlePasswordChange}
                />
                <button onClick={handleLogin}>Acceder</button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
              </div>
            )
          }
        />

        {/* Redirigir al ranking si no está autenticado */}
        <Route path="/" element={<Navigate to="/player-ranking" />} />
      </Routes>
    </>
  );
};

export default App;
