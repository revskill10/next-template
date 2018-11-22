import Shared,{makeInitialProps} from 'modules/report/components/shared'
import {
  GENERAL_REPORT_IN_WEEK,
  GENERAL_REPORT_IN_WEEK_KEY,
} from 'lib/i18n/translations'

const dataKey='v_general_report_in_week'
const titleKey=GENERAL_REPORT_IN_WEEK
const descriptionKey=GENERAL_REPORT_IN_WEEK
const i18nKey=GENERAL_REPORT_IN_WEEK_KEY
const columns = [
  'tuan',
  'total_class',
  'total_lesson_class',
  'total_student_absent',
  'total_teacher_do_not_finish_in_week',
  'total_teacher_in_week',
  'total_times_student_absent',
  'total_times_teacher_add',
  'total_times_teacher_do_not_write',
  'total_times_teacher_retired',
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

