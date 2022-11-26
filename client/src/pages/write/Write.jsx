import { useContext, useEffect, useState } from "react";
import "./write.css";
import axios from "axios";
import { Context } from "../../context/Context";
import QuillEditor from "../../components/quillEditor/QuillEditor";
import { Select } from "baseui/select";
import { toaster } from 'baseui/toast';
import qs from "qs"

export default function Write({cats,allTags,onNotifAction}) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState([])
  const [tags,setTags] = useState([])
  const { user } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      username: user.username,
      title,
      desc,
      categories: cat != [] ? cat[0].label : "Blogs",
      postTags:tags.map((tag)=>tag.label)
    };
    if (file) {
      const data =new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;
      try {
        await axios.post("/upload", data);
      } catch (err) {
        toaster.info(err.response.data)
      }
    }
    try {
      const res = await axios.post("/posts", newPost);

      // sending notifications 
      let targetUsersForNotify = await axios.get("/users", {
        params: {
          tags:tags
        },
        paramsSerializer: params => {
          return qs.stringify(params)
        }
      })

      // removing the current user 
      targetUsersForNotify = targetUsersForNotify.data;
      targetUsersForNotify = targetUsersForNotify.filter((targetUser) => user._id != targetUser._id)
      targetUsersForNotify = targetUsersForNotify.map((tUser)=>tUser._id)
      
      const msg = {
        id: res.data._id,
        text: "Added new post",
        recipients: targetUsersForNotify,
        url:`/post/${res.data._id}`
      }

      try {
        onNotifAction({
        type: "CREATE_NOTIFY",
        payload: {
          user,
          msg
        }
      })
      }
      catch (err) {
        toaster.info("Something went wrong")
      }
      
      // window.location.replace("/post/" + res.data._id);
    } catch (err) {
      if(err.response.status==413)
        toaster.info("Content is too large")
      else
        toaster.info("Something Went Wrong")
    }
  };
  return (
    <div className="write">
      {file && (
        <img className="writeImg" src={URL.createObjectURL(file)} alt="" />
      )}
      <div className="editorContainer">
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className="writeIcon fas fa-plus"></i>
          </label>
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
          />
          <input
            type="text"
            placeholder="Title"
            className="writeInput"
            autoFocus={true}
            onChange={e=>setTitle(e.target.value)}
          />
        </div>
        <div className="categoryTagsSelectContainer">
          <div className="categorySelect">
            <Select
            options={cats}
            value={cat}
          placeholder="Select Post Category"
          onChange={params => setCat(params.value)}
          />
          </div>
          <div className="tagSelect">
            <Select
            options={allTags}
            value={tags}
            multi
            placeholder="Select tags"
            onChange={({value}) => setTags(value)}
        />
          </div>
        </div>

        <div>
          <QuillEditor desc={desc} setDesc={setDesc} onSubmit={handleSubmit}
            buttonText="Publish"
          />
        </div>
      </div>
    </div>
  );
}
