// @ts-nocheck

import Plugin from './plugin'

export interface IElement {
  attributes: []
  children: []
  tagName: string
  type: string
}

interface IProps {
  plugin: Plugin
  element: IElement
}

/**
 * Describes single block of content.
 */
class Block {
  private plugin: Plugin
  private element: IElement

  /**
   * Calls when we create new block or update existing
   */
  constructor({ plugin, element }: IProps) {
    console.debug('Block: create ' + plugin.pluginName)

    // Create new plugin instance for this block
    this.plugin = new plugin(element)
    this.element = element
  }

  /**
   * Convert block to HTML
   */
  public toHtml() {
    return this.plugin.toHtml()
  }
}

export default Block
