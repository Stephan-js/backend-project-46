install: 
	npm install commander
	npm install lodash
	npm install js-yaml
	npm install ini
install-dev:
	npm install --save-dev jest
gendiff:
	node /src/gendiff.js
test:
	npm test