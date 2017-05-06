import CableCar from './cableCar';

let car;

const middleware = store => next => (action) => {

  switch (action.type) {
    case 'CABLE_CONNECT':
      const { ActionCable, url } = action.cable;
      new CableCar(ActionCable, url, store);
      break;
    case 'CABLE_SUBSCRIBE':
      car.subscribe(action.cable.channel, action.cable.params);
      break;
    case 'CABLE_UNSUBSCRIBE':
      car.unsubscribe(action.cable.channel, action.cable.params);
      break;
    case 'CABLE_DISCONNECT':
      car.disconnect();
      car = null;
      break;
    case 'CABLE_SEND':
      car.send(action.cable.channel, action.cable.params, action.payload);
    default:
      break;
  }

  const newState = next(action);

  switch (action.type) {
    case 'CABLE_CONNECTED':
      car = action.cable.car;
      break;
    default:
      break;
  }

  return newState;
};

middleware.connect = (url, store) => new CableCar(url, store);

export default middleware;
