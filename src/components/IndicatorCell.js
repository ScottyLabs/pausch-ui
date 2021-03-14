import { useSelector } from "react-redux"
import { Table } from "semantic-ui-react"

const cellStyle = {
  borderStyle: "solid",
  borderWidth: "1px",
  borderColor: "white white white white",
  width: "10px",
  height: "30px",
  padding: 0,
  backgroundColor: "white",
  transition: "background-color 0.5s linear"
}

const selectedCellStyle = {
  ...cellStyle,
  backgroundColor: "black"
}

const IndicatorCell = (props) => {
  const { row } = props
  const previewRow = useSelector((store) => store.previewRow)
  return (
    <Table.Cell
      style={previewRow == row ? selectedCellStyle : cellStyle}
    ></Table.Cell>
  )
}

export default IndicatorCell
