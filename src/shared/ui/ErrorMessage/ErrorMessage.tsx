import styles from './ErrorMessage.module.scss';

interface ErrorMessageProp {
    error: string;
}

export const ErrorMessage = ({error}: ErrorMessageProp) => {
    return (
        <>
            <p className={styles.error}>{error}</p>
        </>
    )
}