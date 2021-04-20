// @ts-nocheck

import React from 'react'
import Plugin from '../../core/plugin'
import ContentEditable from 'react-contenteditable'
import styles from './styles.module.scss'
import IconButton from '@material-ui/core/IconButton'
import AddIcon from '@material-ui/icons/Add'
import TextFieldsOutlinedIcon from '@material-ui/icons/TextFieldsOutlined'

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
    content: '',
    showPlaceholder: false
  }

  // Ref for content editable
  contentEditable = React.createRef()

  // Ref for the plus icon
  plusIcon = React.createRef()

  /**
   * Show plugin selector when click on plus icon
   * @param event
   * @private
   */
  private onAddBlockClick(event) {
    this.props.editor.showPluginSelector(this)
  }

  /**
   * Handle key pressing during editing
   * @param event
   * @private
   */
  private onKeyDown(event) {
    switch (event.key) {
      case 'Backspace':
        // If content if empty, we remove block
        if (this.state.content.length === 0) this.remove()
        break

      default:
        break
    }
  }

  /**
   * Fires when user focus on block
   * @param state
   * @private
   */
  private onHover(state: boolean) {
    this.setState({
      showPlaceholder: state
    })
  }

  /**
   * Remove block from the editor
   * @private
   */
  private remove() {

    // We remove block only if this block is not last
    if (!this.isLastBlock) {
      this.props.editor.removeBlock(this)
    }
  }

  onChange(event) {
    // If this block is the last one and we type text inside
    // we have to add another one block after this

    if (this.isLastBlock) {
      console.log('add new default block')
      this.props.editor.addBlockAfter(Text, null, this)
    }

    this.setState({
      content: event.target.value
    })
  }

  render() {
    const { content, showPlaceholder } = this.state
    return (
      <div className={styles.container}>
        <ContentEditable
          innerRef={this.contentEditable}
          html={content}
          onFocus={() => this.onHover(true)}
          onBlur={() => this.onHover(false)}
          onKeyDown={(event) => this.onKeyDown(event)}
          onChange={(event) => this.onChange(event)}
          className={styles.input}
        />

        {showPlaceholder && (
          <div className={styles.placeholder}>Compose something epic</div>
        )}

        <IconButton
          aria-label='Add plugin'
          aria-controls='long-menu'
          aria-haspopup='true'
          onClick={(event) => this.onAddBlockClick(event)}
          className={styles.pluginSelectButton}
          ref={this.plusIcon}
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
