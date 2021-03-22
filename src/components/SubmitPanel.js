import axios from "axios"
import FormData from "form-data"
import React, { useState } from "react"
import { useSelector } from "react-redux"
import {
  Button,
  Confirm,
  Dimmer,
  Grid,
  Icon,
  Input,
  Label,
  Loader,
  Popup,
  Segment,
} from "semantic-ui-react"
import { exportToPNGNetwork } from "./canvas-actions/exportCanvas"

const SUBMIT_URL = process.env.REACT_APP_BACKEND_URL + "/submissions/new"

const submitDesign = async (width, height, title, author, playRate) => {
  const canvasData = await exportToPNGNetwork(width, height)
  const formData = new FormData()
  formData.append("img", canvasData)
  formData.append("title", title)
  formData.append("author", author)
  formData.append("email", "sample@email.com")
  formData.append("frame_rate", playRate)
  axios({
    method: "post",
    url: SUBMIT_URL,
    data: formData,
    headers: {
      "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
    },
  })
}

const SubmitPanel = (props) => {
  const width = useSelector((store) => store.width)
  const height = useSelector((store) => store.height)
  const playRate = useSelector((store) => store.playRate)
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false)
  const [inputTitle, setInputTitle] = useState("")
  const [inputAuthor, setInputAuthor] = useState("")

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
              submitDesign(width, height, inputTitle, inputAuthor, playRate)
            }}
          ></Confirm>
        </Grid.Row>
      </Grid>
    </Segment>
  )
}

export default SubmitPanel
