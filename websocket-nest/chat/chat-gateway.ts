import { webSocketGateway, SubscribeMessage,OnGatewayConnection, OnGatewayDisconnect } from "@nestjs/websockets"
import { Socket, Server } from 'socket.io';

@webSocketGateway(3002, {
    // here we can set cors policy, namespace
    cors: {
        origin: "*", // in real world this should be specific url
        credentials: true
    }
})
export class chatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    // we can think websocket gateway as providers .. it can be injected as
    // a dependency .. it can also inject dependency 

    @WebSocketServer() server: Server; // for broadcast .. io.emit()


    handleConnection(client : Socket ,...args: any[]) {
        console.log("new user connected : ", client.id);// which is socket id
        this.server.emit("user-joined", {
            message : "User Joined the chat"
        })

        // send except the sender
        client.broadcast.emit("user-joined", {
            message : "User Joined the chat"
        }) 

        // to specific room
        client.to("roomName").emit()
    }
    
    handleDisconnect(client : Socket ,...args: any[]) {
        console.log("user disconnected : ", client.id);// which is socket id
        this.server.emit("user-left", {
            message : "User Left the chat"
        })
    }

    @SubscribeMessage('newMessage') // equvalant of socket.on()
    handleNewMessage(@MessageBody() message: any) {
        console.log("")
    }

    @SubscribeMessage('newMessage') // equvalant of socket.on()
    handleNewMessage(client: Socket, message: any) {
        console.log("")

        // this is socket.emit()
        client.emit("reply", "This is a reply ")

        // for broadcast thing .. io.emit()
        this.server.emit("reply", "broadcasting... ")
    }


    
}