import React, { useState, useEffect, useRef } from 'react';
import * as signalR from '@microsoft/signalr';

const BookingTest = () => {
    const connectionRef = useRef(null);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        const establishConnection = async () => { 
            const connection = new signalR.HubConnectionBuilder()
                .withUrl("http://localhost:5037/bookinghub") 
                .build();

            connectionRef.current = connection; // Store in ref
            
            try {
                await connection.start();
                console.log('Connected!'); 
                setIsConnected(true); 
            } catch (err) {
                console.error(err);
            }

            console.log("Setting up ReceiveMessage listener"); 

            connection.on("ReceiveMessage", (user, message) => {
                console.log("Message Received (Client):", user, message);
                setMessages(prevMessages => [...prevMessages, { user, message }]);
            });
        };  

        establishConnection(); // Start connection

        return () => {
            if (connectionRef.current) { // Cleanup function
                connectionRef.current.stop();
            }
        }
    }, []);

    const handleSendMessage = () => {
        if (!connectionRef.current) {
            console.warn('Connection not yet established.');
            return; 
        }

        connectionRef.current.invoke("SendMessage", "TestUser", message) 
            .catch(err => console.error(err)); 
    };

    return (
        <div>
            <input type="text" value={message} onChange={e => setMessage(e.target.value)} />
            <button onClick={handleSendMessage} disabled={!isConnected}>Send</button>

            <div className="message-list"> 
                {messages.map((msg, index) => (
                    <div key={index}>
                        {msg.user}: {msg.message}
                    </div>
                ))}
            </div>
        </div>  
    );
};

export default BookingTest; 