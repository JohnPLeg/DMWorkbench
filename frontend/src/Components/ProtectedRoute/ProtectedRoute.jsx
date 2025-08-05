import { Navigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import styles from './ProtectedRoute.module.css'

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return (
    <div className={styles.mainContainer}>
        <div className={styles.loader}/>
    </div>
  )

  return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
