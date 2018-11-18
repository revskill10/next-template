import {useState, useCallback, useEffect, Suspense} from 'react'
import ReactDropzone from "react-dropzone";
import DataTable from 'components/datatables/mui'
import {withNamespaces} from 'react-i18next'
import ExcelImporterWorker from 'pages/excel-importer.worker'

const options = {
  filterType: 'checkbox',
};
const ExcelImporter = ({t}) => {
  const [data, setData] = useState({
    rows: [],
    columns: [],
  })
  let worker = null
  let jsPDF = null

  const onWorkerMessage = (event) => {
    const [columns,...rows] = event.data
    /* Update state */
    setData({
      columns,
      rows,
    })
  }

  useEffect(() => {
    worker = new ExcelImporterWorker()
    worker.addEventListener('message', onWorkerMessage)

    return () => {
      worker.terminate()
    }
  })
  
  const onDrop = useCallback((files) => {
    const f = files[0]
    //var name = f.name;
    const reader = new FileReader();
    reader.onload = (evt) => { //evt = on_file_select event
      /* Parse data */
      const bstr = evt.target.result;
      worker.postMessage(bstr)
    };
    reader.readAsBinaryString(f);
  }, [data])
  
  return (
    <div className="app">
      <ReactDropzone
        onDrop={onDrop}
      >
        {t('import')}
      </ReactDropzone>
      {data.rows.length > 0 && <DataTable
        title={"Employee List"}
        data={data.rows}
        columns={data.columns}
        options={options}
      />}
    </div>
  );
}

export default withNamespaces(['common'])(ExcelImporter)
