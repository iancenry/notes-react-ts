export type Button = {
  hasBackground: boolean
  text: string
  isSubmit?: boolean
}

const Button = ({ hasBackground, text, isSubmit = false }: Button) => {
  return (
    <button
      type={isSubmit === true ? 'submit' : 'button'}
      className={`${
        hasBackground
          ? 'bg-blue-600 text-gray-100'
          : 'outline outline-1 outline-gray-800 text-gray-600'
      } ${
        text === 'Delete' && 'text-red-600'
      }  cursor-pointer rounded-md text-xl shadow-md active:shadow-2xl  px-4 py-1 md:px-8 md:py-3`}
    >
      {text}
    </button>
  )
}

export default Button
