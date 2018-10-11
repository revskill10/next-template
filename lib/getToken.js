import cookie from 'cookie'

const parseCookies = (req, options = {}) => {
  return cookie.parse(
    req ? req.headers.cookie || '' : document.cookie,
    options
  )
}

export const getToken = (req) => {
  return parseCookies(req).token
}
