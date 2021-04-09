// @ts-nocheck
import { parse as parseHtmlToJson } from 'himalaya'
import Block from './block'
import { Text } from '../plugins'

interface Props {
  content: string
  plugins: Plugin[]
}

class CrystalEditorCore {
  // Blocks with elements, like text, images, etc
  private blocks: Block[]

  // Default plugins
  private plugins: Plugin[] = [Text]

  constructor({ content, plugins }: Props) {
    console.debug('Core: created')
    // TODO merge plugins

    this.parse(content)
  }

  /**
   * Get actual content in HTML as a string
   */
  get content(): string {
    console.debug('Core: get content')

    return this.blocks.reduce(
      (accumulator, current) => accumulator + current.toHtml(),
      ''
    )
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

    // Each item = html node description
    json.forEach((element) => {
      // Find suitable plugin for this element
      const plugin = this.plugins.find(
        (p: Plugin) => p.tagName === element.tagName
      )

      // TODO show warning element when plugin isn't implemented
      if (plugin) {
        console.debug('   Core: create new block: ' + plugin.name)

        // Add new block, create it
        this.blocks.push(
          new Block({
            plugin,
            element
          })
        )
      }
    })
  }
}

export default CrystalEditorCore
