import Jimp from "jimp"
import { clearCanvas } from "./utility"
const scaleFactor = 8

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

export const importFromPNG = async (file, width, height) => {
  try {
    const dataUrl = await readFile(file)
    const image = await Jimp.read(dataUrl)

    const inputHeight = image.bitmap.height
    const inputWidth = image.bitmap.width
    const expectedHeight = height * scaleFactor
    const expectedWidth = width * scaleFactor

    if (inputWidth != expectedWidth || inputHeight != expectedHeight) {
      // Invalid dimensions
      console.error("Invalid input image dimensions")
      console.error(`Expected ${expectedWidth} x ${expectedHeight}`)
      console.error(`Encountered ${inputWidth}x${inputHeight}`)
      throw "Invalid input image dimensions";
    } else {
      // Valid dimensions. Apply to canvas
      clearCanvas();
      const cells = document.querySelectorAll(".canvasCell");
      for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
          const color = image.getPixelColor(j * scaleFactor, i * scaleFactor);
          const { r, g, b, a } = Jimp.intToRGBA(color);
          const colorStr = a == 0 ? "" : `rgb(${r}, ${g}, ${b})`;

          const index = i * width + j;
          const cell = cells[index];
          cell.style.backgroundColor = colorStr;
        }
      }
    }
  } catch (err) {
    console.error("Failed to load PNG into canvas")
    throw err
  }
}
