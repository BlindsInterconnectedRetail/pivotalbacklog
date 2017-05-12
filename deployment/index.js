console.log('Loading function');
var AWS = require('aws-sdk');
var lambda = new AWS.Lambda();
exports.handler = function (event, context) {
  key = event.Records[0].s3.object.key
  bucket = event.Records[0].s3.bucket.name
  var functionName = key.slice(0, -4);
  console.log("uploaded to lambda function: " + functionName + ' from S3 bucket ' + bucket + ' file ' + key);
  var params = {
    FunctionName: functionName,
    S3Key: key,
    S3Bucket: bucket
  };
  lambda.updateFunctionCode(params, function (err, data) {
    if (err) {
      console.log(err, err.stack);
      context.fail(err);
    } else {
      console.log(data);
      context.succeed(data);
    }
  });
};