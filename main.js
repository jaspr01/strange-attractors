// Get the canvas & context
const canvas = document.getElementById('attractorCanvas')
const canvasContext = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

const attractorFunction = 'de-jong'

/**
 * Generates a clifford attractor
 */
const cliffordAttractor = () => {
  // These parameters affect the rotation and scaling of the attractor.
  // Changing these values alters the overall shape and complexity of the attractor.
  // Higher values can often result in more complex and chaotic patterns.
  const a = Math.random() * 6 - 3
  const b = Math.random() * 6 - 3

  // These parameters affect the symmetry and orientation of the attractor.
  // Modifying these values can shift, rotate, or mirror the attractor's structure.
  const c = Math.random() * 6 - 3
  const d = Math.random() * 6 - 3

  let x = 0
  let y = 0

  canvasContext.clearRect(0, 0, canvas.width, canvas.height)

  for (let i = 0; i < 100000; i++) {
    const newX = Math.sin(a * y) + c * Math.cos(a * x)
    const newY = Math.sin(b * x) + d * Math.cos(b * y)

    x = newX
    y = newY

    const pixelX = canvas.width / 2 + x * 200
    const pixelY = canvas.height / 2 + y * 200

    canvasContext.fillRect(pixelX, pixelY, 1, 1)
  }
}

/**
 * Generates a Peter De Jong attractor
 */
const peterDeJongAttractor = () => {
  const a = Math.random() * 4 - 2
  const b = Math.random() * 4 - 2
  const c = Math.random() * 4 - 2
  const d = Math.random() * 4 - 2

  let x = 0
  let y = 0

  canvasContext.clearRect(0, 0, canvas.width, canvas.height)

  for (let i = 0; i < 100000; i++) {
    const newX = Math.sin(a * y) - Math.cos(b * x)
    const newY = Math.sin(c * x) - Math.cos(d * y)

    x = newX
    y = newY

    const pixelX = canvas.width / 2 + x * 200
    const pixelY = canvas.height / 2 + y * 200

    canvasContext.fillRect(pixelX, pixelY, 1, 1)
  }
}

// Run on spacebar press
window.addEventListener('keydown', (event) => {
  if (event.code === 'Space') {
    event.preventDefault()

    switch (attractorFunction) {
      case 'clifford':
        cliffordAttractor()
        break

      case 'de-jong':
        peterDeJongAttractor()
        break
    }
  }
})

// Save image on save button click
document.getElementById('save').addEventListener('click', () => {
  // Get the image data in base64 format
  const imageDataURL = canvas.toDataURL('image/png')

  // Create a link element to download the image
  const downloadLink = document.createElement('a')
  downloadLink.href = imageDataURL
  downloadLink.download = `${attractorFunction}-strange-attractor_${new Date().toISOString()}.png`
  downloadLink.click()
})
