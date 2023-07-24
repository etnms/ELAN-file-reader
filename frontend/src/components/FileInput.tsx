import React, { ChangeEventHandler, MouseEventHandler } from 'react';
import styles from './FileInput.module.css';

interface FileInputProps {
    handleFileChange: ChangeEventHandler<HTMLInputElement>,
    handleFileupload: MouseEventHandler,
    title: string,
    fileName: string,
}

const FileInput: React.FC<FileInputProps> = ({ handleFileChange, handleFileupload, title, fileName }) => {

    return (
        <div>
            <div className={styles.parent}>
                <div className={styles['file-upload']}>
                    <label htmlFor='input-audio'>{title}</label>
                    <input type='file' onChange={handleFileChange} name='input-audio' />
                    <p> {fileName === '' ? 'No file' : `File chosen: ${fileName}`}</p>
                </div>
                <button onClick={handleFileupload} className={styles.btn}>Upload</button>
            </div>
        </div>
    );
};

export default FileInput;