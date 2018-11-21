import Shared, {makeInitialProps} from 'pages/report/shared'
// i18n 
import {
  UNWRITTEN_TEACHER,
  UNWRITTEN_TEACHER_KEY,
} from 'lib/i18n/translations'

const dataKey='v_all_teacher_do_not_write'
const titleKey=UNWRITTEN_TEACHER
const descriptionKey=UNWRITTEN_TEACHER
const i18nKey=UNWRITTEN_TEACHER_KEY
const columns = [
  'tuan',
  'thu',
  'thoi_gian',
  'code',
  'tengiangvien',
  'donvi',
  'ma_lop',
  'ten_mon_hoc',
  'phong',
  'ma_mon_hoc',
  'trangthai',
  'tiet_bat_dau',
  'so_tiet',
]
const displayColumns = [
  'tuan',
  'thu',
  'thoi_gian',
  'code',
  'tengiangvien',
  'donvi',
  'ma_lop',
  'ten_mon_hoc',
  'phong',
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

