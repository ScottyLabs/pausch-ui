import { Button, Container, Grid, Icon, Segment } from "semantic-ui-react"

const clearCanvas = () => {
  const cells = document.querySelectorAll(".canvasCell")
  if (cells) {
    cells.forEach((cell) => {
      cell.style.backgroundColor = null
    })
  }
}

const BrushPanel = (props) => {
  const { drawMode, setDrawMode } = props

  return (
    <Segment>
      <Grid>
        <Grid.Row centered>
          <Button
            icon
            color={drawMode == "paintbrush" ? "green" : null}
            onClick={() => setDrawMode("paintbrush")}
          >
            <Icon name="paint brush" />
          </Button>
        </Grid.Row>
        <Grid.Row centered>
          <Button
            icon
            color={drawMode == "eraser" ? "green" : null}
            onClick={() => setDrawMode("eraser")}
          >
            <Icon name="eraser" />
          </Button>
        </Grid.Row>
        <Grid.Row centered>
          <Button icon onClick={clearCanvas}>
            <Icon name="trash alternate outline" />
          </Button>
        </Grid.Row>
      </Grid>
    </Segment>
  )
}

export default BrushPanel
