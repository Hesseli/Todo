import { createContext } from 'react'

/* Luodaan uusi React Context käyttäjätiedoille. 
Se mahdollistaa user-tilan ja siihen liittyvien funktioiden jakamisen koko sovellukseen ilman propsien ketjuttamista*/

export const UserContext = createContext()