import { Link } from 'react-router-dom'
import { useNote } from '../utils/hooks'
import { Button } from '.'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

type NoteDetailProps = {
  onDeleteNote: (id: string) => void
}

const Note = ({ onDeleteNote }: NoteDetailProps) => {
  const note = useNote()

  return (
    <>
      <div className="flex flex-row justify-between items-center mb-5">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">{note.title}</h1>

          {note.tags.length > 0 && (
            <div className="flex flex-row flex-wrap space-x-3 mt-3">
              {note.tags.map((tag) => (
                <div
                  className="px-3 py-1 rounded-md bg-blue-500 text-slate-100 text-lg"
                  key={tag.id}
                >
                  {tag.label}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-row space-x-4 md:space-x-10">
          <Link to={`/${note.id}/edit`}>
            <Button hasBackground={true} text="Edit" />
          </Link>

          <Link
            to="."
            onClick={(e) => {
              e.preventDefault()
              onDeleteNote(note.id)
            }}
          >
            <Button hasBackground={false} text="Delete" />
          </Link>

          <Link to="..">
            <Button hasBackground={false} text="Back" />
          </Link>
        </div>
      </div>

      <Markdown className={`markdown content`} remarkPlugins={[remarkGfm]}>
        {note.markdown}
      </Markdown>
    </>
  )
}

export default Note
