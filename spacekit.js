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
    var args = _.initial(_.toArray(arguments));
    return args.length && _.find(args, function (arg) {
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
    var args = _.initial(_.toArray(arguments));
    return args.length && _.find(args, function (arg) {
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
    var args = _.initial(_.toArray(arguments));
    return args.length && _.find(args, function (arg) {
      return !!arg;
    }) === undefined;
  },

  $exists: function (a) {
    return typeof a !== 'undefined';
  },

  // add session object with current Session getters as keys 
  $Session: function () {
    return _.object(_.map(Session.keys, function (value, key) {
      return [key, Session.get(key)];
    }));
  },

  $Meteor: function () {
    return Meteor;
  }

};

/**
 * Exposes global variables or improved each helper. 
 * 
 * @description Will likely be rewritten when
 *              https://github.com/meteor/meteor/pull/3560 is implemented.
 */
helpers.$ = function (iterable) {
  var last;

 // do not proceed non-arrays and non-cursors
 if (typeof iterable !== 'object')
    return [];

  // fetch if cursor
  // TODO: better checking for cursor
  if (typeof iterable.fetch === 'function')
    iterable = iterable.fetch();

  last = _.size(iterable) - 1;

  return _.map(iterable, function (item, key) {
    var type = typeof item;
    // HACK: convert to extendable objects
    if (type === 'string') {
      item = new String(item);
    } else if (type === 'number') {
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

_.extend(Blaze._globalHelpers, helpers);
