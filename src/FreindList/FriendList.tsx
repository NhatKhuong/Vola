import React from "react";
import MesageItem from "./MesageItem";
import { useAppSelector } from "../redux/hook";
import { IRoom } from "../redux/user/slice";

function FriendList() {
  const userState = useAppSelector((state: any) => state.user);
  const listRoom = userState.rooms;
  console.log(listRoom);
  
  return (
    <div style={{ height: "85vh", maxHeight: "85vh", overflow: "scroll" }}>
      {listRoom.map((e: IRoom) => {
        return (
          <MesageItem
            avatar={e.avatar}
            name={e.name}
            messages={e?.messages ? e?.messages[0]?.content : ""}
            time={
              e?.messages?.length === 0
                ? ""
                : formatTime(
                    new Date(e?.messages ? e?.messages[0].createdAt + "" : "")
                  )
            }
            info={false}
            _id={e._id}
            owner={e.owner}
          />
        );
      })}
    </div>
  );
}

const formatTime = (dateTime: Date) => {
  const minute = Math.abs(new Date().getTime() - dateTime.getTime()) / 6e4;
  if (minute < 60) {
    return `${parseInt(minute + "")} minutes ago`;
  }

  const hour = minute / 60;

  if (hour < 24) {
    return `${parseInt(hour + "")} hours ago`;
  }
  const day = hour / 24;
  if (day < 4) {
    return `${parseInt(day + "")} days ago`;
  }

  const year = dateTime.getFullYear();
  const month = dateTime.getMonth() + 1;
  const date = dateTime.getDate();

  return `${date}/${month}/${year}`;
};

export default FriendList;
