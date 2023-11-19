import { useEffect, useState } from "react";

function Debounce(value, delay) {
    const [debounceValue, setDebounceValue] = useState(value);

    useEffect(() => {
        const timeOut = setTimeout(() => {
            setDebounceValue(value);
        }, delay);
        return () => clearTimeout(timeOut);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    return debounceValue;
}
export default Debounce;