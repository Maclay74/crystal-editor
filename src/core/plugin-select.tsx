// @ts-nocheck

import React from 'react'
// @ts-ignore
import Menu from '@material-ui/core/Menu'
// @ts-ignore
import MenuItem from '@material-ui/core/MenuItem'
import useEditorContext from './context'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'

interface IProps {
  anchor: Plugin
  close: () => void
}

const PluginSelect = (props: IProps) => {
  const { anchor, close } = props
  const editor = useEditorContext()
  const open = Boolean(anchor)

  /**
   * When select plugin, add new or replace existing text block
   * @param plugin
   */
  const onPluginClick = (plugin) => {
    // If this element is last, insert new block before it
    // Or replace this block

    const newBlock = editor.addBlockBefore(plugin, null, anchor)

    // If this block is in the middle of composition
    // we remove it, because it's better for UX
    if (!anchor.isLastBlock) {
      editor.removeBlock(anchor)
    }
    setTimeout(() => {
      const newBlockRef = editor.blocksRefs.filter(Boolean).find((ref) => {
        return ref.props.uuid === newBlock.props.uuid
      })

      // Focus on newly created block after adding it to the compositing
      newBlockRef.focus()
    }, 100)

    close()
  }

  return (
    <div>
      <Menu
        id='long-menu'
        anchorEl={anchor?.plusIcon?.current}
        keepMounted
        open={open}
        onClose={close}
      >
        {editor.plugins.map((plugin) => (
          <MenuItem key={plugin} onClick={() => onPluginClick(plugin)}>
            <ListItemIcon>{plugin.getIcon()}</ListItemIcon>
            <ListItemText primary={plugin.pluginName} />
          </MenuItem>
        ))}
      </Menu>
    </div>
  )
}

export default PluginSelect
