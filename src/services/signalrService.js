// src/services/signalrService.js
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { hubURL } from '../app/apiClient';

let connection = null;

export const startConnection = async () => {
    if (connection) return;


    connection = new HubConnectionBuilder()
        .withUrl(hubURL)
        .configureLogging(LogLevel.Information)
        .withAutomaticReconnect()
        .build();

    try {
        await connection.start();
        console.log("✅ SignalR bağlantısı kuruldu.");
    } catch (err) {
        console.error("❌ SignalR bağlantı hatası:", err);
    }
};

export const getConnection = () => connection;

