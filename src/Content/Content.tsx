import { useState } from "react";
import ChatContent from "./ChatContent";
import style from "./Content.module.css";
import MenuContent from "./MenuContent";

const Content = () => {
    const [menu2, setMenu2] = useState(true);
    return (
        <div className={style.content}>
            <div className={style.con1} style={{ flex: menu2 ? "0.7" : "1" }}>
                {/* <button
                    onClick={() => {
                        setMenu2((prev) => !prev);
                    }}
                >
                    abc
                </button> */}
                <ChatContent />
            </div>
            {menu2 && <div className={style.con2}><MenuContent /></div>}
        </div>
        
        
    );
};

export default Content;
