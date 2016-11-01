# properJSONify

Turns this:

```javascript
{
  WordsAndWords: 1,
  nested_object: {
    'weird.key': 2,
  },
}
```

into

```javascript
{
  wordsAndWords: 1,
  nestedObject: {
    weirdKey: 2,
  },
}
```
