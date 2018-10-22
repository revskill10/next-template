import cookie from 'cookie'

const parseCookies = (req, options = {}) => {
  if ( req && typeof(req.headers) === 'undefined' && typeof(document) === 'undefined') {
    return {
      token: ''
    }
  }
  return cookie.parse(
    req ? req.headers.cookie || '' : document.cookie,
    options
  )
}

const parseLocalStorage = () => {
  const authorization = localStorage.getItem("Authorization")
  if (authorization) {
    return authorization.split(' ')[1]
  } else {
    return null
  }
}

export const getToken = (req) => {
  return process.browser ? parseLocalStorage() : parseCookies(req).token
}
