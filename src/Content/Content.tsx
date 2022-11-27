import { useState } from "react";
import ImageGrid from "../common/ImageGrid";
import { useAppSelector } from "../redux/hook";
import ChatContent from "./ChatContent";
import style from "./Content.module.css";
import MenuContent from "./MenuContent";

function Content(){
    const roomState = useAppSelector((state)=>state.room)
    const [menu2, setMenu2] = useState(false);
    return (
        // {!roomState._id ? <img src="https://thumbs.dreamstime.com/b/social-media-network-connecting-people-concept-d-render-71561964.jpg" alt="" /> : (
        // <div className={style.content}>

        //     <div className={style.con1} style={{ flex: menu2 ? "0.7" : "1" }}>
        //         <ChatContent showMenuChat={setMenu2}/>
        //     </div>
        //     {menu2 && <div className={style.con2}><MenuContent /></div>}
        // </div>) }
        // <div className={style.content}>

        //     <div className={style.con1} style={{ flex: menu2 ? "0.7" : "1" }}>
        //         <ChatContent showMenuChat={setMenu2}/>
        //     </div>
        //     {menu2 && <div className={style.con2}><MenuContent /></div>}
        // </div>
        <>
             {!roomState._id ? <img src="https://thumbs.dreamstime.com/b/social-media-network-connecting-people-concept-d-render-71561964.jpg" alt="" /> : (
            <div className={style.content}>

                <div className={style.con1} style={{ flex: menu2 ? "0.7" : "1" }}>
                    <ChatContent showMenuChat={setMenu2}/>
                </div>
                {menu2 && <div className={style.con2}><MenuContent /></div>}
            </div>) }
        </>
        
        
    );
};

export default Content;
