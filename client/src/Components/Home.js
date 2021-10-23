import React, { useState } from "react";
import io from "socket.io-client";
import { Heading } from "../Constants/Heading";
import { Button } from "./Button";
import Chats from "./Chats";
import { Input } from "./Input";

const socket = io.connect("http://localhost:3001");

export const Home = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const handleInput = (e) => {
    setName(e.target.value);
  };

  const handleRoom = (e) => {
    setRoom(e.target.value);
  };

  const handleClick = () => {
    if (name !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  return (
    <div className="App">
      {!showChat ? (
        <div className="chat">
          <h1>{Heading.name}</h1>
          <Input
            type={Heading.text}
            placeholder="Enter your name"
            onChange={handleInput}
          />
          <Input
            type={Heading.text}
            placeholder="Enter the room code"
            onChange={handleRoom}
          />
          <Button onClick={handleClick} label="Join A Room"/>
        </div>
      ) : (
        <Chats socket={socket} name={name} room={room} />
      )}
    </div>
  );
};
