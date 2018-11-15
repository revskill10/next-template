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
    try {
      await logoutMutation()
      localStorage.removeItem(token)
      window.location.reload()
    } catch (e) {
      console.log(e)
    }
  }

  return {
    onSuccess,
    onFailure,
    logout,
  }
}

export default useGoogleAuth