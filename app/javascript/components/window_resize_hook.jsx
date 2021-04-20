import React, { useLayoutEffect, useState } from 'react';
import { debounce } from 'lodash';

export default function useWindowSize() {
    const [size, setSize] = useState([window.innerWidth, window.innerHeight]);
    useLayoutEffect(() => {
        function updateSize() {
            setSize([window.innerWidth, window.innerHeight]);
        }
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, []);
    return size;
}

// useLayoutEffect(() => {
//     window.addEventListener('resize', updateSize);
//     const updateSize = useCallback(
//         debounce(() => setSize([window.innerWidth, window.innerHeight]), 500),
//         []
//     );
//     return () => window.removeEventListener('resize', updateSize);
// }, []);