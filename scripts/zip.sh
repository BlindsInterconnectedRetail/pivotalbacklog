pushd skills/story/src/add
rm -f ../../add.zip
zip -rq ../../add.zip *.js node_modules/*
popd
pushd skills/debug/src/debug
rm -f ../../debug.zip
zip -rq ../../debug.zip *.js node_modules/*
popd