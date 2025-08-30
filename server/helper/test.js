import fs from 'fs'
import path from 'path'
import { pool } from './db.js'
import { hash } from 'bcrypt'
import jwt from 'jsonwebtoken'


const __dirname = import.meta.dirname

// Alustaa testitietokannan
// Lukee db.sql tiedoston ja suorittaa sen tietokantaan
const initializeTestDb = () => {
    const sql = fs.readFileSync(path.resolve(__dirname, '../db.sql'), 'utf8')

    pool.query(sql, (err) => {
        if (err) {
            console.error('Error initialze test database:', err)
        }
        else {
            console.log('Test database initialize succesfully')
        }
    })
}
// Lisää testikäyttäjän tietokantaan
// Salasana hashataan enne tallennusta
const insertTestUser = (email, password) => {
    hash(password, 10, (err, hashedPassword) => {
        if (err) {
            console.error('Error hashing password', err)
            return
        }

        pool.query('INSERT INTO account (email, password) VALUES ($1, $2)',
            [email, hashedPassword],
            (err, result) => {
                if (err) {
                    console.error('Error inserting test user', err)
                }
                else {
                    console.log('Test user inserted succesfully')
                }
        })
    })
}
// Generoi JWT-tokenin testikäyttäjälle
// Palauttaa tokenin, jota voi käyttää suojattuihin API-kutsuihin testeissä
const getToken = (email) => {
    return jwt.sign({ email }, process.env.JWT_SECRET_KEY)
}

export { initializeTestDb, insertTestUser, getToken }