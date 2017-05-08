var tracker = require('pivotaltracker');
var Promise = require('promise');

function Pivotal() {
  var self = this;
  var pivotalToken = process.env.PIVOTAL_TOKEN;
  if (!pivotalToken) {
    throw 'PIVOTAL_TOKEN is not configured in environment';
  }
  this.client = new tracker.Client(pivotalToken);
  this.projectId = process.env.PIVOTAL_PROJECT_ID;
  if (!this.projectId) {
    throw 'PIVOTAL_PROJECT_ID is not configured in environment'
  }

  this.addStory = function(storyText) {
    return new Promise(function (resolve, reject) {
      self.client.project(self.projectId).stories.create({name: storyText, labels: ['alexa']}, function(error, story){
        if (error) {
          console.log('Failed to create story.  Error is ' + error);
          reject(error);
        } else {
          console.log('created story ' + JSON.stringify(story, null, 2));
          resolve(story);
        }
      });
    });
  }

  this.getProjects = function() {
    return new Promise(function(resolve, reject) {
      self.client.projects.all(function (error, projects) {
        if (error) {
          console.log(error);
          reject(error);
        } else {
          console.log(projects[0].id);
          resolve(projects);
        }
      });
    });
  };
}

module.exports = Pivotal;