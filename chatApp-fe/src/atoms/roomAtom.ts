import { atom } from "recoil";

export const roomAtom = atom({
    key: 'roomAtom',
    default:{
        roomId: "",
        username: "",
        joinedUser: "",
        users: 0
    }
})