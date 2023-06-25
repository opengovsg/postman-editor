import './RichTextEditor.scss'

import { useCallback, useContext, useEffect } from 'react'
import pretty from 'pretty'
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
import { EditorContext } from '../../contexts/EditorContext'

export const RichTextEditor = () => {
  const { richTextValue: initialValue, setRawHtml } = useContext(EditorContext)

  const onChange = useCallback(
    (newVal: string) => {
      setRawHtml(pretty(newVal))
    },
    [setRawHtml]
  )

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
      TableHeader.configure({
        HTMLAttributes: {
          style: 'border: 1px solid black;  border-collapse: collapse;',
        },
      }),
      TableCell.configure({
        HTMLAttributes: {
          style: 'border: 1px solid black;  border-collapse: collapse;',
        },
      }),
      Image.configure({
        inline: true,
        HTMLAttributes: {
          width: '600px',
        },
      }),
    ],
    content: initialValue,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
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
