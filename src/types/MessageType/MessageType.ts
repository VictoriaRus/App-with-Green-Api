export interface IIncomingMessage {
    idMessage: string,
    timestamp: number,
    typeMessage: string,
    chatId: string,
    senderId: string,
    senderName: string,
    textMessage: string,
    type: string,
}

export interface IOutgoingMessage {
    type: string,
    idMessage: string,
    timestamp: number,
    typeMessage: string,
    chatId: string,
    textMessage: string,
    extendedTextMessage: {
        text: string,
        description: string,
        title: string,
        previewType: string,
        jpegThumbnail: string,
        forwardingScore: number,
        isForwarded: boolean,
    },
    statusMessage: string,
    sendByApi: boolean,
}

export type TMessage = IIncomingMessage | IOutgoingMessage;