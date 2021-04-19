// @ts-nocheck

import React from 'react'
import Plugin from '../../core/plugin'
import { stringify } from 'himalaya'
import TableChartOutlinedIcon from '@material-ui/icons/TableChartOutlined'

interface IProps {
  element: any
}

/**
 * Text plugin for "table" tag
 */
class Table extends Plugin {
  static pluginName = 'Table'
  static tagName = 'table'

  public static getIcon() {
    return <TableChartOutlinedIcon />
  }

  state = {
    content: ''
  }

  render() {
    const { content } = this.state
    return <div>TABLE!11</div>
  }

  toHtml(): string {
    return 'TABLE!!!'
  }
}

export default Table
