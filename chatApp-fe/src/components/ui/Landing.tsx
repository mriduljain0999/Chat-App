"use client"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { Copy } from "../Copy"
import { Loader2 } from "lucide-react"
import { Message } from "../Message"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useEffect, useRef, useState } from "react"
import { Tick } from "../tick"
import { Alert } from "../Alert"
import { useNavigate } from "react-router-dom"
import { useRecoilState, useSetRecoilState } from "recoil"
import { roomAtom } from "@/atoms/roomAtom"
import { socketAtom } from "@/atoms/SocketAtom"
import { messageAtom } from "@/atoms/messageAtom"


export function Landing() {
    const [loading,setLoading]  = useState(false);
    const [link, setLink] = useState("");
    const nameRef = useRef<HTMLInputElement>(null)
    const roomIdRef = useRef<HTMLInputElement>(null)
    const [socket,setSocket] = useRecoilState(socketAtom);
    const navigate = useNavigate();
    const setRoom = useSetRecoilState(roomAtom)
    const setMessages = useSetRecoilState(messageAtom)


    useEffect(() => {
      const ws = new WebSocket("ws://localhost:8080");
      setSocket(ws);
    },[])

    function joinRoom(){
      if(!nameRef.current?.value || nameRef.current?.value.includes(" ")){
        toast(
          <div className="flex items-center gap-3">
            <Alert />
            <p>Please enter a valid name!</p>
          </div>
        )
        return;
      }
      if(!roomIdRef.current?.value || roomIdRef.current?.value.includes(" ")){
        toast(
          <div className="flex items-center gap-3">
            <Alert />
            <p>Please enter a valid room code!</p>
          </div>
        )
        return;
      }

      const userJoinDetails = {
        type: 'join',
        payload:{
          roomId: roomIdRef.current.value,
          username: nameRef.current.value
        }
      }
      socket?.send(JSON.stringify(userJoinDetails));
      if(socket){
        socket.onmessage = (ev) => {
          const data = JSON.parse(ev.data)
          if(data.type == "chat"){
            console.log("chat message from server")
            // @ts-ignore
            setMessages((prevMessages) => [...prevMessages, data]);
          }
          else if(data.status){
            
            if(data.joinedUser == nameRef.current?.value){
              toast(
                <div className="flex items-center gap-3">
                  <Tick />
                  <p>{data.message}</p>
                </div>
              )
            }
            console.log("join message from server")
            setRoom({
              roomId: data.roomId,
              username: data.username,
              joinedUser: data.joinedUser,
              users: data.users
            })
            navigate('/chat')
          }
          else{
            console.log("idk")
            toast(
              <div className="flex items-center gap-3">
                <Alert />
                <p>{data.message}</p>
              </div>
            )
            setRoom((prevRoom) => ({
              ...prevRoom,
              users: data.users,
            }));
          }
        }
      }
      
    }
    

    function linkGenerator(){
      const codePickerArray = ['1','2','3','4','5','6','7','8','9','A','E','I','O','U','B','M','F','G','H','K','L','W','Q','P'];

      let roomId = "";

      for(let i=0;i<6;i++){
        roomId += codePickerArray[Math.floor(Math.random()*(codePickerArray.length -1))]
      }
      return roomId;
    }

    function createRoom(){
      setLoading(true);
      const roomId = linkGenerator();
      const createRoomObj = {
        type:"create",
        payload:{
          roomId
        }
      }
      socket?.send(JSON.stringify(createRoomObj))

      setTimeout(() => {
        setLink(roomId)
        setLoading(false);
        toast(
          <div className="flex items-center gap-3">
            <Tick />
            <p>Room created successfully!</p>
          </div>
        )
      }, 300);
    }


  return (
    <div style={{fontFamily: "JetBrains Mono, serif"}}  className="flex justify-center items-center w-screen h-screen">
        <Card className="w-[50%]">
      <CardHeader>
        <CardTitle> <Message />  Real Time Chat</CardTitle>
        <CardDescription>temporary room that expires after all users exit</CardDescription>
      </CardHeader>
      <CardContent>
          <div className="grid w-full items-center gap-4">
            { loading && <Button size={"lg"} disabled>
                <Loader2 className="animate-spin" />
                Creating room...
            </Button> }
            { !loading && <Button onClick={createRoom} size={"lg"}>Create New Room</Button>}
            <div className="flex flex-col space-y-1.5">
              <Input ref={nameRef} id="name" placeholder="Enter your name" />
            </div>
            <div className="flex w-full items-center space-x-2">
                <Input ref={roomIdRef} type="text" placeholder="Enter Room Code" />
                <Button onClick={joinRoom} size={"lgCustom"}>Join Room</Button>
            </div>
            <div className={`${ link == "" ? 'hidden' : 'flex' } dark:bg-[#262626] dark:text-white text-black bg-[#F5F5F5] flex-col justify-center items-center rounded-md w-full py-5 gap-2`}>
              <p className="text-[#737373] text-sm">Share this code with your friend</p>
              <div className={`flex items-center gap-2`}>
                  <p className="text-2xl font-bold">{link}</p>
                  <Copy text={link} />
              </div>
          </div>
          </div>
          

      </CardContent>
    </Card>
    </div>
  )
}

