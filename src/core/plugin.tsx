// @ts-nocheck

import React, { ReactNode } from 'react'
import { Context as EditorContext } from './context'
import { stringify } from 'himalaya'
import { CrystalEditor } from '../index'

interface IProps {
  element: any
  editor: CrystalEditor
  uuid: string
}

/**
 * We should have a plugin for every tag that can be found in our document
 */
abstract class Plugin extends React.Component {
  public static pluginName
  public static tagName

  protected constructor(props: IProps) {
    super(props)

    const { element } = props

    // Parse inner content, so we could edit
    if (element) {
      this.state.content = stringify([element])
    }
  }

  /**
   * Check whether this block is last
   * @private
   */
  protected get isLastBlock() {
    const { blocks } = this.props.editor.state
    return blocks[blocks.length - 1].props.uuid === this.props.uuid
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

  /**
   * After adding new block we focus on it by calling this function
   */
  public focus() {}

  /**
   * Get next block in composition
   */
  public get nextBlock(): ReactNode {
    const { blocks } = this.props.editor.state

    const currentIndex = blocks.findIndex(
      (block) => block.props.uuid === this.props.uuid
    )

    // If we have block after this one
    if (currentIndex < blocks.length - 1) {
      return blocks[currentIndex + 1]
    }
    return null
  }

  /**
   * Get previous block in composition
   */
  public get prevBlock(): ReactNode {
    const { blocks } = this.props.editor.state

    const currentIndex = blocks.findIndex(
      (block) => block.props.uuid === this.props.uuid
    )

    if (currentIndex > 0) return blocks[currentIndex - 1]
    return null
  }

  /**
   * Get next ref in composition
   */
  public get nextRef(): Plugin {
    const { blocksRefs } = this.props.editor

    if (this.nextBlock) {
      return blocksRefs
        .filter(Boolean)
        .find((ref) => ref.props.uuid === this.nextBlock.props.uuid)
    }

    return null
  }

  /**
   * Get previous ref in composition
   */
  public get prevRef(): Plugin {
    const { blocksRefs } = this.props.editor

    if (this.prevBlock) {
      return blocksRefs
        .filter(Boolean)
        .find((ref) => ref.props.uuid === this.prevBlock.props.uuid)
    }
  }
}

interface IPlugin {
  pluginName: string
  tagName: string
  toHtml: () => string
}

Plugin.contextType = EditorContext

export default Plugin
