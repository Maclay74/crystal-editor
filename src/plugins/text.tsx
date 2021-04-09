// @ts-nocheck

import React from 'react'
import Plugin from '../core/plugin'
import { IElement } from '../core/block'

/**
 * Text plugin for "p" tag
 */
class Text extends Plugin {
  static pluginName = 'Text'
  static tagName = 'p'
  private element: IElement

  constructor(element: IElement) {
    super(element)
    this.element = element
  }

  render() {
    return <div>Text block is here</div>
  }

  toHtml(): string {
    // Wrap our content with our tag before return
    const wrapper = document.createElement(Text.tagName)
    wrapper.innerHTML = this.element.children[0].content

    return wrapper.outerHTML
  }
}

export default Text
