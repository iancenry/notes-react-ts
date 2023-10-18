import { NoteForm } from '.'
import { NewNoteProps } from '../@types/notes'

const NewNote = ({ onAddTag, availableTags }: NewNoteProps) => {
  return (
    <>
      <span className=" relative">
        <span
          className="block absolute -inset-1 -skew-y-3 bg-pink-500"
          aria-hidden="true"
        ></span>
        <span className="relative text-white font-bold text-xl">New Note</span>
      </span>
      <div className="my-10" />
      <NoteForm onAddTag={onAddTag} availableTags={availableTags} />
    </>
  )
}

export default NewNote
