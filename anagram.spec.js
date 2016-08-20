'use strict'

var Anagram = require('./anagram'),
  NotImplementedException = require('./exceptions/NotImplementedException.js'),
  InvalidParameterException = require('./exceptions/InvalidParameterException.js');

const UNPRINTABLE_CHARS = '\u0000\u0001\u0002\u0003\u0004\u0005\u0006\u0007\b\t\n\u000b\f\r\u000e\u000f\u0010\u0011\u0012\u0013\u0014\u0015\u0016\u0017\u0018\u0019\u001a\u001b\u001c\u001d\u001e\u001f';

xdescribe('matches()', function() {

  it('no matches',function() {
    var subject = new Anagram('diaper');
    var matches = subject.matches([ 'hello', 'world', 'zombies', 'pants']);

    expect(matches).toEqual([]);
  });

  xit('detects simple anagram',function() {
    var subject = new Anagram('ant');
    var matches = subject.matches(['tan', 'stand', 'at']);

    expect(matches).toEqual(['tan']);
  });

  xit('does not detect false positives',function() {
    var subject = new Anagram('galea');
    var matches = subject.matches(['eagle']);

    expect(matches).toEqual([]);
  });

  xit('detects multiple anagrams',function() {
    var subject = new Anagram('master');
    var matches = subject.matches(['stream', 'pigeon', 'maters']);

    expect(matches).toEqual(['stream', 'maters']);
  });

  xit('does not detect anagram subsets',function() {
    var subject = new Anagram('good');
    var matches = subject.matches(['dog', 'goody']);

    expect(matches).toEqual([]);
  });

  xit('detects anagram',function() {
    var subject = new Anagram('listen');
    var matches = subject.matches(['enlists', 'google', 'inlets', 'banana']);

    expect(matches).toEqual(['inlets']);
  });

  xit('detects multiple anagrams',function() {
    var subject = new Anagram('allergy');
    var matches = subject.matches(['gallery', 'ballerina', 'regally', 'clergy', 'largely', 'leading']);

    expect(matches).toEqual(['gallery', 'regally', 'largely']);
  });

  xit('detects anagrams case-insensitively',function() {
    var subject = new Anagram('Orchestra');
    var matches = subject.matches(['cashregister', 'Carthorse', 'radishes']);

    expect(matches).toEqual(['Carthorse']);
  });

  xit('does not detect a word as its own anagram',function() {
    var subject = new Anagram('banana');
    var matches = subject.matches(['Banana']);

    expect(matches).toEqual([]);
  });

  xit('matches() accepts string arguments',function() {
    var subject = new Anagram('ant');
    var matches = subject.matches('stand', 'tan', 'at');

    expect(matches).toEqual(['tan']);
  });

  xit('matches() accepts single string argument',function() {
    var subject = new Anagram('ant');
    var matches = subject.matches('tan');

    expect(matches).toEqual(['tan']);
  });
});

describe('isAnagram()', function() {
  it('returns false when given words of inequal length', function() {
    var subject = new Anagram('ant');
    var actual = subject.isAnagram('herp');
    expect(actual).toEqual(false);
  });

  it('returns true when the given testWord is an anagram of word', function() {
    var subject = new Anagram('ant');
    var actual = subject.isAnagram('tan');
    expect(actual).toEqual(true);
  });

  it('returns false when the given testWord is not an anagram of word', function() {
    var subject = new Anagram('ant');
    var actual = subject.isAnagram('han');
    expect(actual).toEqual(false);
  });
});

xdescribe('sanitize()', function() {
  it('throws InvalidParameterException when given invalid input', function() {
    expect(function() {
      var anagram = Anagram('');
      anagram.sanitize({});
    }).toThrow(
      new InvalidParameterException('rawWord is not a string'));
  });

  it('removes garbage characters from the input string', function() {
    var anagram = new Anagram('');
    var input = UNPRINTABLE_CHARS + 'FOO BAR4444&*($&(*&$';
    var actual = anagram.sanitize(input);
    expect(actual).toEqual('foo bar');
  });
});
