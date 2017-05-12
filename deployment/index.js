console.log('Loading function');
var AWS = require('aws-sdk');
var lambda = new AWS.Lambda();
var s3 = new AWS.S3();
exports.handler = function (event, context) {
  key = event.Records[0].s3.object.key
  bucket = event.Records[0].s3.bucket.name
  var functionName = key.slice(0, -4);
  console.log("upload to lambda function: " + functionName + ' from S3 bucket ' + bucket + ' file ' + key);
  var params = {
    FunctionName: functionName,
    S3Key: key,
    S3Bucket: bucket
  };
  lambda.updateFunctionCode(params).promise().then(function(data) {
    console.log('uploaded ' + JSON.stringify(data, null, 2));
    s3.deleteObject({ Bucket: bucket, Key: key }).promise().then(function(data) {
      console.log('deleted zip ' + JSON.stringify(data, null, 2));
      context.succeed(data);
    }).catch(function(err) {
      console.log(err, err.stack);
      context.fail(err);
    });
  }).catch(function(err){
    console.log(err, err.stack);
    context.fail(err);
  });
};