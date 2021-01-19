import { Button, Grid, Icon, Input, Popup, Segment } from "semantic-ui-react"
import React, { useEffect, useState } from "react"

// Controls for preview dynamics
const PreviewControl = (props) => {
  const {
    playMode,
    setPlayMode,
    playRate,
    setPlayRate,
  } = props
  const [inputRate, setInputRate] = useState(playRate)

  return (
    <Segment>
      <Grid>
        <Grid.Row centered>
          <Button
            icon
            color={playMode === "pause" ? "green" : null}
            onClick={() => setPlayMode("pause")}
          >
            <Icon name="pause" />
          </Button>
          <Button
            icon
            color={playMode === "play" ? "green" : null}
            onClick={() => setPlayMode("play")}
          >
            <Icon name="play" />
          </Button>
          <Button icon onClick={() => setPlayMode("reset")}>
            <Icon name="redo" />
          </Button>
        </Grid.Row>
        <Grid.Row centered>
          <Popup
            content="Play rate in duration per frame"
            trigger={
              <Input
                placeholder="Rate"
                style={{
                  width: "5em",
                }}
                content={playRate}
                onChange={(event) => setInputRate(event.target.value)}
              />
            }
          />
          <Button
            icon
            style={{ marginLeft: "1em" }}
            onClick={() => {
              setPlayRate(inputRate)
              setPlayMode("reset")
            }}
          >
            <Icon name="paper plane" />
          </Button>
        </Grid.Row>
      </Grid>
    </Segment>
  )
}

export default PreviewControl
