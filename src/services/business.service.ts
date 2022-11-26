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
            console.log(user);
            return user;
        } catch (e) {
            console.log(e);
        }
    }

    async getListFile(data: any, id: string) {
        const { accessToken, _id } = data;

        try {
            var user = await axios.get(
                `https://frozen-caverns-53350.herokuapp.com/api/rooms/${_id}/messages?type=file`,
                {
                    headers: { authorization: accessToken as string },
                }
            );
            console.log({ listFile: user });
            return user;
        } catch (e) {
            console.log(e);
        }
    }

    async getListPic(data: any, id: string) {
        const { accessToken, _id } = data;
        try {
            var user = await axios.get(
                `https://frozen-caverns-53350.herokuapp.com/api/rooms/${_id}/messages?type=image`,
                {
                    headers: { authorization: accessToken as string },
                }
            );
            console.log({ listImage: user });
            return user;
        } catch (e) {
            console.log(e);
        }
    }
}

export default new BussinessService();
