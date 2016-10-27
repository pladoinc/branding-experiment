/**
 * assets/typed.js - branding-experiment
 * Copyright (C) 2016 PLADO Inc. All rights reserved.
 */

~ function() {
    'use strict';

    const text = document.getElementById('text')

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

        let text = txtInput.value.trim()
        txtInput.value = ''

        if (text) words.add(text)
    })

    ;[
            'passionate people',
            'open education',
            'self-paced learning',
            'uncovering your potential',
            'discovering your passion',
            'building your future',
            'broadening your horizons'
    ].forEach(words.add)

    const animate = function () {
        let index = -1
        const word = words.next()
        const write = function () {
            index += 1

            if (index < word.length) {
                text.innerText += word[index]
                setTimeout(write, 50)
            } else setTimeout(unwrite, 1000)
        }
        const unwrite = function () {
            if (text.innerText.length === 0) animate()
            else {
                text.innerText = text.innerText.substr(0, text.innerText.length - 1)
                setTimeout(unwrite, 50)
            }
        }

        write()
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