import React, { ChangeEventHandler, MouseEventHandler } from 'react';
import styles from './FileInput.module.css';

interface FileInputProps {
    handleFileChange: ChangeEventHandler<HTMLInputElement>,
    handleFileupload: MouseEventHandler,
    title: string,
}
 
const FileInput: React.FC<FileInputProps> = ({handleFileChange,handleFileupload, title}) => {
    return (
        <div>
            <div className={styles.parent}>
                <div className={styles['file-upload']}>
                    <label htmlFor='input-aduio'>{title}</label>
                    <input type='file' onChange={handleFileChange} name='input-audio' />
                </div>
                <button onClick={handleFileupload}>upload</button>
            </div>
        </div>
    );
};

export default FileInput;