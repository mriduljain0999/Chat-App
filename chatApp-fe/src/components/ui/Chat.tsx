"use client";

import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Copy } from "../Copy";
import { useRecoilValue } from "recoil";
import { roomAtom } from "@/atoms/roomAtom";
import { toast } from "sonner";
import { Tick } from "../tick";
import { messageAtom } from "@/atoms/messageAtom";
import { socketAtom } from "@/atoms/SocketAtom";

interface roomInterface {
  roomId: string;
  username: string;
  joinedUser: string;
  users: number;
  message?: string;
}

interface messageInterface{
  senderUsername: string;
  content: string;
  socketUsername: string;
}

export function Chat() {
  const room: roomInterface = useRecoilValue(roomAtom);
  const messages: messageInterface[] = useRecoilValue(messageAtom)
  const socket = useRecoilValue(socketAtom);
  const messageRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
        console.log(room);
    toast(
      <div className="flex items-center gap-3">
        <Tick />
        <p>{room.joinedUser} joined the room</p>
      </div>
    );
  }, [room.joinedUser]);

  const handleSendMessage = () => {
    const chatObject = {
      type:'chat',
      payload:{
        message: messageRef.current?.value,
        roomId: room.roomId
      }
    }
    socket?.send(JSON.stringify(chatObject))
  };

  return (
    <div
      style={{ fontFamily: "JetBrains Mono, serif" }}
      className="flex w-screen h-screen justify-center items-center"
    >
      <div className="w-[50%] flex flex-col gap-6">
        <div
          className={`flex dark:bg-[#262626] dark:text-[#A3A3A3] text-black bg-[#F5F5F5] justify-between items-center rounded-md w-full py-2 px-5 gap-2`}
        >
          <div className={`flex items-center gap-3`}>
            <p>Room Code:</p>
            <p className="font-medium">{room.roomId}</p>
            <Copy text={room.roomId} />
          </div>
          <div className={`flex items-center gap-2`}>
            <p>Users:</p>
            <p>{room.users}</p>
          </div>
        </div>
        <Card className="w-full h-[28rem] flex flex-col">
          <CardContent className="flex-grow overflow-hidden">
            <ScrollArea className="h-full">
              {messages.map((message,index) => (
              <div
                key={index}
                className={`mb-4 ${
                  message.senderUsername === room.username ? 'text-right' : 'text-left'
                }`}
              >
                {message.senderUsername !== room.username && (
                  <div className="text-xs text-muted-foreground mb-1">
                    {message.senderUsername}
                  </div>
                )}
                <span
                  className={`max-w-[50%] mr-7 inline-block p-2 rounded-lg ${
                    message.senderUsername === room.username
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary'
                  }`}
                >
                  {message.content}
                </span>
              </div>
            ))}
            </ScrollArea>
          </CardContent>
          <CardFooter>
            <div className="flex w-full gap-2">
              <Input ref={messageRef} placeholder="Type your message..." />
              <Button onClick={handleSendMessage} type="submit">
                Send
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
