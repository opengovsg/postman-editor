import './CopyableTextArea.scss'

import { useState } from 'react'
import ReactDiffViewer from 'react-diff-viewer'
import { sanitiseHtml } from '../../utils/sanitiseHtml'

interface CopyableTextAreaProps {
  value: string
  onChange: (value: string) => void
}

export const CopyableTextArea = ({
  value,
  onChange,
}: CopyableTextAreaProps) => {
  const [copied, setCopied] = useState(false)
  const [isDiffView, setIsDiffView] = useState(false)

  const onCopy = () => {
    setCopied(true)
    navigator.clipboard.writeText(isDiffView ? sanitiseHtml(value) : value)
    setTimeout(() => setCopied(false), 1000)
  }

  return (
    <div className="copyable-text-area-container">
      <div className="copyable-text-area-header">
        <div className="copyable-text-area-header-switch">
          <button
            onClick={() => setIsDiffView(false)}
            className={!isDiffView ? 'is-active' : ''}
          >
            Raw HTML
          </button>
          |
          <button
            onClick={() => setIsDiffView(true)}
            className={isDiffView ? 'is-active' : ''}
          >
            Sanitised HTML
          </button>
        </div>
        <button
          className={`copy-button ${copied ? 'copied' : ''}`}
          onClick={onCopy}
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      {!isDiffView ? (
        <textarea
          className="copyable-text-area"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <div className="diff-viewer">
          <ReactDiffViewer
            useDarkTheme
            showDiffOnly={false}
            oldValue={value}
            newValue={sanitiseHtml(value)}
            splitView={false}
          />
        </div>
      )}
    </div>
  )
}
