import axios from "axios"
import React, { useState } from "react"
import { useSelector } from "react-redux"
import {
  Button,
  Confirm,
  Grid,
  Icon,
  Input,
  Label,
  Popup,
  Segment,
} from "semantic-ui-react"
import { exportToPNGNetwork } from "./canvas-actions/exportCanvas"
import { whoAmI } from "../utils/authUtils";
import { useLocation } from "react-router-dom";

const SUBMIT_URL = process.env.REACT_APP_BACKEND_URL + "/submissions/new"

const submitDesign = async (width, height, title, author, email, playRate) => {
  const canvasData = await exportToPNGNetwork(width, height)
  axios({
    method: "post",
    url: SUBMIT_URL,
    data: { img: canvasData, title, author, email, frame_rate: playRate},
  })
}

const SubmitPanel = (props) => {
  const location = useLocation();
  const user = whoAmI(location);
  const width = useSelector((store) => store.width)
  const height = useSelector((store) => store.height)
  const playRate = useSelector((store) => store.playRate)

  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false)
  const [showSignIn, setShowSignIn] = useState(false)

  const [inputTitle, setInputTitle] = useState("")
  const [inputAuthor, setInputAuthor] = useState(user ? user.name : "")

  return (
    <Segment>
      <Grid style={{ padding: "5px", paddingLeft: "1em" }}>
        <Grid.Row>
          <Input
            value={inputTitle}
            onChange={(e) => setInputTitle(e.target.value)}
            label={<Label content="Title" />}
            placeholder="Title of design"
          />
        </Grid.Row>
        <Grid.Row>
          <Input
            value={inputAuthor}
            onChange={(e) => setInputAuthor(e.target.value)}
            label={<Label content="Author" />}
            placeholder="Author"
          />
        </Grid.Row>
        <Grid.Row centered>
          <Popup
            content="Submit design to gallery"
            mouseEnterDelay={250}
            on="hover"
            trigger={
              <Button
                style={{ width: "100%" }}
                icon
                labelPosition="left"
                onClick={() => setShowSubmitConfirm(true)}
              >
                <Icon name="paper plane" />
                Submit
              </Button>
            }
          />
          <Confirm
            content="This will submit your design to the bridge design gallery. Are you sure?"
            open={showSubmitConfirm}
            onCancel={() => setShowSubmitConfirm(false)}
            onConfirm={() => {
              setShowSubmitConfirm(false)
              if (!user) {
                setShowSignIn(true)
              } else {
                submitDesign(width, height, inputTitle, inputAuthor, user.email, playRate)
              }
            }}
          ></Confirm>
          <Confirm
            content="Please sign in first!"
            open={showSignIn}
            onCancel={() => setShowSignIn(false)}
            onConfirm={() => {
              setShowSignIn(false)
            }}
          ></Confirm>
        </Grid.Row>
      </Grid>
    </Segment>
  )
}

export default SubmitPanel
