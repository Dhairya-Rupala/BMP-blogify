import './profile.css';
import { useContext, useState } from "react";
import { Context } from "../../context/Context";
import axios from "axios";
import { Input } from "baseui/input";
import { Button, SIZE } from "baseui/button";
import {toaster, ToasterContainer,PLACEMENT} from 'baseui/toast';

const Profile = () => {
  // fetching the user and the dispatch from the context 
    const { user, dispatch } = useContext(Context);
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState(user.username);
    const [email, setEmail] = useState(user.email);
    const [batch, setBatch] = useState('')
    const [isBatchNum,setIsBatchNum] = useState(true)
    const [password, setPassword] = useState("");
    const batchPlaceHolder = "Please Enter your batch";
    const [success, setSuccess] = useState(false);

  // local multer path
    const PF = "http://localhost:5000/images/"

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({ type: "UPDATE_START" });
    const updatedUser = {
      userId: user._id,
      username,
      email,
        password,
      batch,
        };
        
        if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      updatedUser.profilePic = filename;
      try {
        await axios.post("/upload", data);
      } catch (err) {}
    }
      try {
      const res = await axios.put("/users/" + user._id, updatedUser);
      setSuccess(true);
          dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
          setToastKey(toaster.info('Profile Updated Successfully'));
    } catch (err) {
          dispatch({ type: "UPDATE_FAILURE" });
          setToastKey(toaster.info('Something went wrong,please check the details'));
    }
    }
    
    return (
        <>
            <ToasterContainer 
                autoHideDuration={1500}
             />
        <div className="container">
            <span className="containerTitle">My Profile</span>
            <div className="profileContainer">
            <div className="profileImageContainer">
                <img
              src={file ? URL.createObjectURL(file) : (user.profilePic?PF+user.profilePic:PF+'DAIICT_LOGO.png')}
                        alt=""
                        className="profilePicture"
                    />
                    <div className="profilePictureInput">
                        <span className='profilePictureTitle'>Upload Profile Picture</span>
                        <input
              type="file"
              id="fileInput"
              onChange={(e) => setFile(e.target.files[0])}
            />
                    </div>
                    
            </div>
            <div className="fieldContainer">
                <div className="fieldLabel">Username</div>
                <Input
                    value={username}
                    onChange={e=>setUsername(e.target.value)}
                />
            </div>
            <div className="fieldContainer">
                <div className="fieldLabel">Email</div>
                <Input
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    readOnly
                />
            </div>
            <div className="fieldContainer">
                <div className="fieldLabel">Batch</div>
                    <Input
                        placeholder={isBatchNum?'Please Enter Batch year':'Please Enter valid batch year'}
                    value={batch}
                        onChange={e => {
                            if (isNaN(e.target.value)) {
                            setBatch('');
                            setIsBatchNum(false)
                            }
                            else {
                                const year = new Date().getFullYear();
                                if (+e.target.value <= year)
                                    setBatch(+e.target.value)
                                else {
                                    setIsBatchNum(false)
                                    setBatch('');
                                }
                            }
                    }}
                />
            </div>
            <div className="fieldContainer">
                <div className="fieldLabel">Password</div>
                <Input
                    value={password}
                    type="password"
                    placeholder='Enter new password'
                    onChange={e => setPassword(e.target.value)}
                />
                </div>
                <div className="buttonContainer">
                    <Button size={SIZE.compact}
                        onClick={e=>handleSubmit(e)}
                    >Update</Button>
                </div>
        </div>
            </div>
             </>
        
    )
    
};

export default Profile;