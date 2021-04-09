// @ts-nocheck

import React, { useRef, createContext, useContext } from 'react'
import styles from './styles.module.css'
import CrystalEditorCore from './core/core'

interface IProps {
  content: string
}

const EditorContext = createContext(null)
/**
 * Main Component for Editor
 * @param content
 * @constructor
 */
const Editor = ({ content }: IProps) => {
  const core = useRef(
    new CrystalEditorCore({
      content, // content we have right now
      plugins: [] // plugins for different tags
    })
  )

  // How to get actual content
  console.log(core.current.content)

  return (
    <EditorContext.Provider value={core}>
      <div className={styles.test}>Example Component: {content}</div>
    </EditorContext.Provider>
  )
}

export const useEditorContext = () => useContext(EditorContext)

export default Editor
