import {Calendar} from 'material-ui-pickers';
import {HandPointLeft} from 'styled-icons/fa-regular/HandPointLeft.cjs'
import {HandPointRight} from 'styled-icons/fa-regular/HandPointRight.cjs'

const MuiCalendar = ({date, onChange}) => {
  return (
    <Calendar 
    leftArrowIcon={<HandPointLeft size={30} color={'rgb(209, 72, 54)'} title={'Previous month'} />}
    rightArrowIcon={<HandPointRight size={30} color={'rgb(209, 72, 54)'} title={'Next month'} />}
    date={date}
    onChange={onChange} />
  )
}

export default MuiCalendar

