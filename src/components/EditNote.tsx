import { NoteForm } from '.'
import { EditNoteProps } from '../@types/notes'

const EditNote = ({ onAddTag, availableTags }: EditNoteProps) => {
  return (
    <>
      <span className=" relative">
        <span
          className="block absolute -inset-1 -skew-y-3 bg-pink-500"
          aria-hidden="true"
        ></span>
        <span className="relative text-white font-bold text-xl">Edit Note</span>
      </span>
      <div className="my-10" />
      <NoteForm onAddTag={onAddTag} availableTags={availableTags} />
    </>
  )
}

export default EditNote
