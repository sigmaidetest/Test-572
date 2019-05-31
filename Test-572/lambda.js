let google = require('googleapis').google;
let _auth = require('./Authorizer');
const pubsub = google.pubsub('v1');
let AWS = require('aws-sdk');
let SL_AWS = require('slappforge-sdk-aws');
const sqs = new SL_AWS.SQS(AWS);

exports.handler = function (event, context, callback) {
    sqs.receiveMessage({
        QueueUrl: `https://sqs.${process.env.AWS_REGION}.amazonaws.com/${process.env.SIGMA_AWS_ACC_ID}/KTestSQS`,
        AttributeNames: ['All'],
        MaxNumberOfMessages: '1',
        VisibilityTimeout: '30',
        WaitTimeSeconds: '0'
    }).promise()
        .then(receivedMsgData => {
            if (!!(receivedMsgData) && !!(receivedMsgData.Messages)) {
                let receivedMessages = receivedMsgData.Messages;
                receivedMessages.forEach(message => {
                    // your logic to access each message through out the loop. Each message is available under variable message 
                    // within this block
                });
            } else {
                // No messages to process
            }
        })
        .catch(err => {
            // error handling goes here
        });

    pubsub.projects.topics.subscriptions.list({
        topic: `projects/${process.env.GCP_PROJECT}/topics/MyFirstTopic`,
        pageSize: 10
    })
        .then(response => {
            console.log(response.data);  // successful response
            /*
            response.data = {
                "subscriptions": [
                    "projects/<project>/subscriptions/<subscription-1>",
                    "projects/<project>/subscriptions/<subscription-2>",
                    ...
                ]
            }
            */
        })
        .catch(err => {
            console.log(err, err.stack); // an error occurred
        });



}