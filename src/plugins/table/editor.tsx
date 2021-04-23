// @ts-nocheck

import React from 'react'
import styles from './styles.module.scss'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import InputBase from '@material-ui/core/InputBase'

const Editor = ({ rows, updateCell }) => {
  return (
    <div className={styles.editor}>
      <Table aria-label='simple table'>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index}>
              {row.map((cell, cellKey) => (
                <TableCell key={cellKey} className={styles.cell}>
                  <InputBase
                    value={cell}
                    fullWidth
                    multiline
                    onChange={(event) =>
                      updateCell(event.target.value, index, cellKey)
                    }
                  />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default Editor
