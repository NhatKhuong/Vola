import axios from "axios";
class AuthService {
    serverUrl = process.env.SERVER_APP_URL || "http:localhost:5000/api";

    async login(accessToken: string) {
        try {
            
            console.log({ serverUrl: this.serverUrl });
            var user = await axios.get(`http://localhost:5000/api/users/profile`, {
                headers: { authorization: accessToken as string },
            });
            console.log(user);
            return user;
        } catch (e) {
            console.log(e);
            
        }
    }
}

export default new AuthService();
