// @ts-nocheck

import React, { useState } from 'react'
import styles from './styles.module.scss'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

const Setup = ({ onSetup }) => {
  const [rows, setRows] = useState(2)
  const [columns, setColumns] = useState(2)

  return (
    <div className={styles.setup}>
      <h3 className={styles.title}>Setup the table</h3>
      <div className={styles.controls}>
        <TextField
          label='Rows'
          variant='outlined'
          size='small'
          type='number'
          defaultValue={rows}
          onChange={(event) => setRows(parseInt(event.target.value, 10))}
        />
        <TextField
          label='Columns'
          variant='outlined'
          size='small'
          type='number'
          defaultValue={columns}
          onChange={(event) => setColumns(parseInt(event.target.value, 10))}
        />
        <Button
          variant='contained'
          color='primary'
          fullWidth
          size='small'
          onClick={() => onSetup(rows, columns)}
        >
          Create
        </Button>
      </div>
    </div>
  )
}

export default Setup
