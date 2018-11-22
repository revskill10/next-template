import Shared,{makeInitialProps} from 'modules/report/components/shared'
const {
  ADDITIONAL_HOUR,
  ADDITIONAL_HOUR_KEY,
} = require('lib/i18n/translations')

const titleKey=ADDITIONAL_HOUR
const descriptionKey=ADDITIONAL_HOUR
const i18nKey=ADDITIONAL_HOUR_KEY
const dataKey='v_detail_register_day_bo_sung'
const columns = [
  'tuan',
  'thoi_gian',
  'thu',
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
  'thoi_gian',
  'thu',
  'tengiangvien',
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