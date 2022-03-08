// I watched this tutorial to create the source code of this File Upload Screen: https://www.youtube.com/watch?v=0TTa5Ulmgds&ab_channel=ArjunYonjan%2FCodeTravel


import { React, useState, useRef, useEffect } from 'react';
import axios from 'axios';

const UPLOAD_URL = 'http://localhost:3030/image/upload';

const FileUpload = () => {

    const errorRef = useRef();

    const [file, setFile] = useState();
    const [errorMessage, setErrorMessage] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        setErrorMessage('');
    }, [file])

    const Upload = async (e) => {

        e.preventDefault();

        try {

            console.log("look here", file)

            let formdata = new FormData()
            formdata.append('img_data', file)
            formdata.append('name', 'appended')

            const { data } = await axios.post(UPLOAD_URL, formdata, {
                withCredentials: true,
                headers: {'content-type': 'multipart/form-data'}
            })

            console.log(data)
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
                            onChange={(e) => setFile(e.target.files[0])}
                        />
                        <button>Upload File</button>
                    </form>
                </section>
            )}
        </>
    )
}

export default FileUpload;