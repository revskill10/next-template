import produce from 'immer'
import { UPDATE_SOCKET_STATUS } from 'data/actions/types'

const websocketReducer = produce((draft, action) => {
  switch (action.type) {
    case UPDATE_SOCKET_STATUS:
      draft.status = action.status
      break
  }
}, {
  status: "Disconnected",
})

export default websocketReducer;
