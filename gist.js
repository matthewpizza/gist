(function (factory) {
  'use strict';

  if (typeof define === 'function' && define.amd) {
    define(['jquery'], factory)
  } else if (typeof exports === 'object') {
    module.exports = factory(require('jquery'))
  } else {
    factory(jQuery)
  }
}(function ($) {
  'use strict';

  var Gist = function (element, options) {
    this.options = options
    this.$gist   = $(element)
    this.request()
  }

  Gist.DEFAULTS = {
    timeout: 1000,
    success: onAjaxSuccess,
    error: onAjaxError
  }

  Gist.prototype.request = function () {
    var gist = this
    var id   = this.$gist.data('gist')
    var file = this.$gist.data('file') || false
    var url  = 'https://gist.github.com/' + id + '.json'

    if (file) {
      url += '?file=' + file
    }

    $.ajax({
      url: url,
      dataType: 'jsonp',
      cache: true,
      beforeSend: function ( xhr ) {
        xhr.url   = url
        xhr.$gist = gist.$gist
      },
      timeout: gist.options.timeout,
      success: gist.options.success,
      error: gist.options.error
    })
  }

  function onAjaxSuccess(data, textStatus, jqXHR) {
    if (! data || ! 'div' in data) {
      onAjaxError(jqXHR)
      return
    }

    // Append the stylesheet if it doesn't exists.
    // Trying to minimize requests.
    if (! $('link[href="' + data.stylesheet + '"]').length) {
      $(document.head).append('<link href="' + data.stylesheet + '" rel="stylesheet">')
    }

    // When loading different files from the same gist
    // on one page, there will be duplicate ids.
    //
    // This should fix that.
    var div = data.div.replace(/id="[^"]*"/, '')

    jqXHR.$gist.html(div)
  }

  function onAjaxError(jqXHR) {
    var url = jqXHR.url.replace('.json', '').replace('?file=', '#file-')
    jqXHR.$gist.html('<a href="' + url + '" target="_blank">View gist</a>')
  }

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('gist-initialized')
      var options = $.extend({}, Gist.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (! data) {
        $this.data('gist-initialized', (data = new Gist(this, options)))
      }
    })
  }

  var old = $.fn.gist

  $.fn.gist             = Plugin
  $.fn.gist.Constructor = Gist

  $.fn.gist.noConflict = function () {
    $.fn.gist = old
    return this
  }
}))