const properJSONify = require('.');
const expect = require('chai').expect;
const deepFreeze = require('deep-freeze');

describe('a variable', () => {
  const a = 1;
  it('should remain itself', () => {
    expect(properJSONify(a)).to.be.equal(a);
  });
});

describe('an array', () => {
  describe('flat', () => {
    const arr = [1, 2, 3, 'four'];
    deepFreeze(arr);
    const result = properJSONify(arr);

    it('should remain itself if it has no objects', () => {
      expect(result).to.be.deep.equal(arr);
    });

    it('should not be the same array, but a clone', () => {
      expect(result).to.not.be.equal(arr);
    });
  });
  describe('with deep objects that could be properJSONified', () => {
    const arr = [1, 2, 3, 'four', {
      five: 5,
      sixSeven: [6, 7],
      eight_Nine: {
        'ten-eleven': {
          twelve: 12,
          ThirteenFourteen: [13, 14],
        },
      },
    }];
    deepFreeze(arr);
    const result = properJSONify(arr);

    it('should be properJSONified', () => {
      expect(result).to.be.deep.equal([1, 2, 3, 'four', {
        five: 5,
        sixSeven: [6, 7],
        eightNine: {
          tenEleven: {
            twelve: 12,
            thirteenFourteen: [13, 14]
          },
        },
      }]);
    });
  });
});

describe('an object', () => {
  const obj = {
    a: 1,
    b: 2,
    CD: 3,
    eF: 4,
    'g-H': {
      i_j: {
        KL: [5, 6],
        MnO: 7
      },
    },
  };
  deepFreeze(obj);
  const result = properJSONify(obj);

  it('should be properJSONified', () => {
    expect(result).to.deep.equal({
      a: 1,
      b: 2,
      cd: 3,
      eF: 4,
      gH: {
        iJ: {
          kl: [5, 6],
          mnO: 7,
        },
      },
    });
  });
});

describe('alternate key transformations', () => {
  const _ify = key => `_${key}`;

  describe('with arrays', () => {
    const arr = [1, 2, 3, {
      four: 4,
      FIVE: 5,
      SiX: 6,
      seVEN: {
        'EighT-Nine': 89,
      },
    }];
    const result = properJSONify(arr, _ify);

    it('should apply the transformation to all the keys', () => {
      expect(result).to.deep.equal([1, 2, 3, {
        _four: 4,
        _FIVE: 5,
        _SiX: 6,
        _seVEN: {
          '_EighT-Nine': 89,
        },
      }]);
    });
  });

  describe('with objects', () => {
    const obj = {
      key: 1,
      AnotherKey: {
        YetAnother_key: 4,
      },
    };
    const result = properJSONify(obj, _ify);

    it('should apply the transformation to all the keys', () => {
      expect(result).to.deep.equal({
        _key: 1,
        _AnotherKey: {
          _YetAnother_key: 4,
        },
      });
    });
  });
});

describe('key collision', () => {
  const obj = {
    key: 1,
    Key: 2,
    KeY: 3,
  };
  const result = properJSONify(obj);

  it('should prefix with _ when there are collisions', () => {
    expect(result).to.deep.equal({
      _key: 1,
      key: 2,
      keY: 3,
    });
  });
});

describe('key sort', () => {
  it('works recursively in objects', () => {
    const sorted = JSON.stringify({
      a: {
        d: 2,
        e: 1,
      },
      b:2,
      c:1,
    });
    const unSorted = JSON.stringify(properJSONify({
      c:1,
      b:2,
      a: {
        e: 1,
        d: 2,
      },
    }));
    expect(sorted).to.equal(unSorted);
  });

  it('works recursively in arrays', () => {
    const sorted = JSON.stringify([
      1,
      {
        a: {
          d: 2,
          e: 1,
        },
        b:2,
        c:1,
      }
    ]);
    const unSorted = JSON.stringify(properJSONify([
      1,
      {
        c:1,
        b:2,
        a: {
          e: 1,
          d: 2,
        },
      }
    ]));
    expect(sorted).to.equal(unSorted);
  })
});