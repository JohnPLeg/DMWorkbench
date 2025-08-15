import { Link, useNavigate } from 'react-router-dom';
import styles from './Navigation.module.css';
import { getAuth, signOut } from "firebase/auth";
import { useAuth } from "../../Context/AuthContext";

function Navigation() {
  const navigate = useNavigate();
  const auth = getAuth();
  const { user } = useAuth();

  const handleLogout = async () => {
    signOut(auth).then(() => {
      console.log("Signed Out");
      navigate('/login');
    }).catch((error) => {
      console.log(error);
    })
  }

  return (
    <nav className={styles.homeNav}>
      <Link to="/"  className={styles.navLink}>Home</Link>
      <Link to="/stat-select" className={styles.navLink}>Stat Blocks</Link>
      <Link to='/stat-block-home' className={styles.navLink}>Dashboard</Link>
      <Link to='/initiative' className={styles.navLink}>Initiative Tracker</Link>
      <Link to='/notepad-player' className={styles.navLink}>Notepad</Link>
      {user ? <nav onClick={handleLogout} className={styles.navLink}>Logout</nav> : ''}
    </nav>
  );
}

export default Navigation;
