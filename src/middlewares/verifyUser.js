import jwt from 'jsonwebtoken';

export const verificarUsuario = async (req, res, next) => {
    try {
        const token = req.headers["token-de-acceso"]
        if (!token) {
            return res.status(403).json({
                success: false,
                content: null,
                message: 'se requiere un token de acceso'
            })
        }
        const token_decodificado = jwt.verify(token, process.env.JWT_SECRET)
        if (token_decodificado._id !== req.params.userId) {
            return res.status(403).json({
                success: false,
                content: null,
                message: 'Usuario no autorizado'
            })
        }
        next()
        return 
    } catch(error) {
        res.status(500).json({
            success: false,
            content: null,
            message: 'error al obtener token'
        })
    }
}