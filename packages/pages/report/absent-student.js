import Shared, {makeInitialProps} from 'pages/report/shared'
import {
  ABSENT_STUDENT,
  ABSENT_STUDENT_KEY,
} from 'lib/i18n/translations'

const namespaces=['report']
const dataKey='v_detail_student_absent_greater_20_percent'
const titleKey=ABSENT_STUDENT
const descriptionKey=ABSENT_STUDENT
const i18nKey=ABSENT_STUDENT_KEY
const columns = [
  'stt',
  'masinhvien',
  'hoten',
  'ma_lop_hanh_chinh',
  'ma_lop',
  'ma_mon_hoc',
  'ten_mon_hoc',
  'tengiangvien',
  'tongtietvang',
  'sotietphanbo',
  'tyle',
]
const displayColumns = [
  'stt',
  'masinhvien',
  'hoten',
  'ma_lop_hanh_chinh',
  'ten_mon_hoc',
  'tongtietvang',
  'tengiangvien',
]
export const {getIndexProps, query, subscription} = makeInitialProps(columns, dataKey)

const Page = () => {
  return (
    <Shared
      titleKey={titleKey} 
      descriptionKey={descriptionKey} 
      namespaces={namespaces}
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