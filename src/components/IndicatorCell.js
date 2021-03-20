import { useSelector } from "react-redux"
import { Table } from "semantic-ui-react"

const baseCellStyle = {
  borderStyle: "solid",
  borderWidth: "1px",
  borderColor: "white white white white",
  width: "10px",
  height: "30px",
  padding: 0,
  backgroundColor: "white",
}

const getCellStyle = (playRate) => {
  return {
    ...baseCellStyle,
    transition: `background-color ${playRate / 2}s ease-in-out`
  }
}

const getSelectedCellStyle = (playRate) => {
  return {
    ...getCellStyle(playRate),
    backgroundColor: "black"
  }
}

const IndicatorCell = (props) => {
  const { row } = props
  const previewRow = useSelector((store) => store.previewRow)
  const playRate = useSelector(store => store.playRate)

  const cellStyle = getCellStyle(playRate)
  const selectedCellStyle = getSelectedCellStyle(playRate)
  return (
    <Table.Cell
      style={previewRow == row ? selectedCellStyle : cellStyle}
    ></Table.Cell>
  )
}

export default IndicatorCell
