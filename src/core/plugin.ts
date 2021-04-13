// @ts-nocheck

import React from 'react'

/**
 * We should have a plugin for every tag that can be found in our document
 */
abstract class Plugin extends React.Component {
  public static pluginName
  public static tagName

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

export default Plugin
