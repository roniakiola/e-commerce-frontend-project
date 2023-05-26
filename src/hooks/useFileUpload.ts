import { useState } from 'react';
import axios, { AxiosError } from 'axios';

const useFileUpload = () => {
  const [fileLocation, setFileLocation] = useState<string>('');

  const handleFileChange = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    try {
      const response = await axios.post(
        'https://api.escuelajs.co/api/v1/files/upload',
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
      return setFileLocation(response.data.location);
    } catch (e) {
      const error = e as AxiosError;
      return error;
    }
  };

  return { fileLocation, handleFileChange };
};

export default useFileUpload;
