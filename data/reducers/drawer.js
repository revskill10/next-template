import produce from 'immer'
import { OPEN_DRAWER, CLOSE_DRAWER } from "data/actions/types";

const drawerReducer = produce((draft, action) => {
  switch (action.type) {
    case OPEN_DRAWER:
      draft.open = true
      break
    case CLOSE_DRAWER:
      draft.open = false
      break
  }
}, {
  open: false
})

export default drawerReducer;
