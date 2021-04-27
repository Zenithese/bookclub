import React, { useEffect, useState } from 'react';

export default function useLikeCount(likes, type, commentable, userId) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        setCount(
            (likes[type] && likes[type][commentable.id] ? 
                1 : 0) + commentable.likesCount + (commentable.likesArray.includes(userId) ? -1 : 0)
        )
    }, [likes, type, commentable, userId]);

    return count;
}