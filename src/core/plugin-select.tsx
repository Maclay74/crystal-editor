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
  anchor: HTMLElement
  close: () => void
}

const PluginSelect = (props: IProps) => {
  const { anchor, close } = props
  const editor = useEditorContext()
  const open = Boolean(anchor)

  const onPluginClick = (plugin) => {
    console.log(editor.addBlock(plugin))
    close()
  }

  return (
    <div>
      <Menu
        id='long-menu'
        anchorEl={anchor}
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
