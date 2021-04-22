// @ts-nocheck
import React from 'react'
import { parse as parseHtmlToJson } from 'himalaya'
import { v4 as uuidv4 } from 'uuid'
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
   * Add new block before target block
   * @param plugin
   * @param element
   * @param targetRef
   */
  public addBlockBefore(
    plugin: Plugin,
    element = null,
    targetRef = null
  ): Plugin {
    const { blocks } = this.state
    const block = this.createBlock(plugin, element)

    // By default, add new block to the beginning of the composition
    let targetIndex = 0

    if (targetRef) {
      // Find target block index
      targetIndex = this.state.blocks.findIndex(
        (block) => block.props.uuid === targetRef.props.uuid
      )
    }
    // If target block is first, put new block at the beginning of the aray
    if (targetIndex === 0) {
      blocks.unshift(block)

      // Otherwise, put new block before in line
    } else {
      blocks.splice(targetIndex, 0, block)
    }

    this.setState({
      blocks: [...blocks]
    })

    return block
  }

  /**
   * Add new block after target block
   * @param plugin
   * @param element
   * @param targetRef
   */
  public addBlockAfter(
    plugin: Plugin,
    element = null,
    targetRef = null
  ): Plugin {
    const { blocks } = this.state
    const block = this.createBlock(plugin, element)

    // By default, add at the end of the composition
    let targetIndex = blocks.length - 1

    if (targetRef) {
      // Find target block index
      targetIndex = this.state.blocks.findIndex(
        (block) => block.props.uuid === targetRef.props.uuid
      )
    }

    blocks.splice(targetIndex + 1, 0, block)

    this.setState({
      blocks: [...blocks]
    })

    return block
  }

  /**
   * Create new block
   * @param plugin
   * @param element
   * @param index
   * @private
   */
  private createBlock(plugin, element, index) {
    const uuid = uuidv4()
    return React.createElement(plugin, {
      element,
      ref: (ref) => this.blocksRefs.push(ref),
      key: uuid,
      editor: this,
      uuid
    })
  }

  public removeBlock(targetRef) {
    // We have to remove block from two places - from render and internal memory
    // so it would be taken in count when generating html

    const ref = this.blocksRefs.find((ref) => ref === targetRef)
    const block = this.state.blocks.find(
      (block) => block.props.uuid === ref.props.uuid
    )

    // If we have block after removing, focus on it
    if (ref.nextRef) ref.nextRef.focus()

    // Remove from refs
    this.blocksRefs = this.blocksRefs
      .filter((existingRef) => existingRef !== ref)
      .filter(Boolean)

    // Remove from render
    this.setState({
      blocks: this.state.blocks.filter((exitingBlock) => exitingBlock !== block)
    })
  }

  /**
   * Show plugin selector with all the plugins we have
   * @param target
   */
  public showPluginSelector(target) {
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

export { CrystalEditor }

export default React.forwardRef((props, ref) => (
  <CrystalEditor innerRef={ref} {...props} />
))
