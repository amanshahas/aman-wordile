import Row from './Row'

function GameBoard({ pastGuesses, evaluations, currentGuess, wordsLeft, maxGuesses, shake }) {
  const rows = []

  pastGuesses.forEach((guess, i) => {
    rows.push(
      <Row key={i} guess={guess} evaluation={evaluations[i]} wordsLeft={wordsLeft[i]} />
    )
  })

  if (rows.length < maxGuesses) {
    rows.push(<Row key="current" guess={currentGuess} shake={shake} />)
  }

  while (rows.length < maxGuesses) {
    rows.push(<Row key={`empty-${rows.length}`} />)
  }

  return <div className="board">{rows}</div>
}

export default GameBoard
