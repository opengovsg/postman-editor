import './App.scss'

import { RichTextEditor } from './components/RichTextEditor'
import { CopyableTextArea } from './components/CopyableTextArea'
import { EditorContextProvider } from './contexts/EditorContext'

function App() {
  return (
    <EditorContextProvider>
      <div className="banner">
        <a target="_blank" href="https://postman.gov.sg" rel="noreferrer">
          <img height="40px" src="/postman.svg"></img>
        </a>
        <p>
          Email HTML Editor <span className="beta-tag">beta</span>
        </p>
      </div>
      <a
        href="https://github.com/opengovsg/postman-editor"
        target="_blank"
        className="github-link"
        rel="noreferrer"
      >
        <img height="25px" src="/github.png"></img>
      </a>
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
