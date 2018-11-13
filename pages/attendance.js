import 'semantic-ui-css/semantic.min.css'
import { useState } from 'react'
import { Input, Menu, Divider, Image, Container } from 'semantic-ui-react'
import gql from 'graphql-tag'
import ReactFilestack from 'filestack-react'
import withInitialProps from 'lib/hocs/with-initial-props'
import getConfig from 'next/config'
import withGraphql from 'lib/hocs/with-graphql'
import {compose} from 'recompose'

const dataQuery = gql`
  query posts($first: Int!, $skip: Int!) {
    posts(orderBy: updatedAt_DESC, first: $first, skip: $skip) {
      id
      
      title
      updatedAt
      category{
        id
        name
      }
    },
    postsConnection {
      aggregate {
        count
      }
    }
  }
`

const getInitialProps = async ({apolloClient, query}) => {
  const variables = {
    skip: 0,
    first: 4
  }
  await apolloClient.query({query: dataQuery, variables})
}

const Header = () => {
  const [activeItem, setActiveItem] = useState('home')
  const handleItemClick = (e, { name }) => setActiveItem(name)

  return (
    <Menu secondary>
      <Menu.Item name='home' active={activeItem === 'home'} onClick={handleItemClick} />
      <Menu.Item
        name='messages'
        active={activeItem === 'messages'}
        onClick={handleItemClick}
      />
      <Menu.Item
        name='friends'
        active={activeItem === 'friends'}
        onClick={handleItemClick}
      />
      <Menu.Menu position='right'>
        <Menu.Item>
          <Input icon='search' placeholder='Search...' />
        </Menu.Item>
        <Menu.Item
          name='logout'
          active={activeItem === 'logout'}
          onClick={handleItemClick}
        />
      </Menu.Menu>
    </Menu>
  )
}

const FileUpload = ({onUploadSuccess}) => {
  const [imageUrl, setImageUrl] = useState(null)
  const {publicRuntimeConfig} = getConfig()
  const {FILESTACK_KEY} = publicRuntimeConfig
  const basicOptions = {
    accept: 'image/*',
    fromSources: ['local_file_system','webcam'],
    maxSize: 1024 * 1024,
    maxFiles: 1,
  }
  const onSuccess = (result) => {
    const url = result.filesUploaded[0].url
    setImageUrl(url)
    onUploadSuccess(url)
  }
  const onError = (error) => {
    console.log(error)
    setImageUrl(null)
  }

  return (
    <>
      <ReactFilestack
        apikey={FILESTACK_KEY}
        buttonText="Upload Photo"
        buttonClass="ui medium button gray"
        options={basicOptions}
        onSuccess={onSuccess}
        onError={onError}
      />
      {imageUrl && <Image src={imageUrl} size='medium' circular />}
    </>
  )
}

const Attendance = () => {
  const onUploadSuccess = (url) => {
    alert(url)
  }
 
  return (
    <Container fluid>
      <Header />
      <Divider />
      <FileUpload onUploadSuccess={onUploadSuccess} />
    </Container>
  )
}

const graphqlOptions = {perPage: 4, query: dataQuery, key: 'posts'}
export default compose(
  withGraphql(graphqlOptions),
  withInitialProps(getInitialProps),
)(Attendance)