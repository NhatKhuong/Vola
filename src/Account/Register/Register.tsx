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

        // const formData = new FormData();
        // formData.append("userName", username);
        // formData.append("password", password);
        // formData.append("email", email);
        // formData.append("fullName", fullName);
        // if (avatar) formData.append("avatar", avatar as File, avatar?.name);
        singUpWithEmailAndPassword(email, password)
            .then((user) => {
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
        // <div className={cls("register_wrapper")}>
            // <ToastContainer
            //     position="top-center"
            //     autoClose={5001}
            //     hideProgressBar={false}
            //     newestOnTop={false}
            //     closeOnClick
            //     rtl={false}
            //     pauseOnFocusLoss
            //     draggable
            //     pauseOnHover
            // />
        //     <div className={cls("register")}>
        //         <form action="" onSubmit={handleRegister} id="form_register">
        //             <div className={cls("form_avtar")}>
        //                 <img
        //                     src={
        //                         avatar
        //                             ? URL.createObjectURL(avatar)
        //                             : "avatar-default-icon.png"
        //                     }
        //                     alt=""
        //                 />
        //                 <label htmlFor="avatar">Chọn ảnh</label>
        //                 <input
        //                     type="file"
        //                     hidden
        //                     id="avatar"
        //                     accept=".gif,.jpg,.jpeg,.png"
        //                     onChange={(e) => {
        //                         const fileList = e.target.files;
        //                         if (!fileList) return;
        //                         setAvatar((prev) => {
        //                             return fileList[0];
        //                         });
        //                     }}
        //                 />
        //             </div>
        //             {/* <div className={cls("form_group")}>
        //                 <label htmlFor="">Tài khoản</label>
        //                 <Input
        //                     type="text"
        //                     name="username"
        //                     rule="required"
        //                     id="username"
        //                     value={username}
        //                     onChange={(e: any) => {
        //                         setUsername(e.target.value);
        //                     }}
        //                 />
        //             </div> */}
        //             <div className={cls("form_group")}>
        //                 <label htmlFor="">Email</label>
        //                 <Input
        //                     type="text"
        //                     name="email"
        //                     value={email}
        //                     onChange={(e) => setEmail(e.target.value)}
        //                     id="email"
        //                     rule="required|email"
        //                 />
        //             </div>
        //             <div className={cls("form_password")}>
        //                 <label htmlFor="">Mật khẩu</label>
        //                 <div>
        //                     <Input
        //                         type={showPassword}
        //                         name="password"
        //                         value={password}
        //                         onChange={(e: any) =>
        //                             setPassword(e.target.value)
        //                         }
        //                         rule="required"
        //                         id="password"
        //                     />

        //                     {showPassword === "password" ? (
        //                         <AiFillEye
        //                             onClick={() => setShowPassword("text")}
        //                         />
        //                     ) : (
        //                         <AiFillEyeInvisible
        //                             onClick={() => setShowPassword("password")}
        //                         />
        //                     )}
        //                 </div>
        //             </div>
        //             <div className={cls("form_password")}>
        //                 <label htmlFor="">Xác nhận mật khẩu</label>
        //                 <div>
        //                     <Input
        //                         type={showcomfpassword}
        //                         name="comfpassword"
        //                         value={comfpassword}
        //                         onChange={(e: any) =>
        //                             setComfpassword(e.target.value)
        //                         }
        //                         rule="required"
        //                         id="comfpassword"
        //                     />

        //                     {showcomfpassword === "password" ? (
        //                         <AiFillEye
        //                             onClick={() => setShowcomfpassword("text")}
        //                         />
        //                     ) : (
        //                         <AiFillEyeInvisible
        //                             onClick={() =>
        //                                 setShowcomfpassword("password")
        //                             }
        //                         />
        //                     )}
        //                 </div>
        //             </div>
        //             <div className={cls("form_group")}>
        //                 <label htmlFor="">Họ tên</label>
        //                 <Input
        //                     type="text"
        //                     name="fullName"
        //                     value={fullName}
        //                     onChange={(e) => setFullName(e.target.value)}
        //                     id="fullName"
        //                     rule="required"
        //                 />
        //             </div>
        //             <button type="submit">Đăng ký</button>
        //         </form>
        //         <div className={cls("redirect")}>
        //             <Link to="/login">Đăng nhập</Link>
        //         </div>
        //     </div>
        // </div>
        <div className="limiter">
              <ToastContainer
                position="top-center"
                autoClose={5001}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
		<div className="container-login100">
			<div className="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-54">
           
				<form className="login100-form validate-form" action="" onSubmit={handleRegister} id="form_register">
					<span className="login100-form-title p-b-49">
						Zalo
					</span>
                    <span className="login100-title p-b-49">
						
                        Đăng ký tài khoản Zalo
                        để kết nối với ứng dụng Zalo Web
					</span>
                    
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

					<div className="wrap-input100 validate-input" data-validate="Password is required">
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

					<div className="flex-col-c p-t-155">
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
