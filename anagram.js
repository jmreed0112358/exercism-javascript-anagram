'use strict'

var validator = require('validator'),
  NotImplementedException = require('./exceptions/NotImplementedException.js'),
  InvalidParameterException = require('./exceptions/InvalidParameterException.js'),
  InvalidStateException = require('./exceptions/InvalidStateException.js');

const ALPHABET = 'abcdefghijklmnopqrstuvwxyz ';

var Anagram = function(word) {
  this.refWord = this.sanitize(word);
};

/*
 * Arguments pulled out from the built in arguments object.
 */
Anagram.prototype.matches = function() {
  var testWords = [],
    anagrams = [],
    i = 0,
    j = 0;

  for (i = 0 ; i < arguments.length ; i++) {
    if (typeof arguments[i] === 'string') {
      testWords.push(arguments[i]);
    } else if (Array.isArray(arguments[i])) {
      for (j = 0 ; j < arguments[i].length ; j++ ) {
        testWords.push(arguments[i][j]);
      }
    }
  }

  for (i = 0 ; i < testWords.length ; i++ ) {
    if (this.isAnagram(testWords[i])) {
      anagrams.push(testWords[i]);
    }
  }

  return anagrams;
};

Anagram.prototype.isAnagram = function(testWord) {
  var refDict = {},
    i = 0;

  testWord = this.sanitize(testWord);

  if (testWord.length !== this.refWord.length) {
    return false;
  }

  if (testWord === this.refWord) {
    return false;
  }

  // Build reference dictionary.
  for (i = 0 ; i < this.refWord.length ; i++ ) {
    if (refDict[this.refWord[i]] === undefined) {
      refDict[this.refWord[i]] = 1;
    } else {
      refDict[this.refWord[i]] = refDict[this.refWord[i]] + 1;
    }
  }

  // Check testWord against refDict.
  for (i = 0 ; i < testWord.length ; i++ ) {
    var letter = testWord[i];
    if (refDict[letter] === undefined) {
      return false;
    } else if (refDict[letter] === 1) {
      delete refDict[letter];
    } else if (refDict[letter] > 1 ) {
      refDict[letter] -= 1;
    } else {
      // Huh?
      throw new InvalidStateException('Encountered some sort of invalid state');
    }
  }

  // Final test.
  return Object.keys(refDict).length === 0;
};

Anagram.prototype.sanitize = function(rawWord) {
  var i = 0,
    result = '';

  if (typeof rawWord !== 'string') {
    throw new InvalidParameterException('rawWord is not a string');
  }

  rawWord = validator.trim(rawWord).toLowerCase();

  for (i = 0 ; i < rawWord.length ; i++ ) {
    if (validator.isWhitelisted(rawWord[i], ALPHABET)) {
      result = result + rawWord[i];
    }
  }

  return result;
};

module.exports = Anagram;