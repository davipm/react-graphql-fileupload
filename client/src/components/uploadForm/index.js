import React, { useState, useMemo } from 'react';
import { useMutation, gql } from '@apollo/client'

const UPLOAD_FILE = gql`
  mutation uploadFile($file: Upload!) {
    uploadFile(file: $file) {
      url
    }
  }
`;

export default function UploadForm() {
  const [uploadFile] = useMutation(UPLOAD_FILE, {
    onCompleted: data => console.log(data)
  })

  const [thumbnail, setThumbnail] = useState('');
  const preview = useMemo(() => {
    return thumbnail ? URL.createObjectURL(thumbnail) : null
  }, [thumbnail])

  const onChange = e => {
    const file = e.target.files[0];

    if (!file) return null;

    uploadFile({ variables: { file }})
    setThumbnail(file)
  }

  return (
    <div className="container mt-5">
      <h1>Upload file</h1>

      {thumbnail && (
        <>
          <h3>Preview</h3>

          <img
            src={preview}
            alt="Preview"
            className="img-thumbnail d-block mb-3 mr-auto ml-auto"
          />
        </>
      )}

      <div className="custom-file mb-3">
        <input type="file" className="custom-file-input" onChange={onChange} required />
        <label className="custom-file-label" htmlFor="validatedCustomFile">Choose file...</label>
      </div>
    </div>
  )
}
