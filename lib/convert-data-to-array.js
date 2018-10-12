const convertDataToArray = (data, keys) =>
  data.map(obj => Array.from(keys, k=>obj[k]))

export default convertDataToArray