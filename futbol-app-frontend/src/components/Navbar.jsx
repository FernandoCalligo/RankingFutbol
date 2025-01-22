import React from 'react';
import { Link } from 'react-router-dom'; // Importamos Link de React Router

const Navbar = () => {
  return (
    <nav style={styles.navbar}>
      <ul style={styles.navList}>
        <li style={styles.navItem}>
          <Link to="/" style={styles.navLink}>Ranking</Link> {/* Link al ranking */}
        </li>
        <li style={styles.navItem}>
          <Link to="/add-match" style={styles.navLink}>Registrar Partido</Link> {/* Link para agregar partido */}
        </li>
        <li style={styles.navItem}>
          <Link to="/login" style={styles.navLink}>Login</Link> {/* Link al login */}
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

export default Navbar;
