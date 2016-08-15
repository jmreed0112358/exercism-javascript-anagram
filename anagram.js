var validator = require('validator'),
  NotImplementedException = require('./exceptions/NotImplementedException.js'),
  InvalidParameterException = require('./exceptions/InvalidParameterException.js');

var Anagram = function(word) {
  throw new NotImplementedException();
};

/*
 * Arguments pulled out from the built in arguments object.
 */
Anagram.prototype.matches = function() {
  throw new NotImplementedException();
};

Anagram.prototype.isAnagram = function(testWord) {
  throw new NotImplementedException();
};

Anagram.protoype.sanitize = function() {
  throw new NotImplementedException();
};

module.exports = Anagram;