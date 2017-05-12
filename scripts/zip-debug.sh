pushd skills/debug/src/debug
rm -f ../../debug.zip
zip -rq ../../debug.zip *.js node_modules/*
popd
