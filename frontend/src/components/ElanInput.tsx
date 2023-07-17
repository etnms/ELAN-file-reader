import { ChangeEvent, useState } from 'react';

interface IResponseData {
  tiers: string[],
  elanData: any
}

interface IPropsElanInput {
  setTierList: Function,
  setElanData: Function
}

const ElanInput = (props: IPropsElanInput) => {

  const { setTierList, setElanData } = props;
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
          const data: IResponseData = await response.json();
          setTierList(data.tiers);
          setElanData(data.elanData);
          console.log(data)
        }
        else {
          console.log('Error:', response.statusText);
        }

      } catch (error) {
        console.log('Error:', error);
        // Handle error
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