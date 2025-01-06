import { atom } from "recoil";

export const socketAtom = atom<WebSocket | undefined>({
    key:"socketAtom",
    default: undefined
})