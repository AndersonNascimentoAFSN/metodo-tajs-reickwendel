import { describe, it, jest, expect } from '@jest/globals'

import View from '../../public/src/view.js'

describe('View test suite', () => {
  it('#updateList should append content to card-list innerHTML', () => {
    const innerHTMLSpy = jest.fn()

    const baseHTML = '<div></div>'
    const querySelectorProxy = new Proxy({
      innerHTML: baseHTML
    }, {
      set(obj, key, value) {
        obj[key] = value

        innerHTMLSpy(obj[key])

        return true
      }
    })
    jest.spyOn(document, 'querySelector')
      .mockImplementation((key) => {
        if (key !== '#card-list') return

        return querySelectorProxy
      })

    const view = new View()

    const data = {
      title: 'Title',
      imageUrl: 'http://example.com/image.jpg'
    }

    const generatedContent = `
    <article class="col-md-12 col-lg-4 col-sm-3 top-30">
            <div class="card">
                <figure>
                    <img class="card-img-top card-img"
                        src="${data.imageUrl}"
                        alt="Image of an ${data.title}">
                    <figcaption>
                        <h4 class="card-title">${data.title}</h4>
                    </figcaption>
                </figure>
            </div>
        </article>
    `

    view.updateList([data])

    expect(innerHTMLSpy).toHaveBeenCalledWith(baseHTML + generatedContent)
  })
})