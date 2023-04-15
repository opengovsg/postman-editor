import './App.scss'
import { useCallback, useState } from 'react'
import pretty from 'pretty'

import { RichTextEditor } from './components/RichTextEditor'
import { CopyableTextArea } from './components/CopyableTextArea'

function App() {
  const [richTextValue, setRichTextValue] = useState('')
  const [rawHtml, setRawHtml] = useState('')

  const onTextAreaChange = useCallback((newVal: string) => {
    setRichTextValue(newVal)
    setRawHtml(newVal)
  }, [])

  return (
    <>
      <div className="banner">
        <a href="https://postman.gov.sg">
          <img height="40px" src="/postman.svg"></img>
        </a>
        <p>unofficial email editor</p>
      </div>
      <div className="row">
        <div className="card">
          <RichTextEditor
            initialValue={richTextValue}
            onChange={(newVal) => setRawHtml(pretty(newVal))}
          />
        </div>
        <div className="card">
          <CopyableTextArea value={rawHtml} onChange={onTextAreaChange} />
        </div>
      </div>
    </>
  )
}

export default App
