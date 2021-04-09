// @ts-nocheck

/**
 * We should have a plugin for every tag that can be found in our document
 */
abstract class Plugin {

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

export default Plugin
