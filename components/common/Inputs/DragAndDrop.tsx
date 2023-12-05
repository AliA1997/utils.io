import React, { useState } from 'react';
import { styled } from '@mui/system';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const UploadContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
});

const FileInput = styled('input')({
  display: 'none',
});

const UploadComponent: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      // Perform file upload logic
    }
  };

  return (
    <UploadContainer>
      <label htmlFor="upload-input">
        <FileInput
          type="file"
          id="upload-input"
          accept=".jpg,.png"
          onChange={handleFileChange}
        />
        <Button
          variant="contained"
          component="span"
          startIcon={<CloudUploadIcon />}
        >
          Upload
        </Button>
      </label>
      {selectedFile && <div>{selectedFile.name}</div>}
      <Button
        variant="contained"
        disabled={!selectedFile}
        onClick={handleUpload}
      >
        Submit
      </Button>
    </UploadContainer>
  );
};

export default UploadComponent;
