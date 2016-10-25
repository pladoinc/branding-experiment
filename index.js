~ function (words) {
  'use strict';

  var css = ''
  var banner = document.getElementsByClassName('banner-thumbnail-wrapper')[0]

  banner.getElementsByClassName('desc-wrapper')[0].style.padding = '0'

  var strong = p.getElementsByTagName('strong')[0]
  var strongPre = strong.outerHTML.replace(strong.innerHTML, '').replace('</strong>', '')
  var strongPost = '</strong>'

  var p = banner.getElementsByTagName('p')[0]
  p.innerHTML = '<span class="outer">' +
                  '<span>PLADO is about </span>' +
                  strongPre + 'you.' + strongPost +
                '</span>'

  var span = p.getElementsByTagName('span')[0]
  var start = p.getElementsByTagName('span')[1]
  strong = p.getElementsByTagName('strong')[0]

  var styles = document.createElement('style')
  styles.setAttribute('type', 'text/css')
  styles.innerHTML = '.banner-thumbnail-wrapper p:last-child {' +
           'padding-top: ' + (parseFloat(window.getComputedStyle(banner.getElementsByTagName('p')[1])['margin-top'].match(/[0-9\.]+/g)[0]) + span.offsetHeight) + 'px;' +
         '}' +
         '.banner-thumbnail-wrapper p > .outer {' +
           'position: absolute;' +
           'top: 0px;' +
           'left: ' + (start.offsetLeft) + 'px' +
         '}' +
         '.banner-thumbnail-wrapper p > span > strong {' +
           'position: absolute;' + 
           'top: 0px;' +
           'left: ' + (start.offsetWidth) + 'px;' +
           'opacity: 1;' +
         '}' +
         '.banner-thumbnail-wrapper p > span > strong.past {' +
           'top: -' + (strong.offsetHeight*0.5) + 'px;' +
         '}' +
         '.banner-thumbnail-wrapper p > span > strong.future {' +
           'top: ' + (strong.offsetHeight*0.5) + 'px;' +
         '}' +
         '.banner-thumbnail-wrapper p > span > strong.past,' +
         '.banner-thumbnail-wrapper p > span > strong.future {' +
           'opacity: 0;' +
         '}' +
         '.banner-thumbnail-wrapper p > span > strong,' +
         '.banner-thumbnail-wrapper p > span > strong.past,' +
         '.banner-thumbnail-wrapper p > span > strong.future {' +
           '-webkit-transition: .7s opacity ease, .7s top ease;' +
           '-moz-transition: .7s opacity ease, .7s top ease;' +
           '-ms-transition: .7s opacity ease, .7s top ease;' +
           '-o-transition: .7s opacity ease, .7s top ease;' +
           'transition: .7s opacity ease, .7s top ease;' +
         '}'
  document.body.appendChild(styles)

  // ...
}({
    index: -1,
    list: [
        'passionate people',
        'open education',
        'self-paced learning',
        'uncovering your potential',
        'discovering your passion',
        'building your future',
        'broadening your horizons'
    ],
    nextIndex: function(i) {
        i++
        if (i >= words.list.length) i = 0
        return i
    },
    next: function() {
        return words.list[words.index = words.nextIndex(words.index)]
    },
    peek: function() {
        return words.list[words.nextIndex(words.index)]
    }
})