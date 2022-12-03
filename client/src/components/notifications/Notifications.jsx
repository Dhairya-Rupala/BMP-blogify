import "./Notifications.css";
import { useState } from "react";
import { StatefulPopover } from "baseui/popover";
import NotifItem from "./NotifItem";
const Notifications = ({ notifications, onNotifAction }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <StatefulPopover
      content={() => (
        <div padding={"20px"} className="popoverContainer">
          {notifications.length != 0 ? (
            notifications.map((notifItem, index) => (
              <NotifItem
                notif={notifItem}
                key={index}
                onNotifAction={onNotifAction}
              />
            ))
          ) : (
            <span>No notifications</span>
          )}
        </div>
      )}
    >
      <i className="fa-solid fa-bell" onClick={() => setIsOpen(!isOpen)}></i>
    </StatefulPopover>
  );
};

export default Notifications;
