import styled from 'styled-components'

const StyledAside = styled.aside`
* {
  padding: 1.5em;
  font-size: 14px;
  color: white;
  background-color: red;
}
`
export default ({ message }) => (
  <StyledAside>
    {message}
  </StyledAside>
)
