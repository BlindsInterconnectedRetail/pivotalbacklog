pushd skills/story/src/add
rm -f ../../BacklogAdd.zip
zip -rq ../../BacklogAdd.zip *.js node_modules/*
popd
pushd skills/debug/src/debug
rm -f ../../debug.zip
zip -rq ../../debug.zip *.js node_modules/*
popd