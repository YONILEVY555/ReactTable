import {Fragment,useState,useReducer,useEffect} from 'react'
import './App.css';
import ShowTable from './pages/ShowTable';
import {useSelector} from 'react-redux'
import Notification from './components/ui/Notification';
import NavigatePages from './components/ui/NavigatePages';
import InputFilter from './components/Forms/InputFilter'
import AutoRefresh from './components/AutoRefresh'
import Modal from "./components/Forms/Modal";
import ModalForm from './components/Forms/ModalForm';
import useHttp from './hooks/useHttp'
import {getUserAcount} from './api/apiUserAcount'
import {useDispatch} from  'react-redux'
import {userAcountActions} from './store/slice/userAcountSlice'
import {formActions} from './store/slice/formSlice'

const reducer = (prevState, action) => {

  switch (action.type) {

    case 'updatePage':
      return {
                "content": {
                "organizationCode": prevState.content.organizationCode,
                "pageNum": action.numberPage,
                "searchText": prevState.content.searchText
                }
             };

             break;

    case 'filter':
      return {
                "content": {
                "organizationCode": prevState.content.organizationCode,
                "pageNum": '1',
                // prevState.content.pageNum,
                "searchText": action.valSearch
                }
      };

      break;

    default:
      throw new Error();
  }
}


function App() {

  const [bodyRequestOrganizationUsers, dispatch] = useReducer(reducer,{
                                                                        "content": {
                                                                        "organizationCode": "Ivory",
                                                                        "pageNum": "1",
                                                                        "searchText": ""
                                                                        }
                                                                      });



  const notification = useSelector(state=>state.notification.notification)

  const updatedPage = (numberPage) =>{
        dispatch({
          type: 'updatePage',
          numberPage: numberPage.toString()
        })
  }

  const filter = (valSearch) =>{
    dispatch({
      type: 'filter',
      valSearch: valSearch
    })
  }

  const udispatch = useDispatch();

  const showForm = useSelector(state => state.form.showForm);

  const {sendRequest,status,data,error} = useHttp(getUserAcount)

  useEffect(()=>{

       if(status==='success')
       udispatch(userAcountActions.upadteState(data.data.content.list))

  },[status]);

  useEffect(()=>{

      sendRequest({
                      "content": {        
                            "userId": "264"
                      },
                      "userId": "264",
                      "sessionId": "123-123"
                  }
      )

  },[]);

  const showModalHandler = () =>{
    udispatch(formActions.updateShowForm(true))
    udispatch(formActions.updateDataforUpdate(null))
    udispatch(formActions.setStatus('Add'))
  }

  const statusModal = useSelector(state=>state.form.status)

  return (

    <Fragment>


    {notification && (
      <Notification
        status={notification.status}
        title={notification.title}
        message={notification.message}
      />
    )}
    
    <div className='wrapper' >
      <button  onClick={showModalHandler}>Show Modal</button>
      <AutoRefresh/>
    </div>

    <Modal title={`${statusModal} User`} User onClose={() => udispatch(formActions.updateShowForm(false))} show={showForm}>
              <ModalForm/>
    </Modal>

    <InputFilter onInputFilterHandler={filter}/>

    <ShowTable bodyRequestOrganizationUsers={bodyRequestOrganizationUsers}/>
    
    <NavigatePages className='wrapper' updatedPage={updatedPage} currentPage={Number(bodyRequestOrganizationUsers.content.pageNum)}/>
    
    </Fragment>

  );
}

export default App;
