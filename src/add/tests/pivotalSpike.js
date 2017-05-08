var Pivotal = require('../pivotal');

var assert = require('assert');
describe('Pivotal', function () {
  it('should show projects', function (done) {
    var pivotal = new Pivotal();
    pivotal.getProjects().then(function(projects) {
      assert(projects);
      done();
    }).catch(function(err) {
      done(err);
    });
  });
});