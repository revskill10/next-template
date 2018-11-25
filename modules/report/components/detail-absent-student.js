import Shared,{makeInitialProps} from 'modules/report/components/shared'
import {
  DETAIL_ABSENT_STUDENT,
  DETAIL_ABSENT_STUDENT_KEY,
} from 'modules/report/translations'

const dataKey='v_detail_student_absent_in_week'
const titleKey=DETAIL_ABSENT_STUDENT
const descriptionKey=DETAIL_ABSENT_STUDENT
const i18nKey=DETAIL_ABSENT_STUDENT_KEY
const columns = [
  'tuan',
  'masinhvien',
  'hoten',
  'ma_lop_hanh_chinh',
  'so_tiet_vang',
  'thu',
  'thoi_gian',
  'ma_lop',
  'ma_mon_hoc',
  'ten_mon_hoc',
  'tengiangvien',
  'don_vi',
]
const displayColumns = [
  'tuan',
  'masinhvien',
  'hoten',
  'ma_lop_hanh_chinh',
  'so_tiet_vang',
]

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