// @ts-nocheck
import React from 'react'
import { parse as parseHtmlToJson } from 'himalaya'
import { Text, Table } from './plugins'
import styles from './styles.module.scss'
import Plugin from './core/plugin'
import { Context as EditorContext } from './core/context'
import PluginSelect from './core/plugin-select'

interface IProps {
  content: string
  plugins: Plugin[]
  ref: any
}

class CrystalEditor extends React.Component {
  // Default plugins
  private plugins: Plugin[] = [Text, Table]

  private defaultPlugin: Plugin = Text

  state = {
    blocks: [], // Blocks with elements, like text, images, etc,
    showPluginSelector: false
  }

  private blocksRefs = []

  constructor(props: IProps) {
    super(props)

    // TODO merge plugins
    props.innerRef.current = this
    console.debug('Core: created')
  }

  componentDidMount(props) {
    this.parse(this.props.content)
  }

  /**
   * Get actual content in HTML as a string
   */
  get content(): string {
    console.debug('Core: get content')
    return this.blocksRefs.reduce((html, block) => html + block.toHtml(), '')
  }

  /**
   * Parse HTML string into blocks
   * @param html
   */
  private parse(html) {
    console.debug('Core: parse html')
    this.blocks = [] // Reset blocks

    // Get JSON from HTMl to make it more convenient to use further
    const json = parseHtmlToJson(html)

    const blocks = []

    // Each item = html node description
    json.forEach((element, key) => {
      // Find suitable plugin for this element
      const plugin = this.plugins.find(
        (p: Plugin) => p.tagName === element.tagName
      )

      // TODO show warning element when plugin isn't implemented
      if (plugin) {
        console.debug('   Core: create new block: ' + plugin.name)

        // Create new plugin instance with this block
        blocks.push(this.createBlock(plugin, element, key))
      }
    })

    blocks.push(this.createBlock(this.defaultPlugin))

    this.setState({
      blocks
    })
  }

  /**
   * Adds new block to composition
   * @param plugin
   * @param element
   */
  public addBlock(plugin, element) {
    const block = this.createBlock(plugin, element)
    const { blocks } = this.state
    blocks.splice(blocks.length - 1, 0, block)

    this.setState({
      blocks: [...blocks]
    })
  }

  /**
   * Create new block
   * @param plugin
   * @param element
   * @param index
   * @private
   */
  private createBlock(plugin, element, index) {
    return React.createElement(plugin, {
      element,
      ref: (ref) => this.blocksRefs.push(ref),
      key: index || this.state.blocks.length,
      editor: this
    })
  }

  /**
   * Show plugin selector with all the plugins we have
   * @param target
   */
  public showPluginSelector(target: HTMLElement) {
    this.setState({
      showPluginSelector: target
    })
  }

  /**
   * Hide plugin selector
   * @private
   */
  private closePluginSelector() {
    this.setState({
      showPluginSelector: false
    })
  }

  public render(): React.ReactNode {
    const { blocks, showPluginSelector } = this.state

    return (
      <EditorContext.Provider value={this}>
        <div className={styles.editor}>
          <PluginSelect
            anchor={showPluginSelector}
            close={() => this.closePluginSelector()}
          />
          {blocks}
        </div>
      </EditorContext.Provider>
    )
  }
}

export default React.forwardRef((props, ref) => (
  <CrystalEditor innerRef={ref} {...props} />
))
