~ function () {
  'use strict';

  // prerequisite check
  if (
      // verify that getComputedStyle is available
      !window.getComputedStyle ||

      // verify CSS3 transitions are available
      ![
        '-webkit-transition',
        '-moz-transition',
        '-ms-transition',
        '-o-transition',
        'transition'
      ].reduce(function (style) {
        return function (bool, vendor) {
          return bool || vendor in style
        }
      }(getComputedStyle(document.body)), false)) {
    return;
  }

  // actual implementation

  var css = ''
  var banner = document.getElementsByClassName('banner-thumbnail-wrapper')[0]
  var p = banner.getElementsByTagName('p')[0]

  banner.getElementsByClassName('desc-wrapper')[0].style.padding = '0'

  var words = {
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
  }

  let max = [-Infinity,-1]
  for (let i = 0; i < words.list.length; i += 1) {
      if (words.list[i].length > max[0]) {
          max = [words.list[i].length,i]
      }
  }

  words.list = [ words.list[max[1]] ].concat(words.list.filter(function (_, i) {
      return i !== max[1]
  }))

  var strong = p.getElementsByTagName('strong')[0]
  var strongPre = strong.outerHTML.replace(strong.innerHTML, '').replace('</strong>', '')
  var strongPost = '</strong>'

  var tmp = document.createElement('div')
  tmp.innerHTML = strong.outerHTML
  tmp = tmp.getElementsByTagName('strong')[0]
  tmp.classList.add('future')

  p.innerHTML = '<span class="outer">' +
                  '<span>PLADO is about </span>' +
                  strongPre + words.list[0] + '.' + strongPost +
                  tmp.outerHTML +
                '</span>'

  var span = p.getElementsByTagName('span')[0]
  var start = p.getElementsByTagName('span')[1]
  var current = p.getElementsByTagName('strong')[0]
  var next = p.getElementsByTagName('strong')[1]

  var styles = document.createElement('style')
  styles.setAttribute('type', 'text/css')
  document.body.appendChild(styles)

  // verify that there is enough space for this animation
  if ((span.offsetWidth + start.offsetWidth) >= document.body.offsetWidth) {
    styles.innerHTML = '' +
      '.banner-thumbnail-wrapper p,' +
      '.banner-thumbnail-wrapper p > span,' +
      '.banner-thumbnail-wrapper p > span > strong {' +
        'white-space: pre-line;' +
      '}' +
      '.banner-thumbnail-wrapper strong.future {' +
        'display: none;' +
      '}';

    current.innerText = words.list[Math.floor(words.list.length * Math.random())] + '.';
    return;
  }

  var elmWidth
  var staticCSS = styles.innerHTML = '' +
         '.banner-thumbnail-wrapper p {' +
          '-webkit-transition: .7s all ease;' +
           '-moz-transition: .7s all ease;' +
           '-ms-transition: .7s all ease;' +
           '-o-transition: .7s all ease;' +
           'transition: .7s all ease;' +
         '}' +
         '.banner-thumbnail-wrapper p:last-child {' +
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
           'text-align: left;' +
           (document.body.classList.contains('force-mobile-nav') ? '' : 'white-space: nowrap;') +
         '}' +
         '.banner-thumbnail-wrapper p > span > strong.past {' +
           'top: -' + (current.offsetHeight*0.5) + 'px;' +
         '}' +
         '.banner-thumbnail-wrapper p > span > strong.future {' +
           'top: ' + (current.offsetHeight*0.5) + 'px;' +
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
  var updateCSS = function () {
    styles.innerHTML = staticCSS +
         '.banner-thumbnail-wrapper p > span > strong {' +
           'width: ' + elmWidth + 'px;' +
         '}'
  }

  var animate = function() {
        current.innerText = words.next() + '.'
        next.innerText = words.peek() + '.'

        if (!elmWidth) {
            elmWidth = current.offsetWidth
        }

        updateCSS()
        current.classList.add('past')

        setTimeout(function() {
            next.classList.remove('future')
            setTimeout(function() {
                next.classList.remove('future')
                current.classList.remove('past')
                current.classList.add('future')

                var tmp = next
                next = current
                current = tmp

                setTimeout(animate, 500)
            }, 800)
        }, 300)
    }

    setTimeout(animate, 700)
}();