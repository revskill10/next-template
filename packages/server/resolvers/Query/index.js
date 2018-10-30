async function currentUser(parents, args, context, info) {
  const { currentUser } = context
  return currentUser
}

module.exports = {
  currentUser,
}
