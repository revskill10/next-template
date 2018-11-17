import {useContext} from 'react'
import DataTable from 'components/datatables/mui'
import { withNamespaces } from 'react-i18next'
import moveItemToFirst from 'lib/utils/move-item-to-first'
import chunkArray from 'lib/utils/chunk-array'
import convertDataToArray from 'lib/utils/convert-data-to-array'

function getColumnsFromMeta(meta, i18nKey, t, key='tuan') {
  const keys = meta.fields.map(item => {
    return item.name
  })

  let columns = []

  const sortedKeys = moveItemToFirst(keys, key)
  if (keys.length > 7) {
    const [shownKeys, hiddenKeys] = chunkArray(sortedKeys, 2)
  
    columns = shownKeys.map(item => {
      const tmp = `${i18nKey}.${item}`
      return t(tmp)
    }).concat(hiddenKeys.map(item => {
      const tmp = `${i18nKey}.${item}`
      return {
        name: t(tmp),
        options: {
          display: false
        }
      }
    }))
  } else {
    columns = sortedKeys.map(item => {
      const tmp = `${i18nKey}.${item}`
      return t(tmp)
    })
  }

  return [sortedKeys, columns]
}

const DataTableWrapper = ({t, tableContext, metaContext, i18nKey, dataKey, firstKey}) => {
  const context = useContext(tableContext)
  const {meta} = useContext(metaContext)
  const [sortedKeys, columns] = getColumnsFromMeta(meta, i18nKey, t, firstKey)
  const title=t(`${i18nKey}.name`)
  const data = convertDataToArray(context[dataKey], sortedKeys)
  return (
    <DataTable data={data} columns={columns} title={title} />
  )
}

const TranslatedWrapper = ({namespaces, ...props}) => {
  const Wrapper = withNamespaces(namespaces)(DataTableWrapper)
  return <Wrapper {...props} />
}

export default TranslatedWrapper