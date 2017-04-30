export function cableConnect(url) {
  return {
    type: 'CABLE_CONNECT',
    cable: { url }
  };
}

export function cableDisconnect() {
  return {
    type: 'CABLE_DISCONNECT',
    cable: {}
  };
}

export function cableSubscribe(channel, params) {
  return {
    type: 'CABLE_SUBSCRIBE',
    cable: { channel, params }
  };
}

export function cableUnsubscribe(channel, params) {
  return {
    type: 'CABLE_UNSUBSCRIBE',
    cable: { channel, params }
  };
}

export function cableSend(channel, params, payload) {
  return {
    type: 'CABLE_SEND',
    cable: { channel, params },
    payload
  };
}
