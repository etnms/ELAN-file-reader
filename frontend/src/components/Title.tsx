import React from 'react';
import styles from './Title.module.css';

const Title: React.FC = () => {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>ELAN file reader</h1>
            <h2 className={styles.subtitle}>A web app to display annotations from an ELAN file in real time</h2>          
        </div>
    );
};

export default Title;