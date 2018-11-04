import useLocalStorage from 'lib/hooks/local-storage'

const useGoogleAuth = (token) => {
  const [_, setValue, removeItem] = useLocalStorage(token)

  const onSuccess = (loginMutation) =>  async (response) => {
    const { data } = await loginMutation({variables: {id_token: response.tokenId}})
    if (data.login) {
      setValue(data.login.token)
    }
  }

  const onFailure = (_response) => {
    removeItem()
  }

  const logout = async (logoutMutation) => {  
    const { data } = await logoutMutation()
    if (data.logout) {
      removeItem()
    }
  }

  return {
    onSuccess,
    onFailure,
    logout,
  }
}

export default useGoogleAuth