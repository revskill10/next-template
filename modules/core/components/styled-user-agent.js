import {UserAgent} from '@quentin-sommer/react-useragent'

export const StyledUserAgent = ({children, computer, mobile}) => {
  if (computer) {
    return (
      <UserAgent computer>
        <div style={{padding: '5px'}}>
          {children}
        </div>
      </UserAgent>
    )
  } 
  
  if (mobile) { 
    return (
      <UserAgent mobile>
        <div style={{padding: '5px'}}>
          {children}
        </div>
      </UserAgent>
    )
  }
}

export default StyledUserAgent
  