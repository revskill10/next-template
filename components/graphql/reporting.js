import { Flexrow, Flexcolumn } from 'layouts/Grid'
import { VictoryBar , VictoryChart } from 'victory';

export const KhoasList = ({khoas}) =>
  <ul>
    {khoas.map(item => {
      return (
        <li key={item.id}>{item.ten_khoa}</li>
      )
    })}
  </ul>

export const TuansList = ({tuans}) =>
  <ul>
    {tuans.map(item => {
      return (
        <li key={item.id}>Tuan: {item.id}: {item.tu_ngay} - {item.den_ngay}</li>
      )
    })}
  </ul>

export const TotalTeacherInWeek = ({v_total_teacher_in_week}) =>
    <Flexrow>
      <Flexcolumn size={3}>
        <ul>
          {v_total_teacher_in_week.map(item => {
            return (
              <li key={item.tuan}>
                Tuan {item.tuan} - Slgv: {item.total_teacher_in_week}
              </li>
            )
          })}
        </ul>
      </Flexcolumn>
      <Flexcolumn size={3}>
          <VictoryChart
            domainPadding={20}
          >
            <VictoryBar
              data={v_total_teacher_in_week.map(item => { return {tuan: item.tuan, slg_gv: Number(item.total_teacher_in_week) } })}
              // data accessor for x values
              x="tuan"
              // data accessor for y values
              y="slg_gv"
            />
          </VictoryChart>
      </Flexcolumn>
    </Flexrow>