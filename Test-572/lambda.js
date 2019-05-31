let AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();

exports.handler = function (event, context, callback) {
    debugger;

    for (let i = 0; i < 10; i++) {
        console.log(i);
        ddb.get({
            TableName: 'BTMenu',
            Key: { 'itemCode': '123' }
        }).promise()
            .then((data) => {
                console.log(data);
                callback(null, data);
            })
            .catch((err) => {
                console.log(err);
                callback(err);
            });
    }
    
}