import { Flexrow, Flexcolumn } from '../../layouts/Grid'
import { VictoryBar , VictoryChart, VictoryTheme } from 'victory';
import NoSSR from 'react-no-ssr';

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
        <li key={item.id}>{item.tu_ngay} - {item.den_ngay}</li>
      )
    })}
  </ul>

export const TotalTeacherInWeek = ({v_get_total_teacher_in_week}) =>
  <Flexcolumn size={6}>
    <Flexrow>
      <Flexcolumn size={3}>
        <ul>
          {v_get_total_teacher_in_week.map(item => {
            return (
              <li key={item.tuan}>
                Tuan {item.tuan} - Slgv: {item.slg_gv}
              </li>
            )
          })}
        </ul>
      </Flexcolumn>
    </Flexrow>
    <Flexrow>
      <Flexcolumn size={3}>
        <NoSSR>
          <VictoryChart
            theme={VictoryTheme.material}
            domainPadding={20}
          >
            <VictoryBar
              data={v_get_total_teacher_in_week}
              // data accessor for x values
              x="tuan"
              // data accessor for y values
              y="slg_gv"
            />
          </VictoryChart>
        </NoSSR>
      </Flexcolumn>
    </Flexrow>
  </Flexcolumn>