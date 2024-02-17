install: 
	npm install commander
	npm install lodash
	npm install js-yaml
	npm install ini
install-dev:
	npm install --save-dev jest
munual-test:
	node ./src/gendiff-cmd.js .\files\json\fileh1.json .\files\json\fileh2.json
test:
	npm test