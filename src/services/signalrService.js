import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { hubURL } from '../app/apiClient';

const connections = {};


export const startConnection = async (hubPath = '') => {
    if (connections[hubPath]) return connections[hubPath]; // zaten varsa döndür

    const fullHubUrl = `${hubURL.replace(/\/$/, '')}/${hubPath.replace(/^\//, '')}`;
    const connection = new HubConnectionBuilder()
        .withUrl(fullHubUrl)
        .configureLogging(LogLevel.Information)
        .withAutomaticReconnect()
        .build();

    try {
        await connection.start();
        console.log(`✅ SignalR bağlantısı kuruldu: ${fullHubUrl}`);
        connections[hubPath] = connection;  // sakla
        return connection;
    } catch (err) {
        console.error(`❌ SignalR bağlantı hatası (${fullHubUrl}):`, err);
        return null;
    }
};




export const getConnection = (hubPath = '') => connections[hubPath] || null;
