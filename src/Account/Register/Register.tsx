import { FormEvent, useState } from "react";
import style from "./Register.module.scss";
import classNames from "classnames/bind";
import { Link, useNavigate } from "react-router-dom";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import Input from "../Input/Input";
import { isAllowSubmit } from "../Input/validate";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import authService from "../../services/auth.service";
import { singUpWithEmailAndPassword } from "../../until/firebase/firebaseAuth";
import {getAuth,updateProfile } from "firebase/auth";
import { app } from "../../config/firebase/firebaseConfig";

const cls = classNames.bind(style);

const Register = (): JSX.Element => {
    const [showPassword, setShowPassword] = useState("password");
    const [showcomfpassword, setShowcomfpassword] = useState("password");
    const [avatar, setAvatar] = useState<File | null>(null);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [comfpassword, setComfpassword] = useState("");
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");

    const navigate = useNavigate();

    const handleRegister = async (e: FormEvent) => {
        e.preventDefault();
        if (!isAllowSubmit("form_register")) {
            toast.error("Vui lòng kiểm tra lại thông tin", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            return false;
        } else if(password !== comfpassword){
            toast.error("Vui lòng kiểm tra mật khẩu và mật khẩu xác nhận", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            return false;
        }

    
        singUpWithEmailAndPassword(email, password)
            .then((user:any) => {
                console.log(user);
                
                // user.user.sendEmailVerification();
                // alert("Vui long check email")
                updateProfile(user.user.auth.currentUser, {
                    
                    displayName: `${fullName}`,photoURL: "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"
                  }).then(() => {
                    // Profile updated!
                    // ...
                    console.log(avatar);

                    console.log("update thanh cong");
                    
                  }).catch((error) => {
                    // An error occurred
                    // ...
                    console.log("update that bai");
                    
                  });
                  
                
                navigate("/login");
            })
            .catch((error: any) => {
                toast.error("Có lỗi xảy ra vui lòng thử lại sau", {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            });
    };

    return (
        <div className="limiter">
              <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
		<div className="container-login100">
			<div className="wrap-login100 p-l-20 p-r-20 p-t-20 p-b-20" style={{height:"110vh", width:"400px"}}>
           
				<form className="login100-form validate-form" action="" onSubmit={handleRegister} id="form_register">
					<span className="login100-form-title p-b-20">
						Zalo
					</span>
                    <div className={cls("form_avtar")} style={{textAlign:"center"}}>
                        <img style={{width:"80px"}}
                            src={
                                avatar
                                    ? URL.createObjectURL(avatar)
                                    : "avatar-default-icon.png"
                            }
                            alt=""
                        />
                        <div className="">
                            <label htmlFor="avatar">Chọn ảnh</label>
                            <input
                                type="file"
                                hidden
                                id="avatar"
                                accept=".gif,.jpg,.jpeg,.png"
                                onChange={(e) => {
                                    const fileList = e.target.files;
                                    if (!fileList) return;
                                    setAvatar((prev) => {
                                        return fileList[0];
                                    });
                                }}
                            />
                        </div>
                    </div>

                    <div className="wrap-input100 validate-input m-b-23" data-validate = "NickName is reauired">
						<span className="label-input100">NickName</span>
                         <Input style={{backgroundColor:"#fff"}}
                            type="text"
                            name="name"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            id="name"
                            rule="required"
                        />
						{/* <span className="focus-input100" data-symbol="&#xf206;"></span> */}
					</div>
                    
					<div className="wrap-input100 validate-input m-b-23" data-validate = "Username is reauired">
						<span className="label-input100">Email</span>
                         <Input style={{backgroundColor:"#fff"}}
                            type="text"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            id="email"
                            rule="required|email"
                        />
						{/* <span className="focus-input100" data-symbol="&#xf206;"></span> */}
					</div>

					<div className="wrap-input100 validate-input m-b-23" data-validate="Password is required">
						<span className="label-input100">Password</span>
                        <div style={{display:"flex"}}>
                             <Input
                                type={showPassword}
                                name="password"
                                value={password}
                                onChange={(e: any) =>
                                    setPassword(e.target.value)
                                }
                                rule="required"
                                id="password"
                            />

                            {showPassword === "password" ? (
                                <AiFillEye
                                    onClick={() => setShowPassword("text")}
                                />
                            ) : (
                                <AiFillEyeInvisible
                                    onClick={() => setShowPassword("password")}
                                />
                            )}
                        </div>
						{/* <span className="focus-input100" data-symbol="&#xf190;"></span> */}
					</div>

                    <div className="wrap-input100 validate-input" data-validate="Password is required">
						<span className="label-input100">Confirm Password</span>
                        <div style={{display:"flex"}}>
                             <Input
                                type={showcomfpassword}
                                name="comfpassword"
                                value={comfpassword}
                                onChange={(e: any) =>
                                    setComfpassword(e.target.value)
                                }
                                rule="required"
                                id="comfpassword"
                            />

                            {showcomfpassword === "password" ? (
                                <AiFillEye
                                    onClick={() => setShowcomfpassword("text")}
                                />
                            ) : (
                                <AiFillEyeInvisible
                                    onClick={() =>
                                        setShowcomfpassword("password")
                                    }
                                />
                            )}
                        </div>
						{/* <span className="focus-input100" data-symbol="&#xf190;"></span> */}
					</div>

					
					<div className="container-login100-form-btn mt-4">
						<div className="wrap-login100-form-btn">
							<div className="login100-form-bgbtn"></div>
							<button type="submit" className="login100-form-btn">
								Đăng ký
							</button>
						</div>
					</div>

					<div className="flex-col-c p-t-30">
						<div>
                            <Link to="/login">Đăng nhập</Link>
                        </div>
					</div>
				</form>
			</div>
		</div>
	</div>
    );
};

export default Register;
