pushd src/add
rm -f ../add.zip
zip -rq ../add.zip index.js node_modules/*
popd