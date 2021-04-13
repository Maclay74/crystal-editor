// @ts-nocheck

import React from 'react'
import Plugin from '../core/plugin'
import { stringify } from 'himalaya'

interface IProps {
  element: any
}

/**
 * Text plugin for "table" tag
 */
class Table extends Plugin {
  static pluginName = 'Table'
  static tagName = 'table'

  state = {
    content: ''
  }

  // Ref for content editable
  contentEditable = React.createRef()

  constructor(props: IProps) {
    super(props)

    // Parse inner content, so we could edit
    this.state.content = stringify([props.element])
  }

  render() {
    const { content } = this.state
    return <div style={{ padding: 30 }} dangerouslySetInnerHTML={{__html: content}} />
  }

  toHtml(): string {
    return this.contentEditable.current.innerHTML
  }
}

export default Table
