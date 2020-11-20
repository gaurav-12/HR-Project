import React, { useState, useEffect } from 'react';
import firebase from '../../Firebase';
import { Loop } from '@material-ui/icons';

const UploadScreen = () => {
    const [fileName, setFileName] = useState('Click to Add File');
    const [file, setFile] = useState({});
    const [uploading, setUploading] = useState(false);

    const handleLogout = () => {
        setUploading(true);
        firebase.auth().signOut()
            .then(() => {
                setUploading(false);
            });
    }

    const fileUploadButton = () => {
        document.getElementById('fileButton').click();
        document.getElementById('fileButton').onchange = (e) => {
            if (e.target.files.length > 0) {
                setFileName(e.target.files[0].name);
                setFile(e.target.files[0]);
            }
        }
    }

    const uploadFile = () => {
        if (file !== {}) {
            setUploading(true);

            const fileRef = firebase.storage(firebase).ref('file_' + Date.now());
            fileRef.put(file)
                .then(snapshot => {
                    setFileName('File Uploaded successfully');
                    setFile({});
                    setUploading(false);
                })
                .catch(err => {
                    console.log(err);
                    setUploading(false);
                });
        }
    }

    return (
        <section className="Home">
            <nav>
                <h2>HR Project</h2>
                <button onClick={handleLogout}>Logout</button>
            </nav>

            <div id="fileUpload">
                <input id="fileButton" type="file" hidden />
                <p onClick={fileUploadButton}>
                    {fileName}
                </p>

                <button onClick={uploadFile}>
                    Upload File
                </button>
            </div>

            <div className="loadingOverlay" style={{ display: uploading ? 'flex' : 'none' }}>
                <Loop style={{ fontSize: "15vh" }} className={uploading ? "loadingRotation" : null} />
            </div>
        </section>
    );
};

export default UploadScreen;