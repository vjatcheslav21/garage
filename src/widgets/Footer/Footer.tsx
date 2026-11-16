import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';
import { GitHubIcon, VKIcon } from '@/shared/ui';

export const Footer = () => {
    return(
        <>
        <div className={styles.footer}>
            <ul className={styles.footer__list}>
                <li>
                    <Link to='https://github.com/vjatcheslav21' target="_blank"><GitHubIcon/></Link>
                </li>
                <li>
                    <Link to='https://vk.ru/s.kulikov_1' target="_blank"><VKIcon/></Link>
                </li>
            </ul>
        </div>
        </>
    )
}