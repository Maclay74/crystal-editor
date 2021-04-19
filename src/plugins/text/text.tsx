// @ts-nocheck

import React from 'react'
import Plugin from '../../core/plugin'
import ContentEditable from 'react-contenteditable'
import { stringify } from 'himalaya'
import styles from './styles.module.scss'
import IconButton from '@material-ui/core/IconButton'
import AddIcon from '@material-ui/icons/Add'
import TextFieldsOutlinedIcon from '@material-ui/icons/TextFieldsOutlined';
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

  static getIcon() {
    return <TextFieldsOutlinedIcon />
  }

  state = {
    content: ''
  }

  // Ref for content editable
  contentEditable = React.createRef()

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
