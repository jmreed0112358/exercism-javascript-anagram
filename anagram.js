var validator = require('validator'),
  NotImplementedException = require('./exceptions/NotImplementedException.js'),
  InvalidParameterException = require('./exceptions/InvalidParameterException.js');

const ALPHABET = 'abcdefghijklmnopqrstuvwxyz ';

var Anagram = function(word) {
  this.word = word;
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

Anagram.prototype.sanitize = function(rawWord) {
  var i = 0,
    result = '';

  rawWord = validator.trim(rawWord).toLowerCase();

  for (i = 0 ; i < rawWord.length ; i++ ) {
    if (validator.isWhitelisted(rawWord[i], ALPHABET)) {
      result = result + rawWord[i];
    }
  }

  return result;
};

module.exports = Anagram;