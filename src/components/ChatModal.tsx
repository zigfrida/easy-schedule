import Button, { ButtonProps } from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { MessageList, MessageType } from 'react-chat-elements';
import { v4 as uuidv4 } from 'uuid';

import { createFirebaseDao } from '../api/dao';
import useAuthData from '../hooks/useAuthData';
import { AppointmentMessage } from '../types/appointment';
import { User } from '../types/user';

export interface Props {
    appointmentId: string;
    /* Can be a nurse or */
    secondaryUser: User;
    visible: boolean;
    title: string;

    onClose(): void;
}

function ChatModal({ appointmentId, secondaryUser, title, visible, onClose }: Props) {
    const messageListRef = useRef<HTMLElement>();
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const descriptionElementRef = useRef<HTMLElement>(null);

    const { user } = useAuthData();
    const [message, setMessage] = useState('');
    const [allMessages, setMessages] = useState([] as AppointmentMessage[]);

    const chatDao = useMemo(
        () => createFirebaseDao<AppointmentMessage>('appointments', appointmentId, 'messages'),
        [appointmentId],
    );

    useEffect(() => {
        const unsubscribe = chatDao.subscribe(setMessages);
        return unsubscribe;
    }, [chatDao]);

    useEffect(() => {
        if (visible) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [visible]);

    const handleSend: ButtonProps['onClick'] = () => {
        if (message && user?.uid) {
            chatDao.add(uuidv4(), {
                message,
                sender: user?.uid,
                timestamp: Date.now(),
                readBy: [user?.uid],
            });
            setMessage('');
        }
    };

    const messages = useMemo(() => {
        const sortedMessagesByTimestamp = allMessages.sort(
            (first, second) => first.timestamp - second.timestamp,
        );

        return sortedMessagesByTimestamp.map(
            (element) =>
                ({
                    type: 'text',
                    text: element.message,
                    date: new Date(element.timestamp),
                    title: element.sender === user?.uid ? user?.firstName : secondaryUser.firstName,
                    position: element.sender === user?.uid ? 'right' : 'left',
                } as MessageType),
        );
    }, [allMessages]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <Dialog
            open={visible}
            onClose={onClose}
            scroll='paper'
            aria-labelledby='scroll-dialog-title'
            aria-describedby='scroll-dialog-description'
        >
            <DialogTitle id='scroll-dialog-title'>{title}</DialogTitle>

            <DialogContent dividers>
                <DialogContentText
                    id='scroll-dialog-description'
                    ref={descriptionElementRef}
                    tabIndex={-1}
                >
                    <MessageList
                        referance={messageListRef}
                        className='message-list'
                        lockable={false}
                        toBottomHeight='100%'
                        dataSource={messages}
                    />
                    <div ref={messagesEndRef} />
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <TextField
                    required
                    fullWidth
                    id='message'
                    name='message'
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <Button onClick={handleSend}>Send</Button>
            </DialogActions>
        </Dialog>
    );
}

export default ChatModal;
