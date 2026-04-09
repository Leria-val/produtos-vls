export function roleMiddleware(requiredRole) {
    return (req, res, next) => {
        // Leemos desde req.user.role porque así lo definiste en el authMiddleware
        const userRole = req.user?.role; 

        if (userRole === 'admin') {
            return next();
        }

        if (userRole !== requiredRole) {
            return res.status(403).json({
                error: "Acesso negado: Nível de permissão insuficiente",
            });
        }
        next();
    };
}
