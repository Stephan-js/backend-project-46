install: 
	npm install commander
	npm install lodash
install-dev:
	npm install --save-dev jest
gendiff:
	node /src/gendiff.js
test:
	npm test