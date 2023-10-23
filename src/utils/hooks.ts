import { useOutletContext } from 'react-router-dom'
import { Note } from '../@types/notes'

export function useNote() {
  return useOutletContext<Note>()
}
