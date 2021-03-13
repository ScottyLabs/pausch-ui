import { Button, Grid, Icon, Input, Popup, Segment } from "semantic-ui-react"
import React, { useEffect, useState } from "react"
import * as actions from "../actions"
import { useSelector, useDispatch, connect } from "react-redux"

// Controls for preview dynamics
const PreviewControl = (props) => {
  const dispatch = useDispatch()
  const playMode = useSelector((store) => store.playMode)
  const playRate = useSelector((store) => store.playRate)
  const [inputRate, setInputRate] = useState(playRate)

  return (
    <Segment>
      <Grid>
        <Grid.Row centered>
          <Button
            icon
            color={playMode === "pause" ? "green" : null}
            onClick={() => dispatch(actions.preview.setPlayMode("pause"))}
          >
            <Icon name="pause" />
          </Button>
          <Button
            icon
            color={playMode === "play" ? "green" : null}
            onClick={() => dispatch(actions.preview.setPlayMode("play"))}
          >
            <Icon name="play" />
          </Button>
          <Button
            icon
            onClick={() => dispatch(actions.preview.setPlayMode("reset"))}
          >
            <Icon name="redo" />
          </Button>
        </Grid.Row>
        <Grid.Row centered>
          <Popup
            content="Play rate in seconds per frame"
            trigger={
              <Input
                placeholder="Rate"
                style={{
                  width: "5em",
                }}
                value={playRate}
                onChange={(event) => setInputRate(event.target.value)}
              />
            }
          />
          <Button
            icon
            style={{ marginLeft: "1em" }}
            onClick={() => {
              dispatch(actions.preview.setPlayRate(inputRate));
              dispatch(actions.preview.setPlayMode("reset"));
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
