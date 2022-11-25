import axios from "axios";
class BussinessService {
    serverUrl = process.env.SERVER_APP_URL || "http:localhost:5000/api";

    async getListChat(accessToken: string, _id: string) {
        try {
            var user = await axios.get(
                `https://frozen-caverns-53350.herokuapp.com/api/rooms/${_id}/messages`,
                {
                    headers: { authorization: accessToken as string },
                }
            );
            return user;
        } catch (e) {
            console.log(e);
        }
    }

    async getListFile(accessToken: string, _id: string) {
        try {
            var user = await axios.get(
                `https://frozen-caverns-53350.herokuapp.com/api/rooms/${_id}/messages?type=file`,
                {
                    headers: { authorization: accessToken as string },
                }
            );
            return user;
        } catch (e) {
            console.log(e);
        }
    }

    async getListPic(accessToken: string, _id: string) {
        try {
            var user = await axios.get(
                `https://frozen-caverns-53350.herokuapp.com/api/rooms/${_id}/messages?type=image`,
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
