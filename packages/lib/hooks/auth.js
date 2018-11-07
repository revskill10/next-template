import { useContext } from 'react'
import { UserContext } from 'containers/contexts'

const useAuth = () => {
  const {currentUser} = useContext(UserContext)

  const isAuthenticated = !currentUser.roles.includes('guest')
  const isAdmin = currentUser.roles.includes('admin')

  return {
    isAuthenticated,
    isAdmin,
    currentUser,
  }
}

export default useAuth
