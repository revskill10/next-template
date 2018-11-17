import css from 'styled-jsx/css'
export const TIMEOUT = 400

export default css`
.page-transition-enter {
  opacity: 0;
  transform: translate3d(0, 20px, 0);
}
.page-transition-enter-active {
  opacity: 1;
  transform: translate3d(0, 0, 0);
  transition: opacity ${TIMEOUT}ms, transform ${TIMEOUT}ms;
}
.page-transition-exit {
  opacity: 1;
}
.page-transition-exit-active {
  opacity: 0;
  transition: opacity ${TIMEOUT}ms;
}
.loading-indicator-appear,
.loading-indicator-enter {
  opacity: 0;
}
.loading-indicator-appear-active,
.loading-indicator-enter-active {
  opacity: 1;
  transition: opacity ${TIMEOUT}ms;
}
`