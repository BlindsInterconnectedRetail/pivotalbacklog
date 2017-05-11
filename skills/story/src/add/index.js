var Alexa = require('alexa-sdk');
var Pivotal = require('./pivotal');

var pivotal = new Pivotal();

//speech constants
const ASK_FOR_STORY = 'What is the story?';
const STORY_ADDED = 'I added the story to the top of the icebox with label Alexa';
const UNEXPECTED_ERROR = 'Something has gone wrong because my programmer does not know what he is doing';
const HELP = 'Say list to list backlogs.  Say add followed by your story to add to top of backlog.';
const BACKLOG_LIST_START = 'The following backlogs are available';

exports.handler = function (event, context, callback) {
  console.log(JSON.stringify(event, null, 2));
  var alexa = Alexa.handler(event, context);

  alexa.registerHandlers(handlers);
  alexa.execute();
};

var handlers = {
  'LaunchRequest': function () {
    console.log('launched backlog');
    this.emit('Add');
  },

  'Add': function () {
    var self = this;
    console.log('in add');
    var intentObj = this.event.request.intent;
    var story;
    if (!intentObj || !intentObj.slots || !intentObj.slots.Story) {
      console.log("Story is not in the slots");
    } else {
      story = intentObj.slots.Story.value;
    }
    story = normalizeStory.call(this, story);
    
    if (!story) {
      console.log('no story so ask for it');
      this.emit(':ask', ASK_FOR_STORY, ASK_FOR_STORY);
    } else {
      console.log('Add story to backlog');
      pivotal.addStory(story).then(function (storyResult) {
        self.emit(':tell', STORY_ADDED);
      }).catch(function (err) {
        self.emit(':tell', UNEXPECTED_ERROR);
      });
    }
  },
};

function normalizeStory(story) {
  console.log('raw story: ' + story);
  if (!story) {
    story = '';
  }
  if (story.length > 0) {
    //if the first word is add, chop it off
    if (story.toUpperCase().startsWith('ADD ')) {
      story = story.substr(story.indexOf(" ") + 1).trim();
    }
    if (story.toUpperCase() === 'ADD') {
      story = '';
    }
  }
  console.log('normalized story: ' + story);
  return story;
}