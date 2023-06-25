import './App.scss'

import { RichTextEditor } from './components/RichTextEditor'
import { CopyableTextArea } from './components/CopyableTextArea'
import { EditorContextProvider } from './contexts/EditorContext'

function App() {
  return (
    <EditorContextProvider>
      <div className="banner">
        <a href="https://postman.gov.sg">
          <img height="40px" src="/postman.svg"></img>
        </a>
        <p>unofficial email editor</p>
      </div>
      <div className="row">
        <div className="card">
          <RichTextEditor />
        </div>
        <div className="card">
          <CopyableTextArea />
        </div>
      </div>
    </EditorContextProvider>
  )
}

export default App
