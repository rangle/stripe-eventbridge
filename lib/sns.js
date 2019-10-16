
const AWS = require('aws-sdk');

module.exports.notifyFailure = async (message) => {
    try {
        console.log("Error while handling webhook", message);
        if (process.env.FAILURE_SNS) {
            console.log(`Sending failure notification to SNS topic ${process.env.FAILURE_SNS}`)
            await (new AWS.SNS({apiVersion: '2010-03-31'}).publish({
                Message: message,
                TopicArn: process.env.FAILURE_SNS,
            }).promise())
            } else {
            console.log(`Skipped sending failure notification, no SNS topic is configured`)
        }
    } catch (e) {
        console.error("Error while notifying via SNS", e.message)
    }
}