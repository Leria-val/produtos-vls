export function roleMiddleware(requiredRole){
    return (req,res,next)=>{
        if(req.userRole === 'admin'){
            return next();
        }

        if(req.userRole !== requiredRole){
            return res.status(403).json({
                error: "Acesso negado: Nível de permissão insuficiente",
            });
        }
        next();
    };
}