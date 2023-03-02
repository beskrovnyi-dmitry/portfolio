import { useEffect, useState, useRef } from "react";
import { collection, addDoc, serverTimestamp, onSnapshot, query, where, orderBy } from 'firebase/firestore';
import { auth, db } from "../firebase-config";

function Chat(props) {
    const { room, setRoom } = props;
    const [newMessage, setNewMessage] = useState('');
    const [messages, setMessages] = useState([]);

    const messagesRef = collection(db, "messages");

    const messagesEndRef = useRef();

    async function handleSubmitForm(e) {
        e.preventDefault();
        if (newMessage === "") return;

        await addDoc(messagesRef, {
            text: newMessage,
            typedAt: serverTimestamp(),
            user: auth.currentUser.displayName,
            room,
        });

        setNewMessage("");
    }
    //showing messages from specific room
    useEffect(() => {
        //you should create index on firestore website for ordering by 'typedAt'
        const queryMessage = query(messagesRef, where("room", "==", room), orderBy("typedAt"))
        //listen the query of changing data in specific room
        const unsubscribe = onSnapshot(queryMessage, (snapshot) => {
            let messages = [];
            snapshot.forEach(doc => {
                messages.push({ ...doc.data(), id: doc.id });
            });

            setMessages(messages);
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
        });

        return () => unsubscribe();
    }, [])

    return (
        <div className="chat">
            <div className="chat-header">
                <div className="header-logo"></div>
                <div className="header-exit" onClick={() => setRoom(null)} title="LEAVE ROOM"></div>
            </div>
            <div className="messages">
                {messages.map(message => (
                <div className={message.user === auth.currentUser.displayName? "message" : "answer"} key={message.id}>
                    <span className="message-user">{message.user} </span>
                    <span className="message-text">{message.text}</span>
                    <span className="message-time">{message.typedAt?.toDate().toString().slice(16, 21)}</span>
                </div>
            ))}
            <div ref={messagesEndRef} className="message-end"/>
            </div>
            <form className="message-form" onSubmit={handleSubmitForm}>
                <textarea
                    autoFocus
                    type="text"
                    className="message-input"
                    placeholder="Type your message here..."
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                    onKeyDown={(e) => e.key === 'Enter' ? handleSubmitForm(e) : null}
                />
            </form>
        </div>
    )
}
export default Chat;