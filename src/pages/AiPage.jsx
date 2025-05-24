// src/pages/AiPage.jsx
import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendChatMessage } from '../features/Signalr/SignalrSlice';
import { startConnection, getConnection } from '../services/signalrService';

const AiPage = () => {
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

            setConnectionId(connection.connectionId || '');

            connection.on("ReceiveMessage", (responseMessage) => {
                setMessages(prev => [...prev, { text: responseMessage, sender: 'ai' }]);
                scrollToBottom();
            });
        };

        initializeSignalR();

        return () => {
            const conn = getConnection();
            if (conn) conn.stop();
        };
    }, []);

    const scrollToBottom = () => {
        if (chatBoxRef.current) {
            chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
        }
    };

    const handleSend = async () => {
        if (input.trim() === '' || !connectionId) return;

        setMessages(prev => [...prev, { text: input, sender: 'user' }]);
        dispatch(sendChatMessage({ prompt: input, connectionId }));
        setInput('');
    };

    return (
        <div style={{ maxWidth: '600px', margin: 'auto' }}>
            <h2>Yapay Zeka Chat</h2>
            <p>Bağlantı ID: {connectionId && <code>{connectionId}</code>}</p>

            <div
                ref={chatBoxRef}
                style={{
                    border: '1px solid #ccc',
                    padding: '10px',
                    height: '300px',
                    overflowY: 'auto',
                    marginBottom: '10px'
                }}
            >
                {messages.map((msg, i) => (
                    <div key={i} style={{ textAlign: msg.sender === 'user' ? 'right' : 'left' }}>
                        <strong>{msg.sender === 'user' ? 'Sen' : 'AI'}:</strong> {msg.text}
                    </div>
                ))}
            </div>

            <div>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    style={{ width: '80%' }}
                />
                <button onClick={handleSend}>Gönder</button>
            </div>

            {status === 'loading' && <p>Yanıt bekleniyor...</p>}
            {status === 'failed' && <p style={{ color: 'red' }}>Hata: {error}</p>}
        </div>
    );
};

export default AiPage;
