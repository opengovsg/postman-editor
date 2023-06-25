import { useState } from 'react'

import { EmailFormContextProvider } from '../../../contexts/EmailFormContext'

import { SendModal } from './SendModal'
import './Sendbutton.scss'

export const SendButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  return (
    <EmailFormContextProvider>
      <div>
        {isModalOpen && <SendModal onClose={() => setIsModalOpen(false)} />}
        <button className="send-button" onClick={() => setIsModalOpen(true)}>
          Send with <img src="/postman-logo-only.svg" height="20" />
        </button>
      </div>
    </EmailFormContextProvider>
  )
}
