import { 
  OPEN_DRAWER, 
  CLOSE_DRAWER,
  UPDATE_SOCKET_STATUS,
} from "data/actions/types";

export function openDrawer() {
  return {
    type: OPEN_DRAWER,
  };
}
export function closeDrawer() {
  return {
    type: CLOSE_DRAWER,
  };
}

export function updateSocketStatus(status) {
  return { 
    type: UPDATE_SOCKET_STATUS, 
    status, 
  }
}
  