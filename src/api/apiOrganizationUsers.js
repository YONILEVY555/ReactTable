

import axios from "axios"



export const  getOrganizationUsers = async (body) => {

        return await axios( {
                                method: 'post',
                                url: 'http://54.194.238.190:8080/admin_get_organization_users',
                                headers: {}, 
                                data: body
                             })
}




