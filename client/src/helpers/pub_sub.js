// Custom PubSub
// this is a chatty version and dumps loads of info
// out to the console.

const PubSub = {

  // send a payload out on channel

  publish : function(channel, payload){
    const event = new CustomEvent(channel, { detail: payload } );
    console.log(`Published on "${channel}" : ${ JSON.stringify(payload) }`);
    document.dispatchEvent(event);
  },

  // register interest in an event, with the code to run
  // when this event is emitted

  subscribe: function(channel, callback){
    console.log(`New subscription added on "${channel}"`);
    document.addEventListener(channel, callback);
  },

  // optional. call this on the first line of your
  // subscribe callback like so...
  // PubSub.signForDelivery(this, event)
  // that way you get notified of event acceptance

  signForDelivery: function(object, event) {
    console.log(`${object.__proto__.constructor.name} received ${JSON.stringify(event.detail)} from channel  "${event.type}"`);
  }
};

module.exports = PubSub;
