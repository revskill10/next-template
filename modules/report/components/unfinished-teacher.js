import Shared,{makeInitialProps} from 'modules/report/components/shared'
import {
  UNFINISHED_TEACHER,
  UNFINISHED_TEACHER_KEY,
} from 'lib/i18n/translations'

const dataKey='v_all_teacher_do_not_finish'
const titleKey=UNFINISHED_TEACHER
const descriptionKey=UNFINISHED_TEACHER
const i18nKey=UNFINISHED_TEACHER_KEY
const columns = [
  'tuan',
  'donvi',
  'thu',
  'thoi_gian',
  'tengiangvien',
  'ten_mon_hoc',
  'phong',
  'ma_lop',
  'ma_mon_hoc',
  'code',
  'trangthai',
  'tiet_bat_dau',
  'so_tiet',
]
const displayColumns = [
  'tuan',
  'donvi',
  'thu',
  'thoi_gian',
  'tengiangvien',
  'ten_mon_hoc',
  'phong',
  'ma_lop',
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