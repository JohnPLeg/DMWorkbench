import { Link } from 'react-router-dom';
import styles from './Navigation.module.css'

function Navigation() {

  return (
    <nav className={styles.homeNav}>
      <Link to="/"  className={styles.navLink}>Home</Link>
      <Link to="/stat-select" className={styles.navLink}>Stat Blocks</Link>
      <Link to='/stat-block-home' className={styles.navLink}>Dashboard</Link>
    </nav>
  );
}

export default Navigation;
