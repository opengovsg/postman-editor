import { ReactNode, createContext, useState } from 'react'

interface IEmailFormContext {
  postmanApiKey: string
  recipient: string
  subject: string
  setPostmanApiKey: (str: string) => void
  setRecipient: (str: string) => void
  setSubject: (str: string) => void
}

export const EmailFormContext = createContext<IEmailFormContext>({
  postmanApiKey: '',
  recipient: '',
  subject: '',
  setPostmanApiKey: () => null,
  setRecipient: () => null,
  setSubject: () => null,
})

export const EmailFormContextProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const [recipient, setRecipient] = useState('')
  const [subject, setSubject] = useState('Test email')
  const [postmanApiKey, setPostmanApiKey] = useState('')
  return (
    <EmailFormContext.Provider
      value={{
        recipient,
        subject,
        postmanApiKey,
        setRecipient,
        setSubject,
        setPostmanApiKey,
      }}
    >
      {children}
    </EmailFormContext.Provider>
  )
}
