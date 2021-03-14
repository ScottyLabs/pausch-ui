import Jimp from "jimp";

export const exportToPNG = async (width, height) => {
  const cells = document.querySelectorAll(".canvasCell");
  try {
    const image = await new Jimp(width, height);

    // Iterate over canvas cells
    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        const index = i * width + j;
        const cell = cells[index];
        const color = Jimp.cssColorToHex(cell.style.backgroundColor);
        image.setPixelColor(color, j, i);
      }
    }

    // Create dummy url for downloading
    const buffer = await image.getBufferAsync(Jimp.MIME_PNG);
    const url = window.URL.createObjectURL(new Blob([buffer]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "pausch-bridge.png");
    document.body.appendChild(link);
    link.click();
  } catch (err) {
    console.error("Could not export canvas");
    throw err;
  }
}