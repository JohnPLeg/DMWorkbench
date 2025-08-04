import { Link } from 'react-router-dom';
import styles from './Navigation.module.css'
import { useLocation } from 'react-router-dom';

function Navigation() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <nav className={styles.homeNav}>
      <Link to="/"  className={styles.navLink}>Home</Link>
      <Link to="/stat-select" className={styles.navLink}>Stat Blocks</Link>
      <Link to='/login' className={styles.navLink}>Login</Link>
    </nav>
  );
}

export default Navigation;
