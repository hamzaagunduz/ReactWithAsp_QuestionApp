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
    const { status } = useSelector((state) => state.signalr);
    // Eklenen state
    const [upgradeMessage, setUpgradeMessage] = useState('');
    const [showChat, setShowChat] = useState(true); // Chat modalı gösterilsin mi?


    // AI'dan gelen metni HTML'e çevir
    const formatAIText = (text) => {
        if (!text) return '';
        return text
            .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')      // Bold
            .replace(/\*(.+?)\*/g, '<em>$1</em>')                 // Italic
            .replace(/^\s*[-•]\s+(.*)$/gm, '<li>$1</li>')         // Bullet List
            .replace(/(<li>.*<\/li>)/gs, '<ul>$1</ul>')           // Wrap list
            .replace(/\n{2,}/g, '<br/><br/>')                     // Double newline to break
            .replace(/\n/g, '<br/>');                             // Single newline to <br/>
    };

    useEffect(() => {
        const initializeSignalR = async () => {
            await startConnection();
            const connection = getConnection();

            if (!connection) return;

            let retries = 0;
            while (!connection.connectionId && retries < 10) {
                await new Promise(res => setTimeout(res, 300));
                retries++;
            }

            setConnectionId(connection.connectionId || '');
            setMessages(prev => [...prev, { text: question, sender: 'user' }]);

            connection.on("ReceiveMessage", (responseMessage) => {
                setMessages(prevMessages => {
                    const lastMsg = prevMessages[prevMessages.length - 1];
                    if (lastMsg && lastMsg.sender === 'ai') {
                        const updatedMessages = [...prevMessages];
                        updatedMessages[updatedMessages.length - 1] = {
                            ...lastMsg,
                            text: lastMsg.text + responseMessage
                        };
                        return updatedMessages;
                    } else {
                        return [...prevMessages, { text: responseMessage, sender: 'ai' }];
                    }
                });

                scrollToBottom();
            });
        };

        initializeSignalR();
    }, []);

    // useEffect içindeki dispatch kısmı güncellendi:
    useEffect(() => {
        if (question && connectionId) {
            dispatch(sendChatMessage({ prompt: question, connectionId }))
                .unwrap()
                .then(res => {
                    if (res?.data) {
                        setUpgradeMessage(res.data); // Alert yerine modal mesajı ayarla
                        setShowChat(false); // Chat gösterilmesin
                    }
                })
                .catch(err => {
                    console.error("Mesaj gönderilirken hata oluştu:", err);
                });
        }
    }, [connectionId, question]);



    const scrollToBottom = () => {
        if (chatBoxRef.current) {
            chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
        }
    };

    const handleSend = (e) => {
        if (e) e.preventDefault();
        if (!input.trim()) return;

        setMessages(prev => [...prev, { text: input, sender: 'user' }]);
        dispatch(sendChatMessage({ prompt: input, connectionId }));
        setInput('');
    };
    // return kısmı GÜNCELLENDİ:
    return (
        <div className="ai-modal-overlay" onClick={onClose}>
            <div className="ai-modal" onClick={(e) => e.stopPropagation()}>
                <button className="ai-close-icon" onClick={onClose}>×</button>

                {upgradeMessage && !showChat ? (
                    <div className="ai-upgrade-modal">
                        <h3>Uyarı</h3>
                        <p>{upgradeMessage}</p>
                        <button
                            onClick={onClose}
                            style={{
                                padding: '0.5rem 1rem',
                                backgroundColor: '#ff5252',
                                color: 'white',
                                border: 'none',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                fontWeight: 'bold',
                                fontSize: '1rem',
                                marginTop: '1rem'
                            }}
                        >
                            Tamam
                        </button>
                    </div>
                ) : (
                    <>
                        <h3>Yapay Zeka Yardımcısı</h3>

                        <div className="ai-chat-box" ref={chatBoxRef}>
                            {messages.map((msg, i) => (
                                <div key={i} className={`ai-message ${msg.sender}`}>
                                    {msg.sender === 'user' ? (
                                        <span>{msg.text}</span>
                                    ) : (
                                        <span dangerouslySetInnerHTML={{ __html: formatAIText(msg.text) }} />
                                    )}
                                </div>
                            ))}
                        </div>

                        {status === 'loading' && (
                            <div className="ai-typing-indicator">
                                <span></span><span></span><span></span>
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
                    </>
                )}
            </div>
        </div>
    );

};

export default AiChatModal;
