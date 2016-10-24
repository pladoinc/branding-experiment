/**
 * assets/static.js - branding-experiment
 * Copyright (C) 2016 PLADO Inc. All rights reserved.
 */

~ function() {
    'use strict';

    let current = document.getElementById('current')
    let next = document.getElementsByClassName('future')[0]
    const blank = document.getElementsByClassName('blank')[0]

    /**
     * Iterator and handler for the words.
     */
    const words = {
        index: -1,
        list: [
            'passionate people',
            'open education',
            'self-paced learning',
            'uncovering your potential',
            'discovering your passion',
            'building your future',
            'broadening your horizons',
            'you'
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

    let paddingRight
    const styles = document.getElementById('custom')
    const updateCSS = function() {
        let offset = 0.5 * current.offsetHeight

        styles.innerHTML = `
        .text {
            padding-right: ${paddingRight}px;
        }

        .text span {
            position: absolute;
            width: ${paddingRight}px;
            text-align: center;
            top: ${blank.offsetTop}px;

            border-bottom:solid 3px #fff;
        }

        .text span.past {
            top: ${blank.offsetTop-offset}px;
        }

        .text span.future {
            top: ${blank.offsetTop+offset}px;
        }
        `
    }

    let animate = function() {
        current.innerText = words.next() + '.'
        next.innerText = words.peek() + '.'

        if (!paddingRight) {
            paddingRight = current.offsetWidth
        }

        updateCSS()
        current.classList.add('past')

        setTimeout(function() {
            next.classList.remove('future')
            setTimeout(function() {
                next.classList.remove('future')
                current.classList.remove('past')
                current.classList.add('future')

                let tmp = next
                next = current
                current = tmp

                setTimeout(animate, 500)
            }, 800)
        }, 300)
    }

    animate()
}();
