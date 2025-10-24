const CharacterCounter = ({char, max}) => {
  return (
      <p className='px-4 py-1 bg-none text-gray-400 text-xs'>{char}/{max}</p>
  )
}

export default CharacterCounter
