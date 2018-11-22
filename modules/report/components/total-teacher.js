import Shared,{makeInitialProps} from 'modules/report/components/shared'
import {
  TOTAL_TEACHER,
  TOTAL_TEACHER_KEY,
} from 'lib/i18n/translations'

const dataKey='v_total_teacher_in_week'
const titleKey=TOTAL_TEACHER
const descriptionKey=TOTAL_TEACHER
const i18nKey=TOTAL_TEACHER_KEY
const columns = [
  'tuan',
  'total_teacher_in_week',
]
const displayColumns = columns
export const {getIndexProps, query, subscription} = makeInitialProps(columns, dataKey)

const Page = () => {
  return (
    <Shared
      titleKey={titleKey} 
      descriptionKey={descriptionKey} 
      dataKey={dataKey}
      i18nKey={i18nKey}
      columns={columns}
      query={query}
      subscription={subscription}
      displayColumns={displayColumns}
    />
  )
}

export default Page