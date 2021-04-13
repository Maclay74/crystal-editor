// @ts-nocheck
import React, { createContext, useContext } from 'react'
import { parse as parseHtmlToJson } from 'himalaya'
import { Text, Table } from './plugins'

interface IProps {
  content: string
  plugins: Plugin[]
  ref: any
}

const EditorContext = createContext(null)

class CrystalEditor extends React.Component {
  // Default plugins
  private plugins: Plugin[] = [Text, Table]

  state = {
    blocks: [] // Blocks with elements, like text, images, etc
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
        const block = React.createElement(plugin, {
          element,
          ref: (ref) => this.blocksRefs.push(ref),
          key
        })
        blocks.push(block)
      }
    })

    this.setState({
      blocks
    })
  }

  public render(): React.ReactNode {
    const { blocks } = this.state

    return <div>{blocks}</div>
  }
}

export const useEditorContext = () => useContext(EditorContext)

export default React.forwardRef((props, ref) => (
  <CrystalEditor innerRef={ref} {...props} />
))
