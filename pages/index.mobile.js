import React, {Component} from 'react'
import {
  WhiteSpace, WingBlank,
  NavBar, Icon, Pagination, Steps
} from 'antd-mobile'
import Layout from 'containers/layouts/guest.mobile'
import MenuBar from 'containers/layouts/menu-bar.mobile'
import { withI18next } from 'lib/hocs/with-i18next'
import {withRouter} from 'next/router'
import {compose} from 'recompose'
import styled from 'styled-components'
import { Grid } from 'antd-mobile';

const data = Array.from(new Array(9)).map((_val, i) => ({
  icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
  text: `name${i}`,
}));

const data1 = Array.from(new Array(9)).map(() => ({
  icon: 'https://gw.alipayobjects.com/zos/rmsportal/WXoqXTHrSnRcUwEaQgXJ.png',
}));

const Subtitle = styled.div`
  color: #888;
  font-size: 14px;
  padding: 15px 0 9px 15px;
`
const NotSquare = styled(Grid)`
  width: 40px;
  height: 60px;
`

const GridExample = () => (
  <div>
    <Subtitle>Always square grid item </Subtitle>
    <Grid data={data} activeStyle={false} />

    <Subtitle>Grid item adjust accroiding to img size </Subtitle>
    <NotSquare square={false} />

    <Subtitle>ColumnNum=3 </Subtitle>
    <Grid data={data} columnNum={3} />

    <Subtitle>No border</Subtitle>
    <Grid data={data} hasLine={false} />

    <Subtitle>Carousel</Subtitle>
    <Grid data={data} isCarousel onClick={_el => console.log(_el)} />

    <Subtitle>Custom content</Subtitle>
    <Grid data={data1}
      columnNum={3}
      renderItem={dataItem => (
        <div style={{ padding: '12.5px' }}>
          <img src={dataItem.icon} style={{ width: '75px', height: '75px' }} alt="" />
          <div style={{ color: '#888', fontSize: '14px', marginTop: '12px' }}>
            <span>I am title..</span>
          </div>
        </div>
      )}
    />
    <Subtitle>Custom GridCell Style</Subtitle>
    <Grid data={data1} columnNum={3} itemStyle={{ height: '150px', background: 'rgba(0,0,0,.05)' }} />
  </div>
);


export default compose(
  withRouter,
  withI18next(['common'])
)(GridExample)