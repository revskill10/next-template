import styled from 'styled-components'

const Wrapped = styled.div`
  margin: 1rem 0;  
`

const Title = styled.h3`
  font-family: monospace;
`

const CodeBlock = styled.pre`
  background: #f6f8fa;
  fontSize: .65rem;
  padding: .5rem;
`

const DisplayFormikState = props =>
  <Wrapped>
    <Title />
    <CodeBlock>
      <strong>props</strong> ={' '}
      {JSON.stringify(props, null, 2)}
    </CodeBlock>
  </Wrapped>

export default DisplayFormikState