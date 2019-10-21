import { Message } from "./message.model";

export interface Thread{
    id: string;
    lastSeenBy: string[];
    messages: Message[];
    participants: string[];
}