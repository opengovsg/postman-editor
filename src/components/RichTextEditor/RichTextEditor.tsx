import './RichTextEditor.scss'

import { useEffect } from 'react'
import { EditorContent, useEditor } from '@tiptap/react'
import Link from '@tiptap/extension-link'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import Image from '@tiptap/extension-image'

import { MenuBar } from './RichTextMenuBar'

interface RichTextEditorProps {
  value?: string
  initialValue?: string
  onChange?: (value: string) => void
}

export const RichTextEditor: React.FC<RichTextEditorProps> = (props) => {
  const { initialValue, onChange } = props

  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        HTMLAttributes: { rel: null, target: '_blank' },
      }),
      Underline,
      Table.configure({
        resizable: false,
      }),
      TableRow,
      TableHeader,
      TableCell,
      Image.configure({
        inline: true,
        HTMLAttributes: {
          width: '600px',
        },
      }),
    ],
    content: initialValue,
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML())
    },
  })

  // this is required as value will not be set after the first render
  useEffect(() => {
    if (initialValue && editor) {
      editor.commands.setContent(initialValue)
    }
  }, [initialValue, editor])

  return (
    <div className="editor">
      {editor && <MenuBar editor={editor} />}
      <EditorContent className="editor__content" editor={editor} />
    </div>
  )
}
