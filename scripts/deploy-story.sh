rm -f skills/story/StoryAdd.zip
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
$DIR/zip-story.sh
aws s3 cp skills/story/StoryAdd.zip s3://southside-lambda --profile cabanski