import axios from "axios";
class BussinessService {
    serverUrl = process.env.SERVER_APP_URL || "http:localhost:5000/api";

    async getListChat(accessToken: string, _id: string) {
        try {
            var user = await axios.get(
                `http://localhost:5000/api/rooms/${_id}/messages`,
                {
                    headers: { authorization: accessToken as string },
                }
            );
            return user;
        } catch (e) {
            console.log(e);
        }
    }

    async getListFile(accessToken: string) {
        try {
            var user = await axios.get(
                `http://localhost:5000/api/users/profile`,
                {
                    headers: { authorization: accessToken as string },
                }
            );
            return user;
        } catch (e) {
            console.log(e);
        }
    }

    async getListPic(accessToken: string) {
        try {
            var user = await axios.get(
                `http://localhost:5000/api/users/profile`,
                {
                    headers: { authorization: accessToken as string },
                }
            );
            return user;
        } catch (e) {
            console.log(e);
        }
    }
}

export default new BussinessService();
