import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark, faMagnifyingGlass, faSpinner } from '@fortawesome/free-solid-svg-icons';

import TippyHeadless from "@tippyjs/react/headless";
import { useEffect, useState, useRef } from "react";
import 'tippy.js/dist/tippy.css';

import * as searchServices from '~/services/searchService';
import styles from './Search.module.scss';
import { useDebounce } from "~/hooks";
import { Wrapper as PopperWrapper } from "~/component/Popper";
import AccountItem from "~/component/AccountItem";

const cx = classNames.bind(styles);

function Search() {
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);

    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);

    const debouncedValue = useDebounce(searchValue, 500);

    const inputRef = useRef();

    useEffect(() => {
        if (!debouncedValue.trim()) {
            setSearchResult([]);
            return;
        }

        const fetchApi = async () => {
            setLoading(true);

            const result = await searchServices.search(debouncedValue);
            setSearchResult(result);

            setLoading(false);
        }

        fetchApi();

    }, [debouncedValue]);

    const handleClear = () => {
        setSearchValue('');
        inputRef.current.focus();
    }

    const handHideResult = () => {
        setShowResult(false);
    }

    const handleChange = (e) => {
        const searchValue = e.target.value;
        if (!searchValue.startsWith(' ')) {
            setSearchValue(e.target.value);
        }
    }

    return (
        <TippyHeadless
            onClickOutside={handHideResult}
            interactive={true}
            visible={searchResult.length > 0 && showResult}
            render={attrs => (
                <div className={cx('search-result')} tabIndex={-1} {...attrs}>
                    <PopperWrapper>
                        <h4 className={cx('search-title')}> Account</h4>
                        {searchResult.map((result) => {
                            return <AccountItem key={result.id} data={result} />
                        })}
                    </PopperWrapper>
                </div>
            )}>
            <div className={cx('search')}>
                <input
                    ref={inputRef}
                    value={searchValue}
                    placeholder="Search account and videos"
                    spellCheck={false}
                    onChange={handleChange}
                    onFocus={() => setShowResult(true)} />
                {!!searchValue && !loading &&
                    <button className={cx('clear')} onClick={handleClear} >
                        <FontAwesomeIcon icon={faCircleXmark} />
                    </button>}
                {loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}

                <button className={cx('search-btn')} onMouseDown={e => e.preventDefault()}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
            </div>
        </TippyHeadless>
    )
}
export default Search;