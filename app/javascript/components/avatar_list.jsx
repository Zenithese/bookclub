import React, { useEffect, useRef, useState } from 'react';
import { updateAvatar } from '../actions/settings_actions';
import { connect } from 'react-redux';

const mapStateToProps = ({ session }) => {
    return {
        userId: Number(session.id),
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateAvatar: (id, avatarId) => dispatch(updateAvatar(id, avatarId))
    }
}


function AvatarList({ userId, updateAvatar }) {

    const emojis = ["✌", "😂", "😝", "😁", "😱", "👉", "🙌", "🍻", "🔥", "🌈", "🎈", "🌹", "💄", "🎀", "⚽", "🎾", "🏁", "😡", "👿", "🐻", "🐶", "🐬", "🐟", "🍀", "👀", "🚗", "🍎", "💝", "💙", "👌", "😍", "😉", "😓", "😳", "💪", "💩", "🍸", "🔑", "💖", "🌟", "🎉", "🌺", "🎶", "👠", "🏈", "⚾", "🏆", "👽", "💀", "🐵", "🐮", "🐩", "🐎", "💣", "👃", "👂", "🍓", "💘", "💜", "👊", "💋", "😘", "😜", "😵", "🙏", "👋", "🚽", "💃", "💎", "🚀", "🌙", "🎁", "⛄", "🌊", "⛵", "🏀", "🎱", "💰", "👶", "👸", "🐰", "🐷", "🐍", "🐫", "🔫", "👄", "🚲", "🍉", "💛", "💚"]

    const [visible, setVisible] = useState(false)

    const avatarList = useRef(null)

    useEffect(() => {
        if (visible) {
            avatarList.current.focus()
        }
    }, [visible])

    const handleClick = (avatarId) => {
        updateAvatar(userId, avatarId)
        setVisible(false)
    }

    return (
        <div className="avatar-list-container" >
            {!visible && 
                <button onClick={() => setVisible(true)} >
                    Change Avatar
                </button>
            }
            {visible &&
                <div 
                    className="avatar-list" 
                    ref={avatarList}  
                    tabIndex="0" onBlur={() => setVisible(false)}>
                    {emojis.map((e, i) => {
                        return (
                            <div className="emoji-avatar" key={i} onClick={() => handleClick(i)}>
                                {e}
                            </div>
                        )
                    })}
                </div>
            }
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(AvatarList);