import { Button, Grid, Icon, Input, Popup, Segment } from "semantic-ui-react"
import React, { useEffect, useState } from "react"

// Controls for preview dynamics
const PreviewControl = (props) => {
  const {
    playMode,
    setPlayMode,
    playRate,
    setPlayRate,
    playState,
    setPlayState,
    setRow,
  } = props
  const [inputRate, setInputRate] = useState(playRate)

  return (
    <Segment>
      <Grid>
        <Grid.Row centered>
          <Button
            icon
            color={!playMode ? "green" : null}
            onClick={() => setPlayMode(false)}
          >
            <Icon name="pause" />
          </Button>
          <Button
            icon
            color={playMode ? "green" : null}
            onClick={() => setPlayMode(true)}
          >
            <Icon name="play" />
          </Button>
          <Button
            icon
            onClick={() => {
              setRow(0)
              setPlayState(playState + 1)
            }}
          >
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
              setPlayState(playState + 1)
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
