import axios from "axios"

export const getUserAcount = async (body) => {

        return await axios( {
                                method: 'post',
                                url: 'http://54.194.238.190:8080/admin_get_user_accounts',
                                headers: {}, 
                                data: body
                             })
}