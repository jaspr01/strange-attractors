// Canvas setup
const canvas = document.getElementById('attractorCanvas')
const ctx = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

function getRandomCoefficient() {
  return Math.round((Math.random() * 2 - 1) * 10) / 10 // Range: -1.2 to 1.2
}

const randomSprottAttractor = () => {
  /*
  const a = [
    getRandomCoefficient(),
    getRandomCoefficient(),
    getRandomCoefficient(),
    getRandomCoefficient(),
    getRandomCoefficient(),
    getRandomCoefficient(),
    getRandomCoefficient(),
    getRandomCoefficient(),
    getRandomCoefficient(),
    getRandomCoefficient(),
    getRandomCoefficient(),
    getRandomCoefficient()
  ]
  */

  const a1 = 1
  const a2 = 0
  const a3 = 0.9
  const a4 = 0.1
  const a5 = 1
  const a6 = -0.3
  const a7 = 0.7
  const a8 = -1
  const a9 = 0.5
  const a10 = 0.1
  const a11 = 0.8
  const a12 = 0.2

  console.log(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12)

  let x = 0.05
  let y = 0.05

  ctx.clearRect(0, 0, canvas.width, canvas.height) // Clear canvas

  ctx.fillStyle = 'black' // Set point color
  const iterations = 100000 // Number of iterations

  for (let i = 0; i < iterations; i++) {
    const xn1 = a1 + a2 * x + a3 * x * x + a4 * x * y + a5 * y + a6 * y * y
    const yn1 = a7 + a8 * x + a9 * x * x + a10 * x * y + a11 * y + a12 * y * y
    x = xn1
    y = yn1

    const px = canvas.width / 2 + x * 100 // Adjust scaling here
    const py = canvas.height / 2 + y * 100 // Adjust scaling here

    ctx.fillRect(px, py, 1, 1) // Draw a point
  }
}

randomSprottAttractor()
