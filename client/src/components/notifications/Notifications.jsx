import "./Notifications.css"
import { useState } from "react"
import { StatefulPopover } from "baseui/popover";


const Notifications = ({ notifications }) => {
    const [isOpen,setIsOpen] = useState(false)
    const cls = isOpen ? "fa-light" : "fa-solid"
    return (
        <StatefulPopover
      content={() => (
        <div padding={"20px"} className="popoverContainer">
          <p>Notification 1</p>
          <p>Notification 1</p>
          <p>Notification 1</p>
        </div>
      )}
      returnFocus
      autoFocus
    >
            <i className={`${cls} fa-bell`}></i>
    </StatefulPopover>
    )
}

export default Notifications;