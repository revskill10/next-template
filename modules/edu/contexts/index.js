import {createContext, useContext} from 'react'

const context = createContext('edu')
export const usePageContext = () => {
  const value = useContext(context)
  return value
}

export default context
