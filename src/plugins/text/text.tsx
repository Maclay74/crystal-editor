// @ts-nocheck

import React from 'react'
import Plugin from '../../core/plugin'
import ContentEditable from 'react-contenteditable'
import { stringify } from 'himalaya'
import styles from './styles.module.scss'
import IconButton from '@material-ui/core/IconButton'
import AddIcon from '@material-ui/icons/Add'
import CrystalEditor from '../index'

interface IProps {
  element: any
  editor: CrystalEditor
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

    const { element } = props

    // Parse inner content, so we could edit
    if (element) {
      this.state.content = stringify([element])
    }
  }

  private onAddBlockClick(event) {
    this.props.editor.showPluginSelector(event.currentTarget)
  }

  onChange(event) {
    console.log(event.target.value)
  }

  render() {
    const { content } = this.state
    return (
      <div className={styles.container}>
        <ContentEditable
          innerRef={this.contentEditable}
          html={content}
          onChange={(event) => this.onChange(event)}
          className={styles.input}
        />
        <div className={styles.placeholder}>Compose something epic</div>

        <IconButton
          aria-label='Add plugin'
          aria-controls='long-menu'
          aria-haspopup='true'
          onClick={(event) => this.onAddBlockClick(event)}
          className={styles.pluginSelectButton}
        >
          <AddIcon />
        </IconButton>
      </div>
    )
  }

  toHtml(): string {
    return this.contentEditable.current.innerHTML
  }
}

export default Text

// TODO implement features from https://codesandbox.io/s/l91xvkox9l?file=/src/index.js:287-332
