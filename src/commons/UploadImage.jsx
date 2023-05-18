import Axios from 'axios';
import React from 'react'

const UploadImage = (props) => {
    const id = `upload-img-${Math.random()}`;
    const { label, onUploadError, onUploadSuccess, onUploadFinished } = props;

    const handleChangeFile = (e) => {
        const file = e.target.files ? e.target.files[0] : null;
        if (file) {
            if (file.size > 33554432) {
                if (typeof onUploadError !== 'undefined') {
                    onUploadError();
                }
            }
            try {
                const formData = new FormData();
                formData.append('file', file);
                formData.append('upload_preset', 'cuong-upload');

                Axios({
                    method: 'post',
                    url: `https://api.cloudinary.com/v1_1/dqkfqc8pc/image/upload`,
                    data: formData,
                    headers: { 'Content-Type': 'multipart/form-data' },
                })
                    .then((res) => {
                        if (typeof onUploadSuccess !== "undefined") {
                            onUploadSuccess()
                        }
                        if (typeof onUploadFinished !== "undefined") {
                            console.log('res', res.data)
                            onUploadFinished(res.data);
                        }
                    })
            } catch (error) {
                if (typeof onUploadError !== "undefined") {
                    onUploadError()
                }
            }
        }
    }

    return (
        <div>
            <input
                id={id}
                multiple
                type="file"
                onChange={handleChangeFile}
                style={{ display: "none" }}
            />
            <label htmlFor={id}>
                <span style={{ border: "1px solid #bae7ff", padding: "5px", color: "#1890ff", cursor: "pointer" }}>{label || 'Tải ảnh'}</span>
            </label>
        </div>
    )
}

export default UploadImage