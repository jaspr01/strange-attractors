const canvas = document.getElementById('attractorCanvas')

// General coefficients for the Sprott attractor
const a = [0, 0, 0, 0, 0, 0];
const b = [0, 0, 0, 0, 0, 0];

// HELPER FUNCTIONS

/**
 * Function that calculates the new X value
 *
 * @param x
 * @param y
 * @returns {number}
 */
const calculateX = (x, y) => {
    return (a[0] * x + a[1] * y + a[2]) * x + (a[3] * y + a[4]) * y + a[5];
}

/**
 * Function that calculates the new Y value
 *
 * @param x
 * @param y
 * @returns {number}
 */
const calculateY = (x, y) => {
    return (b[0] * x + b[1] * y + b[2]) * x + (b[3] * y + b[4]) * y + b[5];
}

/**
 * Function that calculates the hash code of a point
 *
 * @param x
 * @param y
 * @returns {number}
 */
const hashCode = (x, y) => {
    let str = Math.floor(x * 1e6) + " " + Math.floor(y * 1e6);
    let hash = 0;
    let chr;

    if (str.length === 0) return hash;

    for (let i = 0; i < str.length; i += 1) {
        chr = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash = hash & hash; // Convert to 32bit integer
    }

    return hash;
}

// ATTRACTOR FUNCTIONS

/**
 * Generates & returns the points to draw a Clifford attractor
 */
const getCliffordAttractorPoints = () => {
    const points = []

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

    for (let i = 0; i < 100000; i++) {
        const newX = Math.sin(a * y) + c * Math.cos(a * x)
        const newY = Math.sin(b * x) + d * Math.cos(b * y)

        x = newX
        y = newY

        points.push([x, y])
    }

    return points
}

/**
 * Generates & returns the points to draw a J.C. Sprott attractor
 */
const generateSprottAttractorPoints = () => {
    let i, approxPoint;
    let brk = 1;
    let bufferLength = 100;
    let numet = 100;
    let ilgis = 5000;

    const f = []

    while (brk === 1) {
        a[0] = 2 * Math.random() - 1;
        a[1] = 2 * Math.random() - 1;
        a[2] = 2 * Math.random() - 1;
        a[3] = 2 * Math.random() - 1;
        a[4] = 2 * Math.random() - 1;
        a[5] = 2 * Math.random() - 1;
        b[0] = 2 * Math.random() - 1;
        b[1] = 2 * Math.random() - 1;
        b[2] = 2 * Math.random() - 1;
        b[3] = 2 * Math.random() - 1;
        b[4] = 2 * Math.random() - 1;
        b[5] = 2 * Math.random() - 1;

        brk = 0;

        let g = [];
        let xn = 0;
        let yn = 0;
        let xs = a[5];
        let ys = b[5];

        for (i = 0; i < numet; i += 1) {
            xn = calculateX(xs, ys);
            yn = calculateY(xs, ys);
            approxPoint = hashCode(xn, yn);

            if (Math.sqrt(xn * xn + yn * yn) > 1000 || g.indexOf(approxPoint) != -1) {
                brk = 1;
                i = numet + 1;
                break;
            }

            g.push(approxPoint);

            if (g.length > bufferLength) g.splice(0, 1);

            xs = xn;
            ys = yn;
        }

        if (brk === 0) {
            for (i = 0; i < ilgis; i += 1) {
                xn = calculateX(xs, ys);
                yn = calculateY(xs, ys);
                approxPoint = hashCode(xn, yn);

                if (Math.sqrt(xn * xn + yn * yn) > 1000 || g.indexOf(approxPoint) != -1) {
                    brk = 1;
                    i = ilgis + 1;
                    break;
                }

                g.push(approxPoint);

                if (g.length > bufferLength) g.splice(0, 1);

                f.push([xn, yn]);

                xs = xn;
                ys = yn;
            }
        }
    }

    let sers = [];
    let cutlen = Math.floor(f.length / 5.0);

    for (i = 0; i < 5; i += 1) {
        sers[i] = f.slice(i * cutlen, (i + 1) * cutlen);
    }

    return sers.reduce((a, b) => a.concat(b), [])
}

/**
 * Generates & returns the points to draw a Peter De Jong attractor
 */
const getPeterDeJongAttractorPoints = () => {
    const points = []

    const a = Math.random() * 4 - 2
    const b = Math.random() * 4 - 2
    const c = Math.random() * 4 - 2
    const d = Math.random() * 4 - 2

    let x = 0
    let y = 0

    for (let i = 0; i < 100000; i++) {
        const newX = Math.sin(a * y) - Math.cos(b * x)
        const newY = Math.sin(c * x) - Math.cos(d * y)

        x = newX
        y = newY

        points.push([x, y])
    }

    return points
}

// Run on spacebar press
window.addEventListener('keydown', (event) => {
    const canvasContext = canvas.getContext('2d')

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    if (event.code === 'Space') {
        event.preventDefault()

        let points = []

        canvasContext.clearRect(0, 0, canvas.width, canvas.height)

        // Get the selected attractor function
        const attractorFunction = document.getElementById('attractorFunction').value

        switch (attractorFunction) {
            case 'clifford':
                points = getCliffordAttractorPoints()
                break

            case 'de-jong':
                points = getPeterDeJongAttractorPoints()
                break

            case 'sprott':
                points = generateSprottAttractorPoints()
                break
        }

        points.forEach(point => {
            const pixelX = canvas.width / 2 + point[0] * 200
            const pixelY = canvas.height / 2 + point[1] * 200

            canvasContext.fillRect(pixelX, pixelY, 1, 1)
        })
    }
})

// Save image on save button click
document.getElementById('save').addEventListener('click', () => {
    // Get the selected attractor function
    const attractorFunction = document.getElementById('attractorFunction').value

    // Get the image data in base64 format
    const imageDataURL = canvas.toDataURL('image/png')

    // Create a link element to download the image
    const downloadLink = document.createElement('a')

    downloadLink.href = imageDataURL
    downloadLink.download = `${attractorFunction}-strange-attractor_${new Date().toISOString()}.png`
    downloadLink.click()
})
