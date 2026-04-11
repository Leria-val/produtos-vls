import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';

const Layout = () => {
  return (
    <div className="app-container">
      <NavBar />
      <main style={{ padding: '20px' }}>
        <Outlet /> {/* Aqui é onde as páginas (Dashboard, etc) serão renderizadas */}
      </main>
    </div>
  );
};

export default Layout;