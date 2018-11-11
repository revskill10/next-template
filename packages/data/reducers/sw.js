import produce from 'immer'
import { SET_SERVICE_WORKER } from 'data/actions/types'

const swReducer = produce((draft, action) => {
  switch (action.type) {
    case SET_SERVICE_WORKER:
      draft.swRegistration = action.payload.swRegistration
      draft.permission = action.payload.permission
      break
  }
}, {
  swRegistration: null,
  permission: null,
})

export default swReducer;
