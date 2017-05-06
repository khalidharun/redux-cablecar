export function connect(ActionCable, url) {
  return {
    type: 'CABLE_CONNECT',
    cable: { ActionCable, url }
  };
}

export function disconnect() {
  return {
    type: 'CABLE_DISCONNECT',
    cable: {}
  };
}

export function subscribe(channel, params) {
  return {
    type: 'CABLE_SUBSCRIBE',
    cable: { channel, params }
  };
}

export function unsubscribe(channel, params) {
  return {
    type: 'CABLE_UNSUBSCRIBE',
    cable: { channel, params }
  };
}

export function send(channel, params, payload) {
  return {
    type: 'CABLE_SEND',
    cable: { channel, params },
    payload
  };
}
