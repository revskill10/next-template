import {withRouter} from 'next/router'

const Page = ({router}) => {
  const {
    query
  } = router

  const {slug} = query
  return (
    <div>Slug is {slug}</div>
  )
}

export default withRouter(Page)
