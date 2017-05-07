var Alexa = require('alexa-sdk');

//speech constants
const ASK_FOR_STORY = 'What is the story?';

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
      console.log('Tell story');
      this.emit(':tell', 'My story is ' + story);
    }
  }
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