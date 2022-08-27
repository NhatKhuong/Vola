import { useState } from "react";
import style from "./ExpandComponent.module.css";
import { MdKeyboardArrowDown } from "react-icons/md";

interface Props {
    children: JSX.Element;
    title: string;
}

function ExpandComponent(props: Props) {
    const [visibleImages, setVisibleImages] = useState(false);
    return (
        <div>
            <div
                className={style.menuContent_pic_head}
                onClick={() => setVisibleImages((prev) => !prev)}
            >
                <div className={style.menuContent_pic_name}>{props.title}</div>
                <div className={style.menuContent_pic_icon}>
                    <MdKeyboardArrowDown
                        style={{
                            transform: visibleImages
                                ? "rotate(0deg)"
                                : "rotate(180deg)",
                        }}
                    />
                </div>
            </div>
            {visibleImages && props.children}
        </div>
    );
}

export default ExpandComponent;
