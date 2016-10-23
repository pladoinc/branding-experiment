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

    /**
     * Iterator and handler for the words.
     */
    const list = document.getElementById('list')
    const words = {
        index: -1,
        list: [],

        add: function (word) {
            let index = words.list.push(word) - 1

            let li = document.createElement('li')
            let text = document.createElement('span')
            let btnRm = document.createElement('button')

            text.innerText = word

            btnRm.classList.add('remove')
            btnRm.setAttribute('data-index', String(index))
            btnRm.innerText = 'x'

            btnRm.addEventListener('click', function (evt) {
                evt.preventDefault()
                words.list = words.list.filter(function (w) {
                    return w !== word
                })

                next.innerText = words.peek() + '.'
                list.removeChild(li)
            })

            li.appendChild(text)
            li.appendChild(btnRm)

            list.appendChild(li)
        },

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

    const txtInput = document.getElementById('txtInput')
    document.getElementById('btnAdd').addEventListener('click', function (evt) {
        evt.preventDefault()

        let text = txtInput.value
        txtInput.value = ''
        words.add(text)
    })

    ;[
            'passionate people',
            'open education',
            'self-paced learning',
            'you'
    ].forEach(words.add)

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

                setTimeout(animate, 500)
            }, 800)
        }, 300)
    }

    document.documentElement.addEventListener('click', function (evt) {
        let text = document.getElementsByClassName('content')[0]
        let clicked = evt.x >= text.offsetLeft && evt.x <= (text.offsetLeft + text.offsetWidth) &&
                      evt.y >= text.offsetTop && evt.y <= (text.offsetTop + text.offsetHeight)

        if (clicked && evt.target === text) {
            text.setAttribute('contenteditable', 'true')
        } else if (text.getAttribute('contenteditable')) {
            text.removeAttribute('contenteditable')
        }
    })

    animate()
}();