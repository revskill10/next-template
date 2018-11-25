import { Select } from 'antd';
const Option = Select.Option;

const AgeSelector = ({defaultValue, agesOptions, handleChange}) => {
  const defaultLabel = agesOptions.filter(item => {
    return item.id === defaultValue.age_id
  })[0].name
  const options = agesOptions.map(item => {
    return <Option key={item.id} value={item.id}>{item.name}</Option>
  })
  return (
    <Select defaultValue={defaultLabel} style={{ width: 120 }} onChange={handleChange}>
      {options}
    </Select>
  )
}
    
export default AgeSelector