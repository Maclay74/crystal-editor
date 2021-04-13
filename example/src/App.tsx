// @ts-nocheck

import React, { useRef } from 'react'

import Editor from 'crystal-editor'
import 'crystal-editor/dist/index.css'

const App = () => {
  const editor = useRef()

  const testHtml = '<p>Here <b>we go!</b></p>' +
    '<table><tbody><tr><td>here</td><td>we</td><td>go</td></tr></tbody></table>'

  return (
    <>
      <Editor content={testHtml} ref={editor} />
      <button onClick={() => console.log(editor.current.content)}>
        Get html
      </button>
    </>
  )
}

export default App
