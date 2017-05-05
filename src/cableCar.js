import ActionCable from './actioncable';

class CableCar {

  constructor(url, store) {
    this.store = store;
    this.consumer = ActionCable.createConsumer(url);
    this.store.dispatch({ type: 'CABLE_CONNECTED', cable: { car: this } });
  }

  dispatch(type, cable, payload = {}) {
    const action = {
      type: `CABLE_${type}`,
      cable,
      payload,
    };
    this.store.dispatch(action);
  }

  subscribe(channel, params) {
    const options = { channel , ...params};
    const prefix = channel.toUpperCase();
    this.subscription = this.consumer.subscriptions.create(options, {
      initialized:  () => this.dispatch(`${prefix}_INITIALIZED`, options),
      connected:    () => this.dispatch(`${prefix}_CONNECTED`, options),
      disconnected: () => this.dispatch(`${prefix}_DISCONNECTED`, options),
      received: (data) => this.dispatch(`${prefix}_RECEIVED`, options, data),
      rejected:     () => {
        this.dispatch(`${prefix}_REJECTED`, options);
        throw new Error(`ActionCable: Attempt to subscribe was rejected. (${JSON.stringify(options)})`);
      }
    });
  }

  send(channel, params, payload) {
    const options = { channel, ...params };
    const identifier = JSON.stringify(options);
    const subscriptions = this.consumer.subscriptions.findAll(identifier);
    subscriptions.map(item => item.send(payload));
  }

  unsubscribe(channel, params) {
    const options = { channel, ...params };
    const identifier = JSON.stringify(options);
    const subscriptions = this.consumer.subscriptions.findAll(identifier);
    subscriptions.map( x => x.unsubscribe());
  }

  disconnect() {
    this.consumer.disconnect();
    this.store.dispatch({ type: 'CABLE_DISCONNECTED' });
  }
}

export default CableCar;
