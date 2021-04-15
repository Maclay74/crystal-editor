// @ts-nocheck

import React, { useRef } from 'react'
import Editor from 'crystal-editor'

import Button from '@material-ui/core/Button';
import 'crystal-editor/dist/index.css'

const App = () => {
  const editor = useRef()

  const testHtml = ''

  return (
    <div className={'editor'}>
      <input type='text' className={'title-input'} placeholder={'Title'} />
      <Editor content={testHtml} ref={editor} />

      <div className='actions'>
        <Button variant='contained' color='primary'>
          Get html
        </Button>
      </div>
    </div>
  )
}

export default App
