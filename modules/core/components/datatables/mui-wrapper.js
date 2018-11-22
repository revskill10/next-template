import {useContext} from 'react'
import DataTable from 'components/datatables/mui'
import { withNamespaces } from 'react-i18next'
import moveItemToFirst from 'lib/utils/move-item-to-first'
import chunkArray from 'lib/utils/chunk-array'
import convertDataToArray from 'lib/utils/convert-data-to-array'

const DataTableWrapper = ({t, tableContext, i18nKey, dataKey, columns, displayColumns}) => {
  const context = useContext(tableContext)
  const translatedColumns = columns.map(item => {
    const translated = t(`${i18nKey}.${item}`)
    if (!displayColumns.includes(item)) {
      return {
        name: translated,
        options: {
          display: 'false',
        }
      }
    } else {
      return translated
    }
  })
  const title=t(`${i18nKey}.name`)
  const data = convertDataToArray(context[dataKey], columns)
  const options = {
    rowsPerPage: 100
  }
  return (
    <DataTable data={data} columns={translatedColumns} title={title} options={options} />
  )
}

const TranslatedWrapper = ({namespaces, ...props}) => {
  const Wrapper = withNamespaces(namespaces)(DataTableWrapper)
  return <Wrapper {...props} />
}

export default TranslatedWrapper