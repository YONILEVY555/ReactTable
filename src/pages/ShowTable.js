import react, {Fragment, useEffect} from 'react'
// import Table from '../components/Table'
import BasicTable from '../components/table/Table'
import useHttp from '../hooks/useHttp'
import {getOrganizationUsers} from '../api/apiOrganizationUsers'
import {useDispatch} from  'react-redux'
import {organizationUsersActions} from '../store/slice/organizationUsersSlice'
import {nutificationActions} from '../store/slice/notificationSlice';

const ShowTable = (props) =>{

    const {sendRequest,status,data,error} = useHttp(getOrganizationUsers)
    
    const dispatch = useDispatch();
    
    useEffect(()=>{

        if( status === 'pending'){

            dispatch( nutificationActions.showNotification({
                status: 'pending', 
                title: '',
                message: 'Loading Data......'
            })) 
        } 

        if(status==='success'){

            dispatch( organizationUsersActions.f1({listOrganizationUsers: data.data.content.list,
                                                   pageCount: data.data.content.pageCount,
                                                   pageCurrent: data.data.content.pageCurrent}) );
            
            dispatch( nutificationActions.showNotification({
                status: 'success', 
                title: '',
                message: 'The request was successful'
            }) )             

        }

        if( status === 'error' ){

            dispatch( nutificationActions.showNotification({
                status: 'error', 
                title: '',
                message: 'The request failed'
            }) )  

        }

    },[status])
    
    const {bodyRequestOrganizationUsers} = props

    useEffect(()=>{
        sendRequest(bodyRequestOrganizationUsers)
    },[sendRequest,bodyRequestOrganizationUsers])

    return (
        <Fragment>
            <BasicTable/>
            { data && data.data.content.list.length === 0 && <p>No results received</p>}
        </Fragment>
    );

}

export default ShowTable