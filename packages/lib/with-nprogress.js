import { Component } from "react";
import NProgress from "components/nprogress";

export default (delayMs, options) => Page =>
  class extends Component {
    static getInitialProps = Page.getInitialProps;
    render() {
      return (
        <>
          <Page {...this.props} />
          <NProgress delayMs={delayMs} options={options} />
        </>
      );
    }
  };
