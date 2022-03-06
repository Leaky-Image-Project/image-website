// I watched this tutorial to create the source code of this File Upload Screen: https://www.youtube.com/watch?v=0TTa5Ulmgds&ab_channel=ArjunYonjan%2FCodeTravel


import { React, useState, useContext, useRef, useEffect } from 'react';
import axios from 'axios';
import AuCon from "./AuProv";

const UPLOAD_URL = 'http://localhost:3030/image/upload';

// class FileUpload extends Component {
//     state = {file:null}

//     handleFile(e){
//         let file = this.state.file
//         let formdata = new FormData()
//         formdata.append('image', file)
//         formdata.append('name', 'appended')
//     }

//     handleUpload(e){
//         axios.post(UPLOAD_URL, JSON.stringify({File}))
//     }

//     render () {
//         return (
//             <div className="App">
//                 <h1>Congratulations, You Are Logged In!</h1>

//                 <form>
//                     <label>Please Upload Image Here</label>
//                     <div>
//                         <input  type='file' onChange={(e) => this.handleFile(e)}/>
//                     </div>
//                     <button onClick={(e)=>this.handleUpload(e)}>Upload File</button>
//                 </form>
//             </div>
//         );
//     }

// }

// export default FileUpload;


const FileUpload = () => {

    const { setAuth } = useContext(AuCon); 
    const errorRef = useRef();

    const [fileName, setFileName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        setErrorMessage('');
    }, [fileName])

    const Upload = async (e) => {

        e.preventDefault();

        try {

            let formdata = new FormData()
            formdata.append('image', fileName)
            formdata.append('name', 'appended')

            await axios.post(UPLOAD_URL, JSON.stringify({ filename: fileName}), {headers: { 'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYXR0YWNrZXIiLCJleHAiOjE2NzgwNjYzNTAsImlhdCI6MTY0NjUzMDM1MCwiaXNzIjoibGVha3ktaW1hZ2UifQ.JBmQ5EFQAEYvQ89tdGT8gO31OqQftGxnYr_RSpnzi18' }});

            setSuccess(true);
            
        } catch (e) {
            setErrorMessage('File Not Accepted');
        }
    }

    return (
        <>
            {success ? (
                <section>
                    <h1>Image Uploaded Successfully!</h1>
                </section>
            ) : (
                <section>
                    {/* this error message directly taken from the video */}
                    <p ref={errorRef} className={errorMessage ? "errorMessage" : "offscreen"}>{errorMessage}</p>

                    <h1>Congratulations, You Are Logged In!</h1>

                    <form onSubmit={Upload}>
                        <label>Please Upload Image Here</label>
                        <input
                            type='file' 
                            onChange={(e) => setFileName(e.target.value)}
                        />
                        <button>Upload File</button>
                    </form>
                </section>
            )}
        </>
    )
}

export default FileUpload;