// src/components/AiChatModal.jsx
import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendChatMessage } from '../../features/Signalr/SignalrSlice';
import { startConnection, getConnection } from '../../services/signalrService';
import '../../style/Train/AiChatModal.css';

const AiChatModal = ({ question, onClose }) => {
    const [connectionId, setConnectionId] = useState('');
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);
    const chatBoxRef = useRef(null);
    const dispatch = useDispatch();
    const { status, error } = useSelector((state) => state.signalr);







    useEffect(() => {
        const initializeSignalR = async () => {
            await startConnection();

            const connection = getConnection();

            if (!connection) return;

            let retries = 0;
            while (!connection.connectionId && retries < 10) {
                await new Promise(res => setTimeout(res, 300)); // 300 ms bekle
                retries++;
            }

            setConnectionId(connection.connectionId || '');
            setMessages(prev => [...prev, { text: question, sender: 'user' }]);

            connection.on("ReceiveMessage", (responseMessage) => {

                setMessages(prevMessages => {
                    const lastMsg = prevMessages[prevMessages.length - 1];

                    // Son mesaj AI'dan geldiyse onun üstüne ekle
                    if (lastMsg && lastMsg.sender === 'ai') {
                        const updatedMessages = [...prevMessages];
                        updatedMessages[updatedMessages.length - 1] = {
                            ...lastMsg,
                            text: lastMsg.text + responseMessage
                        };
                        return updatedMessages;
                    } else {
                        // Aksi halde yeni AI mesajı olarak ekle
                        return [...prevMessages, { text: responseMessage, sender: 'ai' }];
                    }
                });

                scrollToBottom();
            });

        };

        initializeSignalR();

    }, []);



    console.log(question)




    useEffect(() => {
        if (question && connectionId) {
            dispatch(sendChatMessage({ prompt: question, connectionId }));
        }
    }, [connectionId, question]);

    const scrollToBottom = () => {
        if (chatBoxRef.current) {
            chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
        }
    };

    const handleSend = (e) => {

        if (e) e.preventDefault();

        setMessages(prev => [...prev, { text: input, sender: 'user' }]);
        dispatch(sendChatMessage({ prompt: input, connectionId }));
        setInput('');

    };

    return (
        <div
            className="ai-modal-overlay"
            onClick={onClose} // modal dışı tıklama
        >
            <div
                className="ai-modal"
                onClick={(e) => e.stopPropagation()} // modal içi tıklamayı durdur
            >
                <button className="ai-close-icon" onClick={onClose}>×</button>

                <h3>Yapay Zeka Yardımcısı</h3>

                <div className="ai-chat-box" ref={chatBoxRef}>
                    {messages.map((msg, i) => {
                        return (
                            <div key={i} className={`ai-message ${msg.sender}`}>
                                <strong>{msg.sender === 'user' ? '' : 'Dobe:'}</strong> {msg.text}
                            </div>
                        );
                    })}

                </div>
                {status === 'loading' && (
                    <div className="ai-typing-indicator">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                )}
                <form className="ai-form" onSubmit={handleSend}>
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Mesajınızı yazın..."
                    />
                    <button type="submit">Gönder</button>
                </form>


            </div>
        </div>
    );

};

export default AiChatModal;
