import { io } from 'socket.io-client'

export const socket = io('http://localhost:5353')
export const adminSocket = io('http://localhost:5353/admin')
