import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './quillEditor.css'
import { Button } from "baseui/button";

const modules = {
  toolbar: [
    [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
    [{size: []}],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{'list': 'ordered'}, {'list': 'bullet'}, 
     {'indent': '-1'}, {'indent': '+1'}],
    ['link', 'image', 'video'],
    ['clean']
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  }
}

const formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image', 'video'
]




const QuillEditor = ({desc,setDesc,onSubmit}) => {
    return (
        <div className="quillContainer">
            <ReactQuill
                className='editor'
             modules={modules}
                formats={formats}
                placeholder="Tell your story..."
                value={desc}
                onChange={setDesc}
            />
            <div>
                <Button onClick={onSubmit}>Publish</Button>
            </div>
             
        </div>
    )
}

export default QuillEditor;