import { Link } from 'react-router-dom';
import styles from './Navigation.module.css'
import { useLocation } from 'react-router-dom';

function Navigation() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <nav className={`${isHome ? `${styles.homeNav}` : `${styles.navigation}`}`}>
      <Link to="/"  className={styles.navLink}>Home</Link>
      <Link to="/stat-block-creator" className={styles.navLink}>Stat Blocks</Link>
    </nav>
  );
}

export default Navigation;
