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

export const getToken = (req) => {
  return parseCookies(req).token
}
