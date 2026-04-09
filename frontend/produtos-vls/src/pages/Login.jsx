const { login } = useContext(AuthContext);
// ... dentro de la función de envío:
const result = await login(email, password);
if (result.success) navigate('/dashboard');