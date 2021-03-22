import Jimp from "jimp"

const scaleFactor = 8

// Export the canvas to a PNG buffer
export const exportToPNGBuffer = (width, height) => {
  return new Promise(async (resolve, reject) => {
    const cells = document.querySelectorAll(".canvasCell")
    try {
      const image = await new Jimp(width * scaleFactor, height * scaleFactor)

      // Iterate over canvas cells
      for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
          const index = i * width + j
          const cell = cells[index]
          const color = Jimp.cssColorToHex(cell.style.backgroundColor)

          // Color neighborhood of `scaleFactor`
          const startRow = i * scaleFactor
          const startCol = j * scaleFactor
          for (let m = 0; m < scaleFactor; m++) {
            for (let n = 0; n < scaleFactor; n++) {
              image.setPixelColor(color, startCol + n, startRow + m)
            }
          }
        }
      }

      // Create dummy url for downloading
      const buffer = await image.getBufferAsync(Jimp.MIME_PNG)
      resolve(buffer)
    } catch (err) {
      console.error("Could not export canvas")
      reject(err)
    }
  })
}

// Export the canvas to a PNG and download it
export const exportToPNG = async (width, height) => {
  const buffer = await exportToPNGBuffer(width, height)
  const url = window.URL.createObjectURL(new Blob([buffer]))
  const link = document.createElement("a")
  link.href = url
  link.setAttribute("download", "pausch-bridge.png")
  document.body.appendChild(link)
  link.click()
}

// Export the canvas to a PNG to a form-data serializable format
export const exportToPNGNetwork = async (width, height) => {
  const buffer = await exportToPNGBuffer(width, height);
  const file = new File(buffer, "canvas.png");
  return file;
}