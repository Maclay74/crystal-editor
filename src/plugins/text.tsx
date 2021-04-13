// @ts-nocheck

import React from 'react'
import Plugin from '../core/plugin'
import ContentEditable from 'react-contenteditable'
import { stringify } from 'himalaya'

interface IProps {
  element: any
}

/**
 * Text plugin for "p" tag
 */
class Text extends Plugin {
  static pluginName = 'Text'
  static tagName = 'p'

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
    return (
      <div style={{ padding: 30 }}>
        <ContentEditable innerRef={this.contentEditable} html={content} />
      </div>
    )
  }

  toHtml(): string {
    return this.contentEditable.current.innerHTML
  }
}

export default Text

// TODO implement features from https://codesandbox.io/s/l91xvkox9l?file=/src/index.js:287-332
