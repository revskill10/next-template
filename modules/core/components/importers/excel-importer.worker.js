import XLSX from 'xlsx';

self.addEventListener('message', (event) => {
  const bstr = event.data
  const wb = XLSX.read(bstr, {type:'binary'});
  /* Get first worksheet */
  const wsname = wb.SheetNames[0];
  const ws = wb.Sheets[wsname];
  /* Convert array of arrays */
  const bufferString = XLSX.utils.sheet_to_csv(ws, {header:1});
  const arr = bufferString.split('\n'); 
  const tmp = arr.map(item => {
    return item.split(',')
  })
  //console.log('Worker received:', event.data)
  self.postMessage(tmp)
})

