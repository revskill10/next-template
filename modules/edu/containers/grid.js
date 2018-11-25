import { Row, Col } from 'antd';

const Grid = ({left, children}) => {
  return (
    <Row>
      <Col span={18} push={12}>{left}</Col>
      <Col span={6} pull={12}>{children}</Col>
    </Row>
  )
}

export default Grid
