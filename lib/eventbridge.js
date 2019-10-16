
const AWS = require('aws-sdk');
const { promisify } = require('util');

const eventbridge = new AWS.EventBridge();
eventbridge.shipIt = promisify(eventbridge.putEvents)

module.exports = {
    sendToEventBridge : async (bridgeName, event) => {
        const {id, type} = event
    
        console.log(`Sending event ${id} of type ${type} to the ${bridgeName} event bus on AWS EventBridge`)
        const params = {
            Entries: [
              {
                Detail: JSON.stringify(event),
                DetailType: 'stripe.event',
                EventBusName: 'default', //bridgeName,
                Resources: [],
                Source: 'Stripe',
                Time: new Date()
              },
            ]
        };

        await eventbridge.shipIt(params);
    }
}