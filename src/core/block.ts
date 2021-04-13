// @ts-nocheck

import React from 'react'
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
class Block extends React.Component {
  private plugin: Plugin
  private element: IElement

  /**
   * Calls when we create new block or update existing
   */
  constructor(props: IProps) {
    super(props)

    const { plugin, element } = props

    console.debug('Block: create ' + plugin.pluginName)

    // Create new plugin instance for this block
    this.plugin = React.createElement(plugin, { element })
    this.element = element
  }

  /**
   * Convert block to HTML
   */
  public toHtml() {
    console.log(this.plugin)
    return 'string'

    // Plugin doesn't have toHtml method
    return this.plugin.type.toHtml()
  }

  public render(): React.ReactNode {
    console.log('render')
    return this.plugin
  }
}

export default Block
