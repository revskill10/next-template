const { AbilityBuilder, Ability } = require('@casl/ability')
function defineAbilityFor(user) {
  const { rules, can: allow, cannot: forbid } = AbilityBuilder.extract()
 
  if (user.roles.includes('staff')) {
    allow('manage', 'all')
  } 
  if (user.roles.includes('user')) {
    allow('read', 'all')
    allow('manage', 'Post', { author: 'me' })
    forbid('delete', 'Post')
  }
 
  return new Ability(rules)
}

const user = {
  id: 1,
  roles: ['user']
}

const ability = defineAbilityFor(user)
console.log(ability.rules)
