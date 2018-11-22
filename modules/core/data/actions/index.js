import { 
  UPDATE_SOCKET_STATUS,
} from "data/actions/types";

export function updateSocketStatus(status) {
  return { 
    type: UPDATE_SOCKET_STATUS, 
    status, 
  }
}
