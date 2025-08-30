import { pool } from '../helper/db.js'
import { Router } from 'express'
import { compare, hash } from 'bcrypt'
import jwt from 'jsonwebtoken'

const { sign } = jwt
const router = Router()

// Rekisteröityminen
router.post('/signup', (req, res, next) => {
    const { user } = req.body
    // Tarkistetaan että email ja password löytyy
    if (!user || !user.email || !user.password) {
        const error = new Error('Email and password are required')
        // Jos ei, niin...
        return next(error)
    }

    // Hashataan salasana ennen tietokantaan tallennusta
    hash(user.password, 10, (err, hashedPassword) => {
        if (err) return next(err)

            pool.query('INSERT INTO account (email, password) VALUES ($1, $2) RETURNING*',
                [user.email, hashedPassword],
                (err, result) => {
                    if (err) {
                        return next(err)
                    }
                    res.status(201).json({ id: result.rows[0].id, email: user.email })
            })
    })
})

// Kirjautuminen
router.post('/signin', (req, res, next) => {
    const { user } = req.body
    // Tarkistetaan että email ja password löytyy
    if ( !user || !user.email || !user.password) {
        const error = new Error("Email and password are required")
        error.status = 400
        return next(error)
    }
    // Haetaan käyttäjä tietokannasta emailin perusteella
    pool.query('SELECT * FROM account WHERE email = $1', [user.email], (err, result) => {
        if (err) return next(err)

        // Jos käyttäjää kyseisellä emaililla ei löydy, niin...
        if (result.rows.length === 0) {
            const error = new Error('User not found')
            error.status = 404
            return next(error)
        }

        const dbUser = result.rows[0]

        // Verrataan compare funktiolla syötettyä salasanaa hashattuun salasanaan
        compare(user.password, dbUser.password, (err, isMatch) => {
            if (err) return next(err)

            // Jos annettu salasana ei täsmää kannasta löytyvään, niin...
            if (!isMatch) {
                const error = new Error('Invalid password')
                error.status = 401
                return next(error)
            }
            
        })
        // Jos taas salasana täsmää, niin generoidaan JWT-token
        const token = sign({ user: dbUser.email }, process.env.JWT_SECRET_KEY)
        // Palautetaan käyttäjätiedot + token frontille
        res.status(200).json({
            id: dbUser.id,
            email: dbUser.email,
            token
        })
    })
})

export default router