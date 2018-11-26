import {routeMatcher} from 'route-matcher'
import {withRouter} from 'next/router'

const Router = ({routes, router}) => {
  let component = null
  const { pathname } = router
  routes.forEach(item => {
    const qs = routeMatcher(item.route)
    const parsed = qs.parse(pathname)
    if (parsed) {
      component = item.component(parsed)
    }
  })
  return component
}

export default withRouter(Router)
