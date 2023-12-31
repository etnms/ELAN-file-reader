import React, { ChangeEventHandler, MouseEventHandler } from 'react';
import styles from './FileInput.module.css';

interface FileInputProps {
    handleFileChange: ChangeEventHandler<HTMLInputElement>,
    handleFileupload: MouseEventHandler,
    title: string,
    fileName: string,
    errorText: string
}

const FileInput: React.FC<FileInputProps> = ({ handleFileChange, handleFileupload, title, fileName, errorText }) => {

    return (
        <div>
            <div className={styles.parent}>
                <div className={styles['file-upload']}>
                    <label htmlFor='input-audio'>{title}</label>
                    <input type='file' onChange={handleFileChange} name='input-audio' />
                    <p> {fileName === '' ? 'No file' : `File chosen: ${fileName}`}</p>
                </div>
                <button onClick={handleFileupload} className={styles.btn}>Upload</button>
                <p className={styles.error}>{errorText}</p>
            </div>
        </div>
    );
};

export default FileInput;