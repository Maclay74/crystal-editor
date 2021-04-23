// @ts-nocheck

import React from 'react'
import Plugin from '../../core/plugin'
import { stringify, parse } from 'himalaya'
import styles from './styles.module.scss'
import TableChartOutlinedIcon from '@material-ui/icons/TableChartOutlined'
import { DataGrid } from '@material-ui/data-grid'
import Setup from './setup'
import Editor from './editor'

interface IProps {
  element: any
}

enum Status {
  created,
  working
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
    content: [],
    status: Status.created,
    rowsCount: 2,
    columnsCount: 2
  }

  private setupTable(rows: number, columns: number) {
    // Create new matrix and fill it with empty strings

    const content = new Array(rows)
    for (let i = 0; i < rows; i++) content[i] = new Array(columns).fill('')

    this.setState({
      status: Status.working,
      rows,
      columns,
      content
    })
  }

  private updateCell(value: string, row: number, column: number) {
    const { content } = this.state
    content[row][column] = value
    this.setState({ content })
  }

  render() {
    const { content, status } = this.state

    return (
      <div className={styles.container}>
        {status === Status.created && (
          <Setup onSetup={(rows, columns) => this.setupTable(rows, columns)} />
        )}
        {status === Status.working && (
          <Editor
            rows={content}
            updateCell={(value, row, column) =>
              this.updateCell(value, row, column)
            }
          />
        )}
      </div>
    )
  }

  toHtml(): string {
    const { content } = this.state

    return stringify([
      {
        attributes: [],
        tagName: 'table', // Table
        type: 'element',
        children: [
          {
            tagName: 'tbody', // TBody
            type: 'element',
            attributes: [],

            // Rows
            children: content.map((row) => ({
              attributes: [],

              // Columns
              children: row.map((cell) => ({
                attributes: [],
                tagName: 'th',
                type: 'element',

                // Column content
                children: [{ type: 'text', content: cell }]
              })),
              tagName: 'tr',
              type: 'element'
            }))
          }
        ]
      }
    ])
  }
}

export default Table
