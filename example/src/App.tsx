import React from 'react'

import Editor from 'crystal-editor'
import 'crystal-editor/dist/index.css'

const App = () => {

  const testHtml = "<p>Here we go!</p>";

  return <Editor content={testHtml} />
}

export default App
