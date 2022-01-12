import Loader from 'react-loader-spinner';
import styles from './Loader.module.css';
export default function Spinner() {
    return (
        <Loader
            className={styles.Loader}
            type="BallTriangle"
            color="#3f51b5"
            height={100}
            width={100}
            timeout={10000}
        />
    );
}
