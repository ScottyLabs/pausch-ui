import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Input, Grid, Segment, Label, Popup } from "semantic-ui-react"
import * as actions from "../actions"

const labeledButtonStyle = {
  width: "5em",
}

const DashedLineOptions = () => {
  const dispatch = useDispatch()
  const dashedLineGap = useSelector((store) => store.dashedLineGap)
  const dashedLineSolid = useSelector((store) => store.dashedLineSolid)

  const [inputGap, setInputGap] = useState(dashedLineGap)
  const [inputSolid, setInputSolid] = useState(dashedLineSolid)

  return (
    <Grid style={{ padding: "5px", paddingLeft: "1em" }}>
      <Grid.Row>
        <Popup
          content="The number of empty cells in each gap before switching to a solid segment"
          mouseEnterDelay={250}
          on="hover"
          trigger={
            <Input
              value={inputGap}
              onChange={(e) => {
                setInputGap(e.target.value)
              }}
              label={<Label content="Dashed line gap" />}
              placeholder="2"
              type="number"
              onKeyUp={(e) => {
                if (inputGap !== "") {
                  const gap = parseInt(inputGap)
                  dispatch(actions.brush.setDashedLineGap(gap))
                }
                else {
                  dispatch(actions.brush.setDashedLineGap(2))
                }
              }}
              style={labeledButtonStyle}
            />
          }
        />
      </Grid.Row>
      <Grid.Row>
        <Popup
          content="The number of solid cells to draw in each segment before switching to a gap"
          mouseEnterDelay={250}
          on="hover"
          trigger={
            <Input
              value={inputSolid}
              onChange={(e) => setInputSolid(e.target.value)}
              label={<Label content="Dashed line solid length" />}
              placeholder="2"
              type="number"
              onKeyUp={(e) => {
                if (inputSolid !== "") {
                  const solid = parseInt(inputSolid)
                  dispatch(actions.brush.setDashedLineSolid(solid))
                }
                else {
                  dispatch(actions.brush.setDashedLineSolid(2))
                }
              }}
              style={labeledButtonStyle}
            />
          }
        />
      </Grid.Row>
    </Grid>
  )
}

const DiamondOptions = () => {
  const dispatch = useDispatch()
  const diamondRadius = useSelector((store) => store.diamondRadius)
  const [inputRadius, setInputRadius] = useState(diamondRadius)
  return (
    <Grid style={{ padding: "5px", paddingLeft: "1em" }}>
      <Grid.Row>
        <Popup
          content="The number of cells extended away from the center in the four cardinal directions"
          mouseEnterDelay={250}
          on="hover"
          trigger={
            <Input
              value={inputRadius}
              onChange={(e) => setInputRadius(e.target.value)}
              label={<Label content="Diamond radius" />}
              placeholder="5"
              type = "number"
              onKeyUp={(e) => {
                if (inputRadius !== "") {
                  const radius = parseInt(inputRadius)
                  dispatch(actions.brush.setDiamondRadius(radius))
                }
                else {
                  dispatch(actions.brush.setDiamondRadius(5))
                }
              }}
              style={labeledButtonStyle}
            />
          }
        />
      </Grid.Row>
    </Grid>
  )
}

const OptionPanel = (props) => {
  const drawMode = useSelector((store) => store.drawMode)
  const optionModes = ["dashed-line", "diamond"]
  return optionModes.includes(drawMode) ? (
    <Segment>
      {drawMode === "dashed-line" ? <DashedLineOptions /> : null}
      {drawMode === "diamond" ? <DiamondOptions /> : null}
    </Segment>
  ) : null
}

export default OptionPanel
