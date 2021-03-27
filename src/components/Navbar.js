import { Segment, Menu, Icon, Image } from "semantic-ui-react"
import { useState } from "react"
import pauschBridge from "../assets/pausch-bridge.png"

const Navbar = (props) => {
  const [activeItem, setActiveItem] = useState("canvas")

  return (
    <Segment inverted>
      <Menu inverted pointing secondary size="huge">
        <Menu.Item
          name="Canvas"
          onClick={() => setActiveItem("canvas")}
          style={{
            display: "flex",
            alignItems: "center",
            verticalAlign: "middle",
            padding: 0,
          }}
        >
          <Image
            src={pauschBridge}
            style={{ width: "64px", height: "64px" }}
          />
          <h3 style={{ margin: 0, marginLeft: "1em" }}>Illuminate Designer</h3>
        </Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item
            name="Canvas"
            active={activeItem === "canvas"}
            onClick={() => setActiveItem("canvas")}
          >
            <Icon name="paint brush" />
            Canvas
          </Menu.Item>
          <Menu.Item
            name="Gallery"
            active={activeItem === "gallery"}
            onClick={() => setActiveItem("gallery")}
          >
            <Icon name="file image outline" />
            Gallery
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    </Segment>
  )
}

export default Navbar
