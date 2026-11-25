function GameOverModal({ status, solution, attempts, onPlayAgain }) {
  const won = status === 'WON'

  return (
    <div className="modal-backdrop">
      <div className="modal" role="dialog" aria-modal="true">
        <p className="modal__eyebrow">{won ? 'Solved' : 'Out of guesses'}</p>
        <h2 className="modal__title">
          {won ? `Got it in ${attempts}/6` : 'Better luck next time'}
        </h2>
        <p className="modal__label">The word was</p>
        <div className="modal__word">
          {solution.split('').map((letter, i) => (
            <span key={i} className={`modal__letter ${won ? 'is-won' : ''}`}>
              {letter}
            </span>
          ))}
        </div>
        <button type="button" className="modal__button" onClick={onPlayAgain}>
          Play again
        </button>
      </div>
    </div>
  )
}

export default GameOverModal
