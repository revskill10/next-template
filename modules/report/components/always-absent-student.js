import Shared,{makeInitialProps} from 'modules/report/components/shared'
import {
  ALWAYS_ABSENT_STUDENT,
  ALWAYS_ABSENT_STUDENT_KEY,
} from 'lib/i18n/translations'

const dataKey='v_total_student_absent_greater_20_percent'
const titleKey=ALWAYS_ABSENT_STUDENT
const descriptionKey=ALWAYS_ABSENT_STUDENT
const i18nKey=ALWAYS_ABSENT_STUDENT_KEY
const columns = [
  'total_student_absent_greater_20_percent'
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