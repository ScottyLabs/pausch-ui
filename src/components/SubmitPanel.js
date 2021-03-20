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
import { exportToPNGBuffer } from "./canvas-actions/exportCanvas"
import FormData from "form-data"
import axios from "axios"

const SUBMIT_URL = process.env.REACT_APP_BACKEND_URI + "/submit"

const submitDesign = async (width, height, title, author, playRate) => {
  const buffer = exportToPNGBuffer(width, height)
  const formData = new FormData()
  formData.append("image", buffer)
  formData.append("title", title)
  formData.append("author", author)
  formData.append("playRate", playRate)
  axios({
    method: "post",
    url: SUBMIT_URL,
    data: formData,
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
      <Grid style={{ padding: "5px" }}>
        <Grid.Row centered>
          <Input
            value={inputTitle}
            onChange={(e) => setInputTitle(e.target.value)}
            label={<Label content="Title" />}
            placeholder="Title of design"
          />
        </Grid.Row>
        <Grid.Row centered>
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
          />
        </Grid.Row>
      </Grid>
    </Segment>
  )
}

export default SubmitPanel
