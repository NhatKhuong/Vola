import React from "react";
import MesageItem from "./MesageItem";
import { useAppSelector } from "../redux/hook";
import { IRoom } from "../redux/user/slice";

function FriendList() {
    const userState = useAppSelector((state: any) => state.user);
    const listRoom = userState.rooms;
    console.log(userState);
    
    console.log(listRoom);
    

    return (
        <div style={{height:"85vh",maxHeight:"85vh", overflow:"scroll"}}>
            {
               listRoom.map((e: IRoom) => {
                    return (
                        <MesageItem
                            avatar={e.avatar}
                            name={e.name}
                            messages={e.messages[0]?.content}
                            time={e.createdAt+""}
                            info={false}
                            _id = {e._id}    
                        />
                    );
                })
            }
        </div>
    )
}

export default FriendList;
