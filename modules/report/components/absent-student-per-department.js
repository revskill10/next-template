import Shared,{makeInitialProps} from 'modules/report/components/shared'
const {
  ABSENT_STUDENT_PER_DEPARTMENT,
  ABSENT_STUDENT_PER_DEPARTMENT_KEY,
} = require('lib/i18n/translations')

const titleKey=ABSENT_STUDENT_PER_DEPARTMENT
const descriptionKey=ABSENT_STUDENT_PER_DEPARTMENT
const i18nKey=ABSENT_STUDENT_PER_DEPARTMENT_KEY
const dataKey='v_total_student_absent_department_in_week'
const columns = [
  'tuan',
  'ten_khoa',
  'slg_sv_vang',
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