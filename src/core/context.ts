import { createContext, useContext } from 'react'

export const Context = createContext(15)
const useEditorContext = () => useContext(Context)
export default useEditorContext
