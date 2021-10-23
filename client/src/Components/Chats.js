import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import { Heading } from "../Constants/Heading";
import { Button } from "./Button";
import { Input } from "./Input";

export const Chats = ({ socket, name, room }) => {
  const [message, setMessage] = useState(" ");
  const [messageList, setMessageList] = useState([]);

  const handleInput = (e) => {
    setMessage(e.target.value);
  };

  const handlePressEnter = (e) => {
    e.key === "Enter" && handleSendMessage();
  };
  const handleSendMessage = async () => {
    if (message !== "") {
      const messageData = {
        room: room,
        name: name,
        message: message,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setMessage("");
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log(data);
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  return (
    <div className="chatApp">
      <div className="header">
        <p>{Heading.chat}</p>
      </div>
      <div className="body">
        <ScrollToBottom className="message-container">
          {messageList.map((content) => {
            return (
              <div
                className="message"
                id={name === content.name ? "you" : "other"}
              >
                <div>
                  <div className="message-content">
                    <p>{content.message}</p>
                  </div>
                  <div className="message-data">
                    <h5 className="time">{content.time}</h5>
                    <h5 className="name">{content.name}</h5>
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
      </div>
      <div className="footer">
        <Input
          type={Heading.text}
          placeholder="Message"
          onChange={handleInput}
          value={message}
          onKeyPress={handlePressEnter}
        />
        <Button onClick={handleSendMessage} label="Send"/>
      </div>
    </div>
  );
};
export default Chats;
