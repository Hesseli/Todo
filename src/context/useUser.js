import { useContext } from 'react'
import { UserContext } from './UserContext.js'

// Antaa pääsyn user-tilaan ja siihen liittyviin funktioihin
export const useUser = () => {
  return useContext(UserContext)
}