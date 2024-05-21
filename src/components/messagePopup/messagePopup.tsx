import React from 'react';
import './messagePopup.css';
import avatarSuccess from '../../assets/icons/avatar-success.png';
import avatarError from '../../assets/icons/avatar-error.png';

export function SuccessPopup() {
    return (
        <MessagePopup avatar={avatarSuccess} message={'Молодец!'} />
    );
}

export function ErrorPopup() {
    return (
        <MessagePopup avatar={avatarError} message={'Ошибка!'} />
    );
}

export function MessagePopup({ avatar, message }: { avatar: string, message: string }) {
    return (
        <div className="message-popup">
            <div className="message-popup__wrapper">
                <img className="message-popup__image" src={avatar} alt="" />
                <div className="message-popup__message">
                    <span>{message}</span>
                </div>
            </div>
        </div>
    );
}