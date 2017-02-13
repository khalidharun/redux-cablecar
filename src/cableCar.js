import ActionCable from 'actioncable';

class CableCar {

  constructor(url, store, channel, options = {}) {
    this.store = store;
    this.url = url;
    this.initialize(channel, options);
  }

  initialize = (channel, options) => {
    this.channel = channel;
    this.options = options;

    const params = Object.assign({ channel }, options);
    this.subscription = ActionCable.createConsumer(this.url).subscriptions.create(params, {
      initialized: this.initialized,
      connected: this.connected,
      disconnected: this.disconnected,
      received: this.received,
      rejected: this.rejected,
    });
  }

  changeChannel = (channel, options = {}) => {
    this.unsubscribe();
    this.initialize(channel, options);
  }

  // Redux dispatch function
  dispatch = (type, payload = {}) => {
    const action = {
      ...this.formatAction(type),
      payload,
      CableCar: false
    };
    this.store.dispatch(action);
  }

  formatAction = msg => ({
    type: `CABLECAR_${msg}`,
    car: this,
    channel: this.channel,
    options: this.options,
  })

  // ActionCable callback functions
  initialized = () => this.dispatch('INITIALIZED')

  connected = () => this.dispatch('CONNECTED')

  disconnected = () => this.dispatch('CABLECAR_DISCONNECTED')

  received = (data) => this.dispatch('RECEIVED', data)

  rejected = () => {
    throw new Error(
      `CableCar: Attempt to connect was rejected.
      (Channel: ${this.channel})`,
    );
  }

  // ActionCable subscription functions (exposed globally)
  perform = (method, payload) => this.subscription.perform(method, payload)

  send = action => this.subscription.send(action)

  unsubscribe = () => {
    this.subscription.unsubscribe();
    this.disconnected();
  }
}


export default CableCar;
