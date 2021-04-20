import React, { useLayoutEffect, useState } from 'react';
import { debounce } from 'lodash';

export default function useActions() {
    const [action, setAction] = useState(true);
    useLayoutEffect(() => {
        const handleChange = (e) => {
            delayedQuery(e.target.value);
        }

        const delayedQuery = useCallback(
            debounce(() => console.log("hit"), 500),
            []
        );
    
    }, []);
    return action;
}