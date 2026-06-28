import jwt from 'jsonwebtoken';

const KEY = process.env.JWT_KEY;

function extractToken(req) {
    let token = req.headers['authorization'];

    if (token)
        token = token.replace('Bearer ', '');

    return token;
}


export function generateToken(userInfo) {
    return jwt.sign(userInfo, KEY, { expiresIn: '1d' });
}


export function getTokenInfo(req) {
    try {
        let token = extractToken(req);

        if (!token) return null;

        return jwt.verify(token, KEY);
    } catch {
        return null;
    }
}


export function getAuthentication() {
    return (req, resp, next) => {
        try {
            let token = extractToken(req);

            if (!token) {
                return resp.status(401).send({
                    erro: 'Token não informado'
                });
            }

            let signd = jwt.verify(token, KEY);

            req.user = signd;

            next();
        }
        catch {
            resp.status(401).send({
                erro: 'Token inválido'
            });
        }
    }
}


export function onlyAdmin() {
    return (req, resp, next) => {
        if (req.user.tipo !== 'ADMIN') {
            return resp.status(403).send({
                erro: 'Acesso negado'
            });
        }
        next();
    }
}