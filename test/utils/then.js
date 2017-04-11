const then = function (callback, timeout) {
  setTimeout(callback, timeout > 0 ? timeout : 0);
  return {then: then};
};

module.exports = then;