const useGoogleAuth = (token) => {

  const onSuccess = (loginMutation) =>  async (response) => {
    const { data } = await loginMutation({variables: {id_token: response.tokenId}})
    if (data.login) {
      localStorage.setItem(token, data.login.token)
    } 
    window.location.reload()
  }

  const onFailure = (_response) => {
    removeItem()
  }

  const logout = async (logoutMutation) => {  
    const { data } = await logoutMutation()
    if (data.logout) {
      localStorage.removeItem(token)
    }
    window.location.reload()
  }

  return {
    onSuccess,
    onFailure,
    logout,
  }
}

export default useGoogleAuth