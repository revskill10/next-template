const useGoogleAuth = (token) => {

  const onSuccess = (loginMutation) =>  async (response) => {
    const { data, errors } = await loginMutation({variables: {id_token: response.tokenId}})
    if (data.login) {
      localStorage.setItem(token, data.login.token)
    } 
    window.location.reload()
  }

  const onFailure = (response) => {
    localStorage.removeItem(token)
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