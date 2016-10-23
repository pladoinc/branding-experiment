/**
 * assets/index.js - branding-experiment
 * Copyright (C) 2016 PLADO Inc. All rights reserved.
 */

~ function() {
    'use strict';

    let current = document.getElementById('current')
    let next = document.getElementsByClassName('future')[0]
    const blank = document.getElementsByClassName('blank')[0]

    const styles = document.getElementById('custom')
    const updateCSS = function() {
        let offset = 0.5 * current.offsetHeight

        styles.innerHTML = `
                .text span {
                    position:absolute;
                    top: ${blank.offsetTop}px;
                }

                .text span.past {
                    top: ${blank.offsetTop-offset}px;
                }

                .text span.future {
                    top: ${blank.offsetTop+offset}px;
                }
                `
    }

    const words = {
        index: -1,
        list: [
            'passionate people',
            'open education',
            'self-paced learning',
            'you'
        ],

        nextIndex: function(i) {
            i++
            if (i === words.list.length) i = 0
            return i
        },

        next: function() {
            return words.list[words.index = words.nextIndex(words.index)]
        },

        peek: function() {
            return words.list[words.nextIndex(words.index)]
        }
    }

    let animate = function() {
        updateCSS()
        current.innerText = words.next() + '.'
        next.innerText = words.peek() + '.'

        current.classList.add('past')
        styles.innerHTML += `.text {
            padding-right: ${next.offsetWidth}px;
        }`

        setTimeout(function() {
            next.classList.remove('future')
            setTimeout(function() {
                next.classList.remove('future')
                current.classList.remove('past')
                current.classList.add('future')

                let tmp = next
                next = current
                current = tmp

                setTimeout(animate, 1000)
            }, 3000)
        }, 300)
    }

    /*current.innerText = words.next() + '.'
    next.innerText = words.peek() + '.'
    updateCSS()
    setTimeout(animate, 2000)*/

    animate()
}();