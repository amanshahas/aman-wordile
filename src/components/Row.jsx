import Tile from './Tile'

const WORD_LENGTH = 5

function Row({ guess = '', evaluation, wordsLeft, shake = false }) {
  const letters = guess.padEnd(WORD_LENGTH).split('')

  return (
    <div className={`row ${shake ? 'row--shake' : ''}`}>
      {letters.map((letter, i) => (
        <Tile
          key={i}
          letter={letter.trim()}
          status={evaluation ? evaluation[i] : undefined}
          position={i}
        />
      ))}
      {wordsLeft !== undefined && (
        <span className="row__count" title="Possible answers still matching your clues">
          {wordsLeft}
        </span>
      )}
    </div>
  )
}

export default Row
