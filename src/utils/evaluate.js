export const STATUS = {
  CORRECT: 'correct',
  PRESENT: 'present',
  ABSENT: 'absent',
}

// Two-pass check so repeated letters are handled correctly:
// exact matches claim their letters first, then the leftovers can be "present".
export function evaluateGuess(guess, solution) {
  const result = Array(guess.length).fill(STATUS.ABSENT)
  const remaining = {}

  for (let i = 0; i < solution.length; i++) {
    if (guess[i] === solution[i]) {
      result[i] = STATUS.CORRECT
    } else {
      remaining[solution[i]] = (remaining[solution[i]] || 0) + 1
    }
  }

  for (let i = 0; i < guess.length; i++) {
    if (result[i] === STATUS.CORRECT) continue
    const letter = guess[i]
    if (remaining[letter] > 0) {
      result[i] = STATUS.PRESENT
      remaining[letter]--
    }
  }

  return result
}

const RANK = { [STATUS.ABSENT]: 1, [STATUS.PRESENT]: 2, [STATUS.CORRECT]: 3 }

// Best-known status for each letter, used to colour the keyboard.
export function getKeyStatuses(guesses, evaluations) {
  const statuses = {}
  guesses.forEach((guess, row) => {
    guess.split('').forEach((letter, i) => {
      const next = evaluations[row][i]
      const current = statuses[letter]
      if (!current || RANK[next] > RANK[current]) {
        statuses[letter] = next
      }
    })
  })
  return statuses
}

// How many words from the list would still give exactly the same colours
// for every guess made so far.
export function countPossibleWords(words, guesses, evaluations) {
  const counts = []
  let pool = words
  guesses.forEach((guess, row) => {
    const pattern = evaluations[row].join()
    pool = pool.filter((word) => evaluateGuess(guess, word).join() === pattern)
    counts.push(pool.length)
  })
  return counts
}
