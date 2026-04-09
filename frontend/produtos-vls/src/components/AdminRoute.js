const { user, loading, isAdmin } = useContext(AuthContext);

if (loading) return <p>Carregando...</p>;
if (!user || !isAdmin) return <Navigate to="/login" />;

return children;