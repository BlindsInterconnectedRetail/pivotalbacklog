pushd src/add
rm -f ../add.zip
zip -rq ../add.zip *.js node_modules/*
popd