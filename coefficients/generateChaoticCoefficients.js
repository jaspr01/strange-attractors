const fs = require('fs')

// Function to generate random coefficients
const generateRandomCoefficients = () => {
  return Array.from(
    { length: 12 },
    () => Math.round((Math.random() * 2.4 - 1.2) * 10) / 10
  ) // Range: -1.2 to 1.2)
}

const isDesiredLyapunov = (data) => {
  const n = data.length
  const delta = 1e-5 // Small perturbation
  let sumLog = 0

  for (let i = 0; i < n - 1; i++) {
    const x = data[i]
    const xNext = data[i + 1]

    sumLog += Math.log(Math.abs((xNext - x) / delta))
  }

  const lyapunov = sumLog / (n - 1)
  return lyapunov > 0
}

const numIterations = 10000
const numAttempts = 100000
const chaoticCoefficients = []

for (let i = 0; i < numAttempts; i++) {
  const coefficients = generateRandomCoefficients()
  if (isDesiredLyapunov(coefficients)) {
    chaoticCoefficients.push(coefficients)
    if (chaoticCoefficients.length >= numIterations) {
      break
    }
  }
}

// Save coefficients meeting both criteria to a file
const data = JSON.stringify(chaoticCoefficients, null, 2)
fs.writeFile('chaotic_coefficients.json', data, (err) => {
  if (err) {
    console.error('Error writing file:', err)
    return
  }
  console.log(
    'Coefficients meeting both criteria saved to chaotic_coefficients.json'
  )
})
