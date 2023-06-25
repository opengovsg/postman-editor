import { useCallback, useContext, useState } from 'react'
import './SendModal.scss'
import { EditorContext } from '../../../contexts/EditorContext'
import { sanitiseHtml } from '../../../utils/sanitiseHtml'
import { EmailFormContext } from '../../../contexts/EmailFormContext'

export const SendModal = ({ onClose }: { onClose: () => void }) => {
  const { rawHtml } = useContext(EditorContext)
  const {
    postmanApiKey,
    setPostmanApiKey,
    subject,
    setSubject,
    recipient,
    setRecipient,
  } = useContext(EmailFormContext)

  const [sendState, setSendState] = useState<
    'ready' | 'sending' | 'sent' | 'error'
  >('ready')

  const sendEmail = useCallback(async () => {
    if (!postmanApiKey || !recipient) {
      return
    }
    const sanitisedHTML = sanitiseHtml(rawHtml)
    try {
      setSendState('sending')
      await fetch('https://api.postman.gov.sg/v1/transactional/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${postmanApiKey}`,
        },
        body: JSON.stringify({
          subject,
          body: sanitisedHTML,
        }),
      })
      setSendState('sent')
      setTimeout(() => setSendState('ready'), 2000)
    } catch (e) {
      setSendState('error')
      console.error(e)
      setTimeout(() => setSendState('ready'), 2000)
    }
  }, [postmanApiKey, rawHtml, recipient, subject])

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <label>Postman API Key</label>
        <input
          className="modal-input"
          type="text"
          autoComplete="off"
          placeholder="This is only persisted in memory"
          value={postmanApiKey}
          onChange={(e) => setPostmanApiKey(e.target.value)}
        />
        <label>Recipient Email</label>
        <input
          className="modal-input"
          type="email"
          placeholder="Enter recipient"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
        />

        <label>Subject</label>
        <input
          className="modal-input"
          type="email"
          placeholder="Enter recipient"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />

        <button className={`modal-button ${sendState}`} onClick={sendEmail}>
          {sendState === 'ready' && 'Send'}
          {sendState === 'sending' && 'Sending...'}
          {sendState === 'sent' && 'Sent!'}
          {sendState === 'error' && 'Error. Check console logs.'}
        </button>
      </div>
    </div>
  )
}
