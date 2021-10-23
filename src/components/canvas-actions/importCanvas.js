import Jimp from "jimp"
import { clearCanvas } from "./utility"

const readFile = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onerror = () => {
      reader.abort()
      reject("Problem opening file")
    }
    reader.onload = () => {
      resolve(reader.result)
    }
    reader.readAsDataURL(file)
  })
}

export const importFromRemote = async (url, width, height) => {
  try {
    const image = await Jimp.read(url)

    image.resize(width, height)

    // Valid dimensions. Apply to canvas
    clearCanvas()
    const cells = document.querySelectorAll(".canvasCell")
    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        const color = image.getPixelColor(j, i)
        const { r, g, b, a } = Jimp.intToRGBA(color)
        const colorStr = a === 0 ? "" : `rgb(${r}, ${g}, ${b})`

        const index = i * width + j
        const cell = cells[index]
        cell.style.backgroundColor = colorStr
      }
    }
  } catch (err) {
    console.error("Failed to load remote image into canvas")
    throw err
  }
}

export const importFromPNG = async (file, width, height) => {
  try {
    const dataUrl = await readFile(file)
    importFromRemote(dataUrl, width, height)
  } catch (err) {
    console.error("Failed to load image into canvas")
    throw err
  }
}
