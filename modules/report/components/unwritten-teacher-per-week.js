import Shared,{makeInitialProps} from 'modules/report/components/shared'
import {
  UNWRITTEN_TEACHER_PER_WEEK,
  UNWRITTEN_TEACHER_PER_WEEK_KEY,
} from 'lib/i18n/translations'

const dataKey='v_total_teacher_do_not_write_in_week'
const titleKey=UNWRITTEN_TEACHER_PER_WEEK
const descriptionKey=UNWRITTEN_TEACHER_PER_WEEK
const i18nKey=UNWRITTEN_TEACHER_PER_WEEK_KEY
const columns = [
  'tuan',
  'total_teacher_do_not_write_in_week',
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

