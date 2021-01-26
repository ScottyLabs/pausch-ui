import { Table } from "semantic-ui-react"
import React, { useEffect, useState } from "react"

// Styles
const tableStyle = {
  borderColor: "black",
  marginTop: 0,
}

const baseCellStyle = {
  borderColor: "black",
  width: "10px",
  height: "30px",
  padding: 0,
}
// const selectedCellStyle = {
//   borderColor: "red",
//   width: "10px",
//   height: "30px",
//   padding: 0,
// }


const Canvas = (props) => {
  const { width, height, isMouseDown, drawMode, color } = props
  const [startSquare, setStartSquare] = useState(null)
  // const [currIndex, setCurrIndex] = useState(null);
  // const [prevSquare, setPrevSquare] = useState(null);

  const rows = []
  const cells = []

  const toCoordinates = (index) => {
    let row = Math.floor(index / width);
    let col = index % width;
    return [row, col];
  }
  const toIndex = (row, col) => {
    let index = row * width + col
    return index;
  }

  const cleanBoard= () => {
    for (let i = 0; i < height*width; i++) {
      const cell = document.querySelector("#cell" + i)
      cell.style.borderColor = "black";
      cell.style.borderWidth = "1px";
    }
  }

  // TODO: optimize DOM tree traversal by making cell a separate React component
  // Color a cell
  const onMouseOver = (isMouseDown, index, drawMode, color) => {
    
    if (isMouseDown) {
      console.log(index);
      console.log(startSquare);
      const cell = document.querySelector("#cell" + index)
      if (drawMode === "paintbrush") {
        cell.style.backgroundColor = `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`
      } else if (drawMode === "selection") {
      } else {
        cell.style.backgroundColor = null
      }
    }
  }

  const onMouseDown = (index, drawMode, color) => {
    
    const cell = document.querySelector("#cell" + index)
    if (drawMode === "paintbrush") {
      cell.style.backgroundColor = `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`
    } else if (drawMode === "selection") {
      setStartSquare(toCoordinates(index));
    } else {
      cell.style.backgroundColor = null
    }
    
  }

  const isWithinSelection = (startSquare, currSquare, i, j) => {
    let res = startSquare != null && currSquare != null && (((i <= startSquare[0] && i >= currSquare[0]) || (i <= currSquare[0] && i >= startSquare[0])) && ((j <= startSquare[1] && j >= currSquare[1]) || (j <= currSquare[1] && j >= startSquare[1])))
    return res;
  }

  const onMouseUp = (index, drawMode) => {
    cleanBoard();
    if (drawMode === "selection") {
      let startSq = startSquare;
      let currSq = toCoordinates(index);
      console.log(startSq + " " + currSq)
      setStartSquare(null);
      for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
          // console.log(i + " " + j)
          if (isWithinSelection(startSq, currSq, i, j)) {
            console.log("true");
            const cell = document.querySelector("#cell" + toIndex(i, j))
            cell.style.borderColor = "blue";
            cell.style.borderWidth = "3px";
          } else {
            // const cell = document.querySelector("#cell" + toIndex(i, j))
            // cell.style.borderColor = "black";
          }
        }
      }
    }
    
  }

  
  
  // Populate cells
  for (let i = 0; i < height; i++) {
    const row = []
    for (let j = 0; j < width; j++) {
      const index = i * width + j
      const cell = (
        <Table.Cell
          style={baseCellStyle}
          className={`canvasCell row${i.toString()}`}
          id={"cell" + index}
          onMouseEnter={(event) => {
            onMouseOver(isMouseDown, index, drawMode, color)
          }}
          
          onMouseDown={(event) => {
            onMouseDown(index, drawMode, color)
          }}
          onMouseUp={(event) => {
            onMouseUp(index, drawMode);
          }}
        ></Table.Cell>
      )
      row.push(cell)
      cells.push(cell)
    }
    rows.push(<Table.Row key={i}>{row}</Table.Row>)
  }
  return (
    <Table celled style={tableStyle}>
      {rows}
    </Table>
  )
}

export default Canvas
