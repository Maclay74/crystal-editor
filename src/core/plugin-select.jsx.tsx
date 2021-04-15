import React from 'react'
// @ts-ignore
import Menu from '@material-ui/core/Menu'
// @ts-ignore
import MenuItem from '@material-ui/core/MenuItem'

import {useEditorContext} from '../index'

const options = [
  'None',
  'Atria',
  'Callisto',
  'Dione',
  'Ganymede',
  'Hangouts Call',
  'Luna',
  'Oberon',
  'Phobos',
  'Pyxis',
  'Sedna',
  'Titania',
  'Triton',
  'Umbriel'
]

const ITEM_HEIGHT = 48

interface IProps {
  anchor: HTMLElement
  close: () => void
}

const PluginSelect = (props: IProps) => {
  // const [anchor, setAnchor] = useState(false)

  const { anchor, close } = props
  const editor = useEditorContext()
  const open = Boolean(anchor)

  console.log(editor)

  return (
    <div>
      <Menu
        id='long-menu'
        anchorEl={anchor}
        keepMounted
        open={open}
        onClose={close}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch'
          }
        }}
      >
        {options.map((option) => (
          <MenuItem
            key={option}
            selected={option === 'Pyxis'}
            onClick={close}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  )
}

export default PluginSelect
