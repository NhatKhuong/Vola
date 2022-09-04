import { useState, FormEvent, useEffect } from "react";
import style from "./Login.module.scss";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Input from "../Input/Input";
import { isAllowSubmit } from "../Input/validate";
const cls = classNames.bind(style);

const Login = (): JSX.Element => {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className={cls("login_wrapper")}>
            <div className={cls("login")}>
                <div className={cls("login_title")}>
                    <div>Đăng nhập</div>
                    <div>
                        <Link to="/register">Đăng ký</Link>
                    </div>
                </div>
                <div id="message_login" className={cls("message_login")}></div>
                <form action="" id="form_login">
                    <div className={cls("form_group")}>
                        <label htmlFor="">Tài khoản</label>
                        <Input
                            type="text"
                            name="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            rule="required"
                            id="username"
                        />
                    </div>
                    <div className={cls("form_group")}>
                        <label htmlFor="">Mật khẩu</label>
                        <Input
                            type="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            rule="required"
                            id="password"
                        />
                    </div>
                    <Link
                        to="/forgot-password"
                        className={cls("forgot_password")}
                    >
                        Quên mật khẩu
                    </Link>
                    <button type="submit">Đăng nhập</button>
                </form>
                <div className={cls("login_or")}>
                    <div></div>
                    <div>or</div>
                    <div></div>
                </div>
                <button className={cls("login_gg")}>
                    <span></span> Login with Google
                </button>
            </div>
        </div>
    );
};

export default Login;