const _ = require('lodash');

const MatchCustomizerEnums = {
  ALLOW_ANY: 'ALLOW_ANY',
};

const __isNullOrUndefined = (value) => _.isUndefined(value) || _.isNull(value);

// PRE DEFINED CUSTOM EQUAL FUNCTIONS

const __isEqualWithAllowAny = (value1, value2) => {
  return (
    !__isNullOrUndefined(value1) &&
    !__isNullOrUndefined(value2) &&
    (value1 === '*' || value2 === '*')
  );
};

// END PRE DEFINED CUSTOM EQUAL FUNCTIONS

const __isEqualWithCustomizer = ({ value1, value2, customizer }) => {
  // open to extend features
  if (_.isFunction(customizer)) {
    return customizer(value1, value2);
  }

  if (customizer === MatchCustomizerEnums.ALLOW_ANY) {
    return __isEqualWithAllowAny(value1, value2);
  }

  return false;
};

const __isEqual = ({ value1, value2, customizer }) => {
  if (__isEqualWithCustomizer({ value1, value2, customizer })) {
    return true;
  }

  if (_.isNumber(value1) || _.isNumber(value2)) {
    return _.isNumber(value1)
      ? value1 === _.toNumber(value2)
      : value2 === _.toNumber(value1);
  }

  if (_.isString(value1) || _.isString(value2)) {
    return _isString(value1)
      ? value1.toUpperCase().trim() === _.toString(value2).toUpperCase().trim()
      : value2.toUpperCase().trim() === _.toString(value1).toUpperCase().trim();
  }

  if (__isNullOrUndefined(value1) || __isNullOrUndefined(value2)) {
    return __isNullOrUndefined(value1) ? !value2 : !value1;
  }

  return value1 === value2;
};

const partialMatch = (object1, object2, customizer) => {
  const obj2Keys = _.keys(object2);
  const obj1Pick = _.pick(object1, obj2Keys);

  return obj2Keys.every((key) =>
    __isEqual({
      value1: _.get(obj1Pick, key),
      value2: _.get(object2, key),
      customizer,
    })
  );
};

module.exports = partialMatch;
