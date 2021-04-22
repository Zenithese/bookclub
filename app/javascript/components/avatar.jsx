import React, { useEffect, useRef } from 'react';

function Avatar({ className, avatarId }) {

    const emojis = ["✌", "😂", "😝", "😁", "😱", "👉", "🙌", "🍻", "🔥", "🌈", "🎈", "🌹", "💄", "🎀", "⚽", "🎾", "🏁", "😡", "👿", "🐻", "🐶", "🐬", "🐟", "🍀", "👀", "🚗", "🍎", "💝", "💙", "👌", "😍", "😉", "😓", "😳", "💪", "💩", "🍸", "🔑", "💖", "🌟", "🎉", "🌺", "🎶", "👠", "🏈", "⚾", "🏆", "👽", "💀", "🐵", "🐮", "🐩", "🐎", "💣", "👃", "👂", "🍓", "💘", "💜", "👊", "💋", "😘", "😜", "😵", "🙏", "👋", "🚽", "💃", "💎", "🚀", "🌙", "🎁", "⛄", "🌊", "⛵", "🏀", "🎱", "💰", "👶", "👸", "🐰", "🐷", "🐍", "🐫", "🔫", "👄", "🚲", "🍉", "💛", "💚"]

    const imgRef = useRef(null)

    useEffect(() => {
        if (imgRef.current) {
            imgRef.current.src = generateAvatar(
                emojis[avatarId ? avatarId : 0],
                "white",
                "#009578"
            );
        }
    })

    const generateAvatar = (
        text,
        foregroundColor = "white",
        backgroundColor = "black"
    ) => {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        canvas.width = 200;
        canvas.height = 200;

        // Draw background
        context.fillStyle = backgroundColor;
        context.fillRect(0, 0, canvas.width, canvas.height);

        // Draw text
        context.font = "bold 150px Assistant";
        context.fillStyle = foregroundColor;
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.fillText(text, canvas.width / 2, canvas.height / 1.7);

        return canvas.toDataURL("image/png");
    }

    return (
        <img className={className} alt="Avatar" id="avatar" ref={imgRef} />
    )
}

export default Avatar;