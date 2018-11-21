import Shared, {makeInitialProps} from 'pages/report/shared'
import {
  LESSON_CLASS,
  LESSON_CLASS_KEY,
} from 'lib/i18n/translations'

const dataKey='v_all_lesson_class'
const titleKey=LESSON_CLASS
const descriptionKey=LESSON_CLASS
const i18nKey=LESSON_CLASS_KEY

const columns = [
  'tuan',
  'don_vi',
  'giang_vien',
  'ma_lop',
  'si_so',
  'thoi_gian',
  'ten_mon_hoc',
  'ma_mon_hoc',
  'magv',
  'noi_dung',
  'phong',
  'so_tiet',
  'tiet_bat_dau',
  'trang_thai',
]
const displayColumns = [
  'tuan',
  'don_vi',
  'giang_vien',
  'ma_lop',
  'ten_mon_hoc',
  'si_so',
  'thoi_gian',
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
