const check = () => {
  if (!('serviceWorker' in navigator)) {
    console.log('No Service Worker support!')
  }
  if (!('PushManager' in window)) {
    console.log('No Push API Support!')
  }
}
const registerServiceWorker = async () => {
  const swRegistration = await navigator.serviceWorker.register('/service-worker.js')
  return swRegistration
}
const requestNotificationPermission = async () => {
  const permission = await window.Notification.requestPermission()
  // value of permission can be 'granted', 'default', 'denied'
  // granted: user has accepted the request
  // default: user has dismissed the notification permission popup by clicking on x
  // denied: user has denied the request.
  if (permission !== 'granted') {
    console.log('Permission not granted for Notification')
  }
  return permission
}
const main = async (reduxStore) => {
  check(reduxStore)
  const swRegistration = await registerServiceWorker()
  const permission = await requestNotificationPermission()
  reduxStore.dispatch({type: 'SET_SERVICE_WORKER', payload: {swRegistration, permission}})
}

export default main