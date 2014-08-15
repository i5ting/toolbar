/*! Transtool - v1.0.0 - 2014-08-15
* https://github.com/i5ting/toolbar
* Copyright (c) 2014 ; Licensed MIT */
(function($) {

  // Collection method.
  $.fn.transtool = function() {
    return this.each(function(i) {
      // Do something awesome to each selected element.
      $(this).html('awesome' + i);
    });
  };

  // Static method.
  $.transtool = function(options) {
    // Override default options with passed-in options.
    options = $.extend({}, $.transtool.options, options);
    // Return something awesome.
    return 'awesome' + options.punctuation;
  };

  // Static method default options.
  $.transtool.options = {
    punctuation: '.'
  };

  // Custom selector.
  $.expr[':'].transtool = function(elem) {
    // Is this element awesome?
    return $(elem).text().indexOf('awesome') !== -1;
  };

}(jQuery));
