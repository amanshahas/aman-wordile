const LAYOUT = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACKSPACE'],
]

function Keyboard({ keyStatuses, onKey, disabled }) {
  return (
    <div className="keyboard">
      {LAYOUT.map((row, r) => (
        <div className="keyboard__row" key={r}>
          {row.map((key) => {
            const isWide = key === 'ENTER' || key === 'BACKSPACE'
            const status = keyStatuses[key]
            const classes = ['key']
            if (isWide) classes.push('key--wide')
            if (status) classes.push(`key--${status}`)

            return (
              <button
                key={key}
                type="button"
                className={classes.join(' ')}
                onClick={() => onKey(key)}
                disabled={disabled}
                aria-label={key === 'BACKSPACE' ? 'Backspace' : key}
              >
                {key === 'BACKSPACE' ? '⌫' : key}
              </button>
            )
          })}
        </div>
      ))}
    </div>
  )
}

export default Keyboard
