import "./NotifItem.css"
import { useEffect, useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"

const NotifItem = ({ notif,onNotifAction }) => {
    const [sender, setSender] = useState()
     const PF = "http://localhost:5000/images/"
    useEffect(() => {
        const fetchUser = async (userId) => {
            try {
                const user = await axios.get(`http://localhost:5000/api/users/${userId}`)
                setSender(user.data)
            }
            catch (err) {
                console.log(err)
            }
        }
        fetchUser(notif.user)
    },[])
    return (
        
        <div className="notif-container">
            <Link to={notif.url} className="notif-wrapper">
                <div className="notif-content-wrapper">
                    <div className="notif-logo-container"><img src={ sender?.profilePic?PF+sender?.profilePic:PF+"DAIICT_LOGO.png" } alt="" className="notif-logo"/></div>
            <div className="notif-content">
                <span><b>{sender?.username} </b></span>
                <span>{notif.text}</span>
            </div>
            </div>
             </Link>
                <i
                    onClick={(e) => {
                        onNotifAction({
                            type: "DELETE_NOTIFY",
                            payload:notif._id
                        })
                }}
                className="fa-regular fa-circle-xmark"
                aria-hidden="true"
              ></i>
        </div>
       
    )
}

export default NotifItem;