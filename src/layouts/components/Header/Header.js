import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical, faEarthAsia, faCircleQuestion, faKeyboard, faUser, faCoins, faGear, faSignOut } from '@fortawesome/free-solid-svg-icons';
import Tippy from "@tippyjs/react";
import 'tippy.js/dist/tippy.css';

import config from '~/config';
import styles from './Header.module.scss';
import images from "~/assets/images";
import Button from "~/component/Button/Button";
import Menu from "~/component/Popper/Menu";
import { InboxIcon, MessageIcon, UploadIcon } from "~/component/Icons";
import Image from "~/component/Image";
import Search from "../Search";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

const MENU_ITEMS = [
    {
        icon: <FontAwesomeIcon icon={faEarthAsia} />,
        title: "English",
        children: {
            title: 'Language',
            data: [
                {
                    type: 'language',
                    code: 'en',
                    title: 'English'
                },
                {
                    type: 'language',
                    code: 'vi',
                    title: 'Tieng Viet'
                },
            ]
        }
    },
    {
        icon: <FontAwesomeIcon icon={faCircleQuestion} />,
        title: "Feedback and help",
        to: '/feedback'
    },
    {
        icon: <FontAwesomeIcon icon={faKeyboard} />,
        title: "Keyboard shortcuts"
    },
];

function Header() {

    const currentUser = true;

    const handleMenuChange = (menuItem) => {
        switch (menuItem.type) {
            case 'language':
                break;
            default:

        }
    };
    const userMenu = [
        {
            icon: <FontAwesomeIcon icon={faUser} />,
            title: "View profile",
            to: '/viewProfile'
        },
        {
            icon: <FontAwesomeIcon icon={faCoins} />,
            title: "Get coins",
            to: '/coin'
        },
        {
            icon: <FontAwesomeIcon icon={faGear} />,
            title: "Settings",
            to: '/settings'
        },
        ...MENU_ITEMS,
        {
            icon: <FontAwesomeIcon icon={faSignOut} />,
            title: "Log out",
            to: '/logout',
            separate: true
        },
    ]



    return <header className={cx('wrapper')}>
        <div className={cx('inner')}>
            <Link to={config.routes.home} className={cx('logo-link')}>
                <img src={images.logo} alt="Error" />
            </Link>

            <Search />

            <div className={cx('action')}>
                {currentUser ? (
                    <>
                        <Tippy delay={[0, 200]} content='Upload video' placement="bottom">
                            <button className={cx('action-btn')}>
                                <UploadIcon />
                            </button>
                        </Tippy>
                        <Tippy delay={[0, 200]} content='Message' placement="bottom">
                            <button className={cx('action-btn')}>
                                <MessageIcon />
                            </button>
                        </Tippy>
                        <Tippy delay={[0, 200]} content='Inbox' placement="bottom">
                            <button className={cx('action-btn')}>
                                <InboxIcon />
                            </button>
                        </Tippy>
                    </>
                ) : (
                    <>
                        <Button text>
                            Upload
                        </Button>
                        <Button primary>
                            Log in
                        </Button>
                    </>
                )}
                <Menu items={currentUser ? userMenu : MENU_ITEMS} onChange={handleMenuChange}>
                    {currentUser ? (
                        <Image
                            src='https://preview.redd.it/prettiest-version-of-maki-v0-4cjemeyd2yra1.jpg?width=400&format=pjpg&auto=webp&s=66408551bc9635320382f004dd0d7cb2850a08ef'
                            className={cx('user-avatar')}
                            alt="nguyenvana"
                            fallback='https://files.fullstack.edu.vn/f8-prod/user_avatars/1/623d4b2d95cec.png' />
                    ) : (
                        <button className={cx('more-btn')}>
                            <FontAwesomeIcon icon={faEllipsisVertical} />
                        </button>

                    )}
                </Menu>
            </div>
        </div>
    </header>
}
export default Header;