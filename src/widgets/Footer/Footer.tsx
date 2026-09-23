import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';

export const Footer = () => {
    return(
        <div className={styles.footer}>
            <ul className={styles.footer__list}>
                <li>2026 год</li>
                <li>
                    <Link to='https://github.com/vjatcheslav21' target="_blank">GitHub: vjatcheslav21</Link>
                </li>
                <li>
                    <Link to='https://vk.ru/s.kulikov_1' target="_blank">vk</Link>
                </li>
            </ul>
        </div>
    )
}