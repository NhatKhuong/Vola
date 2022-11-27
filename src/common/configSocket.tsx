import React, {
    createContext,
    FunctionComponent,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";
import io, { Socket } from "socket.io-client";
import { useAppSelector } from "../redux/hook";

export const SocketContext = createContext<Socket | null>(null);

const SocketProvider: FunctionComponent<{ children: ReactNode }> = ({
    children,
}: {
    children: ReactNode;
}) => {
    const [connection, setConnection] = useState<Socket | null>(null);
    const accessToken = useAppSelector((state: any) => state.user).accessToken;
    useEffect(() => {
        try {
            const socketConnection = io("http://localhost:5000", {
                query: {
                    token: accessToken,
                },
            });
            setConnection(socketConnection);
        } catch (err) {
            console.log(err);
        }
    }, []);
    return (
        <SocketContext.Provider value={connection}>
            {children}
        </SocketContext.Provider>
    );
};
export const useSocket = (): Socket | null => {
    const ctx = useContext(SocketContext);
    if (ctx === undefined) {
        throw new Error(
            "useWebsocket can only be used inside WebsocketContext"
        );
    }
    return ctx;
};
export default SocketProvider;
