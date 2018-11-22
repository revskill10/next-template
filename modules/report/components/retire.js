import Shared,{makeInitialProps} from 'modules/report/components/shared'
import {
  RETIRE,
  RETIRE_KEY,
} from 'lib/i18n/translations'

const dataKey='v_detail_register_nghi_day'
const titleKey=RETIRE
const descriptionKey=RETIRE
const i18nKey=RETIRE_KEY
const columns = [
  'tuan',
  'thu',
  'thoi_gian',
  'magv',
  'tengiangvien',
  'ten_khoa',
  'ma_lop',
  'ma_mon_hoc',
  'ten_mon_hoc',
  'phong',
  'trangthai',
  'tiet_bat_dau',
  'so_tiet',
  'note',
]
const displayColumns = [
  'tuan',
  'thu',
  'thoi_gian',
  'magv',
  'tengiangvien',
  'ten_khoa',
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