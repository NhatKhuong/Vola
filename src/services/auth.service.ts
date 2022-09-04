import { axiosNotAuth, axiosAuth } from "../services/axiosConfig";
import tokenService from "./token.service";

class AuthService {
    login(userName: string, password: string) {
        return axiosNotAuth({
            url: "/user/login",
            method: "post",
            data: {
                userName,
                password,
            },
        });
    }
    getUserInfo() {
        return axiosAuth({
            url: "/user/get-user-info/",
            method: "get",
        });
    }
    register(data: FormData) {
        return axiosNotAuth({
            url: "/user/register/",
            method: "post",
            data,
        });
    }
    getRetPasswordToken(email: string) {
        // send mail
        return axiosNotAuth({
            url: "/user/send-mail-password/",
            method: "post",
            data: {
                email,
            },
        });
    }
    handleResetPassword(data: {
        toke: string;
        uidb64: string;
        password: string;
    }) {
        return axiosNotAuth({
            url: "/user/reset-password/",
            method: "post",
            data: { ...data },
        });
    }
}

export default new AuthService();