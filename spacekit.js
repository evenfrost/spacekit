/**
 * Defines helpers in MongoDB style.
 */
var helpers = {

  $eq: function (a, b) {
    return a === b;
  },

  $ne: function (a, b) {
    return a !== b;
  },

  $gt: function (a, b) {
    return a > b;
  },

  $gte: function (a, b) {
    return a >= b;
  },

  $lt: function (a, b) {
    return a < b;
  },

  $lte: function (a, b) {
    return a <= b;
  },

  $in: function (a, b) {
    return _.contains(a, b);
  },

  $nin: function (a, b) {
    return !_.contains(a, b);
  },

  /**
   * Checks if each provided argument has truthy value.
   *
   * @param  {...*}    Any number of arguments of any type.
   * @return {Boolean} True if all arguments have truthy value.
   */
  $and: function () {
    var args = _.toArray(arguments).slice(0, -1);
    return _.find(args, function (arg) {
      return !arg;
    }) === undefined;
  },

  /**
   * Checks if any of provided arguments has truthy value.
   *
   * @param  {...*}    Any number of arguments of any type.
   * @return {Boolean} True if at least one argument has truthy value.
   */
  $or: function () {
    var args = _.toArray(arguments).slice(0, -1);
    return _.find(args, function (arg) {
      return !!arg;
    }) !== undefined;
  },

  /**
   * Checks if each provided argument has falsey value.
   *
   * @param  {...*}    Any number of arguments of any type.
   * @return {Boolean} True if all arguments have falsey value.
   */
  $nor: function () {
    var args = _.toArray(arguments).slice(0, -1);
    return _.find(args, function (arg) {
      return !!arg;
    }) === undefined;
  },

  $exists: function (a) {
    return typeof a !== 'undefined';
  }

};

/**
 * Exposes global variables or improved each helper. 
 * 
 * @description Will likely be rewritten when
 *              https://github.com/meteor/meteor/pull/3560 is implemented.
 */
helpers.$ = function () {
  var arg = arguments[0],
      type = typeof arg,
      each;

  if (type === 'undefined') {
    // expose global variables as additional helpers
    return {
      Session: Session,
      Meteor: Meteor
    };
  } else if (type !== 'object') {
    // do not proceed non-arrays and non-cursors
    return [];
  }

  // fetch if cursor
  // TODO: better checking for cursor
  if (typeof arg.fetch === 'function')
    arg = arg.fetch();

  each = function (iterable) {
    var last;

    last = _.size(iterable) - 1;

    return _.map(iterable, function (item, key) {
      var itemType = typeof item;
      // HACK: convert to extendable objects
      if (itemType === 'string') {
        item = new String(item);
      } else if (itemType === 'number') {
        item = new Number(item);
      }

      item.$index = key;

      if (key === 0)
        item.$first = true;
      if (key === last)
        item.$last = true;

      return item;
    });
  };

  return each(arg);
};

_.extend(Blaze._globalHelpers, helpers);
