// @ts-nocheck

import React, { ReactNode } from 'react'
import { Context as EditorContext } from './context'
import { stringify } from 'himalaya'

/**
 * We should have a plugin for every tag that can be found in our document
 */
abstract class Plugin extends React.Component {
  public static pluginName
  public static tagName

  protected constructor(props) {
    super(props)

    const { element } = props

    // Parse inner content, so we could edit
    if (element) {
      this.state.content = stringify([element])
    }
  }

  /**
   * Generate icon for plugin selector
   */
  public static getIcon(): ReactNode {
    return <div>{this.pluginName}</div>
  }

  /**
   * How to render such block in editor
   */
  public abstract render()

  /**
   *  How to represent this element into html
   */
  public abstract toHtml(): string
}

interface IPlugin {
  pluginName: string
  tagName: string
  toHtml: () => string
}

Plugin.contextType = EditorContext

export default Plugin