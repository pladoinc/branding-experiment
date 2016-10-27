/**
CSS injected alongside:
<style>
@-webkit-keyframes blink {
    from { opacity: 0; }
    to { opacity: 1; }
}

@keyframes blink {
    0% { opacity: 0; }
    50% { opacity: 1; }
    100% { opacity: 0; }
}

.banner-thumbnail-wrapper .cursor {
    font-size: 1.2em;

    -webkit-animation: blink 1.2s infinite;
    animation: blink 1.2s infinite;
}
</style>
 */

~ function () {
  'use strict';

  var go = function () {
    if (document.body.getAttribute('data-gr-c-s-loaded')) {
      // actual implementation
      var p = document.getElementsByClassName('banner-thumbnail-wrapper')[0].getElementsByTagName('p')[0]

      var words = {
        index: -1,
        list: (function () {
          var a = this;
          var j, x, i;
          for (i = a.length; i; i--) {
            j = Math.floor(Math.random() * i);
            x = a[i - 1];
            a[i - 1] = a[j];
            a[j] = x;
          }
          return a;
        }).call([
          'passionate people',
          'open education',
          'self-paced learning',
          'uncovering your potential',
          'discovering your passion',
          'building your future',
          'broadening your horizons'
        ]),
        nextIndex: function (i) {
          i++
          if (i >= words.list.length) i = 0
          return i
        },
        next: function () {
          return words.list[words.index = words.nextIndex(words.index)]
        },
        peek: function () {
          return words.list[words.nextIndex(words.index)]
        }
      }

      var text = p.getElementsByTagName('strong')[0]
      p.innerHTML = '<span class="outer">' +
        'PLADO is about ' +
        text.outerHTML.replace(text.innerHTML, '') +
        '</span>'

      var outer = p.getElementsByClassName('outer')[0]
      var span

      var animate = function () {
        var index = -1
        var word = words.next()
        var write = function () {
          index += 1
          if (index < word.length) {
            text.innerText += word[index]
            setTimeout(write, 50)
          } else setTimeout(unwrite, 1000)
        }
        var unwrite = function () {
          if (text.innerText.length === 0) animate()
          else {
            text.innerText = text.innerText.substr(0, text.innerText.length - 1)
            setTimeout(unwrite, 50)
          }
        }

        write()
      }

      if (document.body.classList.contains('force-mobile-nav')) {
        p.getElementsByTagName('strong')[0].innerText = words.list[Math.floor(words.list.length * Math.random())] + '.';
      } else {
        outer.innerHTML += '<span class="cursor">|</span>'
        text = p.getElementsByTagName('strong')[0]
        text.innerText = ''
        span = p.getElementsByClassName('cursor')[0]
        animate()
      }
    } else setTimeout(go, 100)
  }

  // prerequisite check
  if (document.documentElement.classList.contains('cssanimations')) go()
}();