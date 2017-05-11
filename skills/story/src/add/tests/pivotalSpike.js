var Pivotal = require('../pivotal');
var should = require('should');

var assert = require('assert');
describe('Pivotal', function () {
  it('should show projects', function (done) {
    var pivotal = new Pivotal();
    pivotal.getProjects().then(function(projects) {
      assert(projects);
      projects.forEach(function(project) {
        console.log(project.name);
      });
      done();
    }).catch(function(err) {
      done(err);
    });
  });
  it('should add story', function (done) {
    var pivotal = new Pivotal();
    var storyText = 'Demo story ' + new Date();
    pivotal.addStory(storyText).then(function(story) {
      story.name.should.be.equal(storyText);
      done();
    }).catch(function(err) {
      done(err);
    });
  });
});