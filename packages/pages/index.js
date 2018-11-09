import AppLayout from 'containers/layout-router'
import dynamic from 'next/dynamic'
import NoSSR from 'react-no-ssr'

const IndexPage = () => {
  const Datatable = dynamic(import(/* webpackChunkName: 'datatable' */ 'components/charts/datatable'), { ssr: false })
  const MapViewer = dynamic(import(/* webpackChunkName: 'map-viewer' */ "components/maps/map-view"), { ssr: false });
  return (
    <AppLayout
      title='Home page'
      description='Simple things'
      meta={<link rel="stylesheet" href="https://unpkg.com/leaflet@1.3.4/dist/leaflet.css"
      integrity="sha512-puBpdR0798OZvTTbP4A8Ix/l+A4dHDD0DGqYW6RQ+9jxkRFclaxxQb/SJAWZfWAkuyeQUytO7+7N4QKrDh+drA=="
      crossOrigin=""/>}
    >
      <>
      <NoSSR>
        <MapViewer />
        <Datatable />
      </NoSSR>
      </>
    </AppLayout>
  )
}
  

export default IndexPage
