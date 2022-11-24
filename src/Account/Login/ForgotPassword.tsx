import { useState, FormEvent, useEffect } from "react";
import style from "./Login.module.scss";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Input from "../Input/Input";
import { isAllowSubmit } from "../Input/validate";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import userAPI from "../../redux/user/userAPI";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import tokenService from "../../services/token.service";

import {
  loginWithEmailAndPassword,
  loginWithGoogle,
  sendRequestForgotPassword,
} from "../../until/firebase/firebaseAuth";

import "./vendor/bootstrap/css/bootstrap.min.css";
import "./fonts/font-awesome-4.7.0/css/font-awesome.min.css";
import "./fonts/iconic/css/material-design-iconic-font.min.css";
import "./vendor/animate/animate.css";
import "./vendor/css-hamburgers/hamburgers.min.css";
import "./vendor/animsition/css/animsition.min.css";
import "./vendor/select2/select2.min.css";
import "./vendor/daterangepicker/daterangepicker.css";
import "./css/main.css";
import "./css/util.css";
import roomAPI from "../../redux/Room/roomAPI";
import { clear } from "../../redux/Room/slice";
import { Navigation } from "swiper";

const cls = classNames.bind(style);
const ForgotPassword = (): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const userState = useAppSelector((state: any) => state.user);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (userState.is_login) {
      navigate("/");
    } else {
      if (userState.error) {
        (document.getElementById("message_login") as HTMLDivElement).innerHTML =
          "Tài khoản hoặc mật khẩu sai";
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userState]);

  const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  const hanldPressLinkResert = (e: FormEvent)=>{
    console.log(username);
    e.preventDefault();
    if(username === ""){
      // alert("Email không được rỗng")
      toast.error("Vui lòng nhập email", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    else if(regexEmail.test(username)){
        sendRequestForgotPassword(username).then(()=>{
          alert("Link thây đổi mật khẩu đã được gửi về email của bạn")
          // alert("Link thây đổi mật khẩu đã được gửi về email của bạn")
          navigate("/login");
        }).catch((err)=>{
          toast.error("Đã xẩy ra lỗi", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          // alert("Đã xẩy ra lỗi")
        });
    }
    else{
      toast.error("Đã xẩy ra lổi, vui lòng kiểm tra lại", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true, 
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      // alert("Đã xẩy ra lỗi")
    }
   
}

  // const handleLogin = (e: FormEvent) => {
  //   e.preventDefault();
  //   if (!isAllowSubmit("form_login")) {
  //     return false;
  //   } else {
  //     loginWithEmailAndPassword(username, password)
  //       .then((result: any) => {
  //         // if (!result.user.emailVerified) {
  //         //   alert("Email chưa được xác thực vui lòng kiểm tra hộp thư của bạn");
  //         //   return;
  //         // }

  //         var accessToken = "Bearer " + result.user.accessToken;
  //         dispatch(userAPI.getUserInfo()(accessToken));
  //         dispatch(clear());
  //         navigate("/");
  //       })
  //       .catch((err) => {
  //         toast.error("Có lỗi xảy ra vui lòng thử lại sau", {
  //           position: "top-center",
  //           autoClose: 3000,
  //           hideProgressBar: false,
  //           closeOnClick: true,
  //           pauseOnHover: true,
  //           draggable: true,
  //           progress: undefined,
  //         });
  //       });
  //   }
  // };
  // const handleLoginWithGoogle = () => {
  //   // loginWithGoogle();
  //   loginWithGoogle()
  //     .then((user: any) => {
  //       navigate("/");
  //       var accessToken = "Bear " + user.user.accessToken;
  //       dispatch(userAPI.getUserInfo()(accessToken));
  //     })
  //     .catch((err) => {
  //       toast.error("Có lỗi xảy ra vui lòng thử lại sau", {
  //         position: "top-center",
  //         autoClose: 3000,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //         progress: undefined,
  //       });
  //     });
  // };

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
        <div
          className="wrap-login100 p-l-30 p-r-30 p-t-35 p-b-30"
          style={{ width: "400px", height: "95vh" }}
        >
          <form
            className="login100-form validate-form"
            action=""
            onSubmit={hanldPressLinkResert}
            id="form_login"
          >
            <span className="login100-form-title p-b-50">Zalo</span>

            <div
              className="wrap-input100 validate-input m-b-23"
              data-validate="Username is reauired"
            >
              <span className="label-input100">Email</span>
              <Input
                type="text"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                rule="required"
                id="username"
              />
              {/* <span className="focus-input100" data-symbol="&#xf206;"></span> */}
            </div>

            <div className="container-login100-form-btn">
              <div className="wrap-login100-form-btn">
                <div className="login100-form-bgbtn"></div>
                <button className="login100-form-btn">CHANGE PASSWORD</button>
              </div>
            </div>


            <div className="txt1 text-center p-t-20 p-b-20">
              <span>Or Sign Up Using</span>
            </div>

            <div className="flex-c-m">
              <a href="#top" className="login100-social-item bg1">
                <i className="fa fa-facebook"></i>
              </a>

              <a href="#top" className="login100-social-item bg2">
                <i className="fa fa-twitter"></i>
              </a>

              <a href="#top" className="login100-social-item bg3">
                <i className="fa fa-google"></i>
              </a>
            </div>

            <div className="flex-col-c p-t-30">
              <div>
                <Link to="/register">Sign Up</Link>
              </div>
              <div>
                <Link to="/login">Login</Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
