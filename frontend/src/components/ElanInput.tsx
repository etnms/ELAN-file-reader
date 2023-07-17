import { ChangeEvent, useState } from 'react';

interface ResponseData {
  tiers: string[],
  elanData: ElanData
}

interface ElanData {
  sentence: string,
  timeStamp: string
}

interface PropsElanInput {
  setTierList: Function,
  setElanData: Function
}

const ElanInput: React.FC<PropsElanInput> = ({setTierList, setElanData}) => {

  const backendURL: string = import.meta.env.VITE_BACKEND_URL;
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleFileUpload: () => Promise<void> = async () => {
    if (selectedFile) {
      const formData: FormData = new FormData();
      formData.append('file', selectedFile);

      try {
        const response: Response = await fetch(`${backendURL}/upload`, {
          method: 'POST',
          body: formData,
        });

        // File uploaded successfully
        if (response.ok) {
          const data: ResponseData = await response.json();
          setTierList(data.tiers);
          setElanData(data.elanData);
        }
        else {
          // Handle error
          console.log('Error:', response.statusText);
        }

      } catch (error) {
        // Handle error
        console.log('Error:', error);

      }
    }
  };
  return (
    <div>
      <label htmlFor='input-eaf'>EAF file</label>
      <input type='file' onChange={handleFileChange} name='input-eaf' />
      <button onClick={handleFileUpload}>Upload eaf</button>
    </div>
  );
};

export default ElanInput;