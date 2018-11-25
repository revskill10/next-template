const jwt = require('jsonwebtoken')

async function query({variables = {}, query, context, onData, onError }, client){
  try {
    const res = await client.query({query, variables})
    if (onData && typeof(onData) === 'function') {
      return onData(res.data, context)
    } else {
      return res.data
    }
  } catch (error) {
    if (onError && typeof(onError) === 'function') {
      return onError(error, context)
    } else {
      return error
    }
  }
}

async function mutate({variables = {}, query, context, onData, onError }, client){
  try {
    const res = await client.mutate({mutation: query, variables})
    if (onData && typeof(onData) === 'function') {
      return onData(res.data, context)
    } else {
      return res.data
    }    
  } catch (error) {
    if (onError && typeof(onError) === 'function') {
      return onError(error, context)
    } else {
      return error
    }
  }
}

function subscribe({variables = {}, query, context, onData, onError }, client) {
  const { 
    pubsub,
    currentUser,
  } = context
  //const now = new Date().toISOString()
  const channel = currentUser.user_id //`${currentUser.user_id}-${now}`
  try {
    client.subscribe({
      query,
      variables,
    }).subscribe({
      next ({ data }) {
        pubsub.publish(
          channel, 
          onData(data, context)
        )
      }
    });
  } catch (error) {
    return onError(error, context)
  }
  
  return pubsub.asyncIterator(channel)
}

function createJwtToken({user_id, name, roles, permissions, active}){
  const data = {user_id, name, roles, permissions, active}
  return jwt.sign(data, process.env.JWT_SECRET);
}

function googleVerifyUri(id_token){
  return `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${id_token}`
}

function setCookie(context, token) {
  context.response.cookie('token', token, { maxAge: 900000, httpOnly: true, secure: !context.dev });    
}

function clearCookie(context) {
  context.response.clearCookie('token')
}

module.exports = {
  query,
  mutate,
  subscribe,
  createJwtToken,
  googleVerifyUri,
  setCookie,
  clearCookie,
}