import { injectable } from "inversify";
import axios from "axios";
import {User} from "../models/user.model";

@injectable()
export class UserService {

    MGMT_ENDPOINT = 'https://beyond-pluto.eu.auth0.com/api/v2/users/';
    header = {headers: {'authorization':  `Bearer ${process.env.MGMT_TOKEN}`}};

    public authenticateUser = async (gid: string) => {
        let user = await User.find( { gid: gid });
        if (user.length > 0) {
            return user;
        } else {
            const { data } = await axios.get(`${this.MGMT_ENDPOINT}${gid}`, this.header);
            let newUser = new User ({
                fullName: data.name,
                firstName: data.given_name,
                lastName: data.family_name,
                picture: data.picture,
                gid: gid
            });
            await newUser.save();
            return newUser;
        }
    }
}