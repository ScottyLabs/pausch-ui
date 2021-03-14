import { Table, TableBody } from "semantic-ui-react"
import IndicatorCell from "./IndicatorCell"

const ProgressIndicator = (props) => {
  const { height } = props

  const indicatorRows = []
  for (let i = 0; i < height; i++) {
    indicatorRows.push(
      <Table.Row key={i}>
        <IndicatorCell row={i} key={i}></IndicatorCell>
      </Table.Row>
    )
  }

  return (
    <Table celled style={{ marginTop: 0 }}>
      <TableBody>{indicatorRows}</TableBody>
    </Table>
  )
}

export default ProgressIndicator;