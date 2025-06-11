import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { hubURL } from '../app/apiClient';

let connection = null;

export const startConnection = async (hubPath = '') => {
    if (connection) return;

    // hubURL + hubPath güvenli birleştirme
    const fullHubUrl = `${hubURL.replace(/\/$/, '')}/${hubPath.replace(/^\//, '')}`;

    connection = new HubConnectionBuilder()
        .withUrl(fullHubUrl)
        .configureLogging(LogLevel.Information)
        .withAutomaticReconnect()
        .build();

    try {
        await connection.start();
        console.log(`✅ SignalR bağlantısı kuruldu: ${fullHubUrl}`);
    } catch (err) {
        console.error(`❌ SignalR bağlantı hatası (${fullHubUrl}):`, err);
    }
};

export const getConnection = () => connection;
