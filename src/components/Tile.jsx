function Tile({ letter = '', status, position = 0 }) {
  const classes = ['tile']
  if (status) classes.push('tile--revealed', `tile--${status}`)
  else if (letter) classes.push('tile--filled')

  return (
    <div
      className={classes.join(' ')}
      style={status ? { animationDelay: `${position * 0.25}s` } : undefined}
    >
      {letter}
    </div>
  )
}

export default Tile
