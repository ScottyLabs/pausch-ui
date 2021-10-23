import { useSelector } from "react-redux"
import { Table } from "semantic-ui-react"

const SELECTED_COLOR = "rgba(255, 255, 255, 255)"

const baseCellStyle = {
  borderStyle: "solid",
  borderWidth: "1px",
  width: "10px",
  height: "30px",
  padding: 0,
}

const getCellStyle = (playRate) => {
  return {
    ...baseCellStyle,
    transition: `background-color ${playRate / 2}s ease-in-out`,
  }
}

const getSelectedCellStyle = (playRate) => {
  return {
    ...getCellStyle(playRate),
    backgroundColor: SELECTED_COLOR,
  }
}

const IndicatorCell = (props) => {
  const { row } = props
  const previewRow = useSelector((store) => store.previewRow)
  const playRate = useSelector((store) => store.playRate)

  const cellStyle = getCellStyle(playRate)
  const selectedCellStyle = getSelectedCellStyle(playRate)

  return (
    <Table.Cell
      className="indicator"
      style={previewRow === row ? selectedCellStyle : cellStyle}
    ></Table.Cell>
  )
}

export default IndicatorCell
