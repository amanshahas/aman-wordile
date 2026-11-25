import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import GameBoard from './components/GameBoard'
import Keyboard from './components/Keyboard'
import GameOverModal from './components/GameOverModal'
import WORDS from './data/words'
import { evaluateGuess, getKeyStatuses, countPossibleWords } from './utils/evaluate'

const WORD_LENGTH = 5
const MAX_GUESSES = 6
const REVEAL_TIME = 1700 // ms, matches the tile flip timing in the CSS

function pickWord(exclude) {
  let word
  do {
    word = WORDS[Math.floor(Math.random() * WORDS.length)]
  } while (word === exclude)
  return word
}

function App() {
  const [solutionWord, setSolutionWord] = useState(() => pickWord())
  const [currentGuess, setCurrentGuess] = useState('')
  const [pastGuesses, setPastGuesses] = useState([])
  const [gameStatus, setGameStatus] = useState('IN_PROGRESS')

  const [isRevealing, setIsRevealing] = useState(false)
  const [shake, setShake] = useState(false)
  const timers = useRef([])

  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  const later = (fn, ms) => {
    timers.current.push(setTimeout(fn, ms))
  }

  const evaluations = useMemo(
    () => pastGuesses.map((guess) => evaluateGuess(guess, solutionWord)),
    [pastGuesses, solutionWord]
  )

  const wordsLeft = useMemo(
    () => countPossibleWords(WORDS, pastGuesses, evaluations),
    [pastGuesses, evaluations]
  )

  // Hold back the newest row's colours on the keyboard until its tiles have flipped.
  const keyStatuses = useMemo(() => {
    const settled = isRevealing ? pastGuesses.length - 1 : pastGuesses.length
    return getKeyStatuses(pastGuesses.slice(0, settled), evaluations.slice(0, settled))
  }, [pastGuesses, evaluations, isRevealing])

  const submitGuess = useCallback(() => {
    if (currentGuess.length < WORD_LENGTH) {
      setShake(true)
      later(() => setShake(false), 450)
      return
    }

    const guesses = [...pastGuesses, currentGuess]
    setPastGuesses(guesses)
    setCurrentGuess('')

    if (currentGuess === solutionWord) {
      setGameStatus('WON')
    } else if (guesses.length >= MAX_GUESSES) {
      setGameStatus('LOST')
    }

    setIsRevealing(true)
    later(() => setIsRevealing(false), REVEAL_TIME)
  }, [currentGuess, pastGuesses, solutionWord])

  const handleKey = useCallback(
    (key) => {
      if (gameStatus !== 'IN_PROGRESS' || isRevealing) return

      if (key === 'ENTER') {
        submitGuess()
      } else if (key === 'BACKSPACE') {
        setCurrentGuess((guess) => guess.slice(0, -1))
      } else if (/^[A-Z]$/.test(key)) {
        setCurrentGuess((guess) => (guess.length < WORD_LENGTH ? guess + key : guess))
      }
    },
    [gameStatus, isRevealing, submitGuess]
  )

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.ctrlKey || event.metaKey || event.altKey) return
      const key = event.key.toUpperCase()
      if (key === 'ENTER' || key === 'BACKSPACE' || /^[A-Z]$/.test(key)) {
        event.preventDefault()
        handleKey(key)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [handleKey])

  const playAgain = () => {
    timers.current.forEach(clearTimeout)
    timers.current = []
    setSolutionWord((prev) => pickWord(prev))
    setCurrentGuess('')
    setPastGuesses([])
    setGameStatus('IN_PROGRESS')
    setIsRevealing(false)
    setShake(false)
  }

  const isOver = gameStatus !== 'IN_PROGRESS'

  return (
    <div className="app">
      <header className="header">
        <h1 className="header__title">Wordile</h1>
        <p className="header__hint">
          The number beside each guess shows how many answers still fit your clues.
        </p>
      </header>

      <main className="main">
        <GameBoard
          pastGuesses={pastGuesses}
          evaluations={evaluations}
          currentGuess={currentGuess}
          wordsLeft={wordsLeft}
          maxGuesses={MAX_GUESSES}
          shake={shake}
        />
      </main>

      <Keyboard keyStatuses={keyStatuses} onKey={handleKey} disabled={isOver} />

      {isOver && !isRevealing && (
        <GameOverModal
          status={gameStatus}
          solution={solutionWord}
          attempts={pastGuesses.length}
          onPlayAgain={playAgain}
        />
      )}
    </div>
  )
}

export default App
