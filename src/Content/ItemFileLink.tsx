import React from "react";
import style from './ItemFileLink.module.css'
import {RiShareForwardLine} from "react-icons/ri"
import { useDispatch } from "react-redux";
import { oppenModal } from "../redux/statusCommon/slice";

interface Props{
  avatar:string,
  name:string,
  discription?:string,
  time?:Date,
  isFile:boolean
}

function ItemFileLink(props:Props) {
  const dispatch = useDispatch();
    return (
        <div>
            <div className={style.file}>
              <div className={style.file_info_block}>
                <img
                    src={props.avatar}
                    alt=""
                />
                <div className={style.info}>
                    {props.isFile ? 
                    <div>
                      <div className={style.name}>{props.name}</div> 
                      <div className={style.byte}>{props.discription}</div>
                    </div>
                    : <a href={props.name} className={style.name_a}>{props.name}</a>}
                </div>
              </div>
              <div className={style.time_block}>
                <div className={style.share_icon}>
                  <RiShareForwardLine onClick={()=>dispatch(oppenModal())}/>
                </div>
                <div className={style.date}>{props.time?.toDateString()}</div>
              </div>
            </div>
        </div>
    );
}

export default ItemFileLink;
