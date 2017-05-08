var tracker = require('pivotaltracker');
var Promise = require('promise');

function Pivotal() {
  var self = this;
  var pivotalToken = process.env.PIVOTAL_TOKEN;
  if (!pivotalToken) {
    throw "PIVOTAL_TOKEN is not configured in environment";
  }
  this.client = new tracker.Client(pivotalToken);

  this.getProjects = function() {
    return new Promise(function(resolve, reject) {
      self.client.projects.all(function (error, projects) {
        if (error) {
          console.log(error);
          reject(error);
        } else {
          resolve(projects);
        }
      });
    });
  };
}

module.exports = Pivotal;