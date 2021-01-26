import React, { useEffect, useState } from "react"
import { Table } from "semantic-ui-react"

const Cell = (props) => {
    
    return (<Table.Cell
        style={props.style}
        id={props.id}
        className={props.className}
        onMouseEnter={props.onMouseEnter}
        onMouseDown={props.onMouseDown}
        onMouseUp={props.onMouseUp}
    ></Table.Cell>)
}

export default Cell;