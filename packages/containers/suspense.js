import { Suspense, lazy } from 'react'
import NoSSR from 'react-no-ssr'

const NoSSRSuspense = ({loadPath}) => {
  const LazyChildren = lazy(loadPath)
  return (
    <NoSSR>
      <Suspense fallback={<div>...</div>}>
        <LazyChildren />
      </Suspense>
    </NoSSR>
  )
}

export default NoSSRSuspense
