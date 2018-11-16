const moveItemToFirst = (data, itemName) => {
  return data.sort(function(x,y){ return x == itemName ? -1 : y == itemName ? 1 : 0; });
}

export default moveItemToFirst
