import { ResponsiveLine } from '@nivo/line'
import sampleData from 'components/charts/sample-data'
// make sure parent container have a defined height when using responsive component,
// otherwise height will be 0 and no chart will be rendered.
// website examples showcase many properties, you'll often use just a few of them.
export default () =>
  <ResponsiveLine
      data={sampleData}
      margin={{
          "top": 50,
          "right": 110,
          "bottom": 50,
          "left": 60
      }}
      xScale={{
          "type": "point"
      }}
      yScale={{
          "type": "linear",
          "stacked": true,
          "min": "auto",
          "max": "auto"
      }}
      minY="auto"
      maxY="auto"
      stacked={true}
      axisBottom={{
          "orient": "bottom",
          "tickSize": 5,
          "tickPadding": 5,
          "tickRotation": 0,
          "legend": "transportation",
          "legendOffset": 36,
          "legendPosition": "center"
      }}
      axisLeft={{
          "orient": "left",
          "tickSize": 5,
          "tickPadding": 5,
          "tickRotation": 0,
          "legend": "count",
          "legendOffset": -40,
          "legendPosition": "center"
      }}
      dotSize={10}
      dotColor="inherit:darker(0.3)"
      dotBorderWidth={2}
      dotBorderColor="#ffffff"
      enableDotLabel={true}
      dotLabel="y"
      dotLabelYOffset={-12}
      animate={true}
      motionStiffness={90}
      motionDamping={15}
      legends={[
          {
              "anchor": "bottom-right",
              "direction": "column",
              "justify": false,
              "translateX": 100,
              "translateY": 0,
              "itemsSpacing": 0,
              "itemDirection": "left-to-right",
              "itemWidth": 80,
              "itemHeight": 20,
              "itemOpacity": 0.75,
              "symbolSize": 12,
              "symbolShape": "circle",
              "symbolBorderColor": "rgba(0, 0, 0, .5)",
              "effects": [
                  {
                      "on": "hover",
                      "style": {
                          "itemBackground": "rgba(0, 0, 0, .03)",
                          "itemOpacity": 1
                      }
                  }
              ]
          }
      ]}
    />