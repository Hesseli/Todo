import jwt from 'jsonwebtoken'

const { verify } = jwt

// Tarkistaa, että request sisältää kelvollisen JWT-tokenin
const auth = (req, res, next) => {
    // Hakee token requestin headerista
    const token = req.headers['authorization']
    // Jos token puuttuu, tulee error 401
    if (!token) {
        return res.status(401).json({ message: 'No token provided' })
    }
    // Tarkistetaan tokenin kelvollisuus
    verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Failed to authenticate token' })
        }
        next()
    })
}

export { auth }