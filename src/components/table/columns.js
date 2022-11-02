import react,{useMemo,useState} from 'react'
import { format } from 'date-fns'
import {AiFillDelete} from "react-icons/ai";
import {GrDocumentUpdate} from 'react-icons/gr'
import {AiOutlineMenu} from 'react-icons/ai'
import { useDispatch } from 'react-redux';
import {organizationUsersActions} from '../../store/slice/organizationUsersSlice'
import {formActions} from '../../store/slice/formSlice'
import './columns.css'
import Modal from '../Forms/Modal'

export const COLUMNS = [
  {
    id: "expander",
    Header: ({ getToggleAllRowsExpandedProps, isAllRowsExpanded }) => (
      <span {...getToggleAllRowsExpandedProps()}>
        {isAllRowsExpanded ? "👇" : "👉"}
      </span>
    ),
    Cell: ({ row }) => (
      <span {...row.getToggleRowExpandedProps()}>
        {row.isExpanded ? "👇" : "👉"}
      </span>
    )
  },
  {
  Header: 'Name',
  Footer: 'Name',
  columns: [
  {
    Header: 'userId',
    Footer: 'userId',
    accessor: 'userId',
    Cell: (val) => {
      return(
        <>
        { val.cell.row.original.userId>=100 && <p style={{ color: 'red' }} >{val.cell.row.original.userId}</p> }
        { val.cell.row.original.userId<100 && <p>{val.cell.row.original.userId}</p> }
        </>
      )
   }
  },
  {
    Header: 'firstName',
    Footer: 'firstName',
    accessor: 'firstName',
    sticky: 'left',
  },
  {
    Header: 'lastName',
    Footer: 'lastName',
    accessor: 'lastName',
    sticky: 'left',
  }]
 },

  {
    Header: 'Info',
    Footer: 'Info',
    columns: [
  {
    Header: 'organizationCode',
    Footer: 'organizationCode',
    accessor: 'organizationCode',
    sticky: 'left',
  },
  {
    Header: 'lastLoginDate',
    Footer: 'lastLoginDate',
    accessor: 'lastLoginDate',
    // Cell: ({ value }) => {
    //   return format(new Date(value), 'dd/MM/yyyy')
    // }
  },
  {
    Header: 'email',
    Footer: 'email',
    accessor: 'email'
  },
  {
    Header: 'status',
    accessor: 'status'
  },]
 },
 {
  Header: 'Action',
  columns: [
  {
    Header: 'delete',
    accessor: 'delete',
    Cell: (val) => {

      const dispatch = useDispatch()

      const deleteRowHandler = () =>{
        dispatch(organizationUsersActions.deleteRow(val.cell.row.original.userId))
      }

       return(
           <AiFillDelete  onClick={deleteRowHandler}/>
       )
    }
  },
  {
    Header: 'update',
    accessor: 'update',
    Cell: (val) => {

      const dispatch = useDispatch()

      const updateHandler = () =>{
        dispatch(formActions.updateShowForm(true))
        dispatch(formActions.updateDataforUpdate(val.cell.row.original))
        dispatch(formActions.setStatus('Update'))
      }

      return(
          <GrDocumentUpdate onClick={updateHandler}/>
      )
   }
  },
  {
    Header: 'menu',
    accessor: 'menu',
    Cell: (val) => {
        
      const [valOption,setValOption] = useState('Select')

      const dispatch = useDispatch()

      const deleteRowHandler = () =>{
        dispatch(organizationUsersActions.deleteRow(val.cell.row.original.userId))
      }

      const onChangeHandler = (event) => {

        setValOption(event.target.value)

        if (event.target.value === "Delete") {
           deleteRowHandler();
           setValOption('Select')
        }

        if (event.target.value === "Update") {
            dispatch(formActions.updateShowForm(true))
            dispatch(formActions.updateDataforUpdate(val.cell.row.original))
            dispatch(formActions.setStatus('Update'))
            console.log(val.cell.row.original)
            setValOption('Select')
        }

      }

      return(
    
            <select className="classic" onChange={onChangeHandler} value={valOption} >
                <option value="Select" selected disabled hidden>menu</option>
                 <option value="Delete">Delete</option>
                <option value="Update">Update</option>
           </select> 

      )
   }
  },
  {
    Header: 'move',
    accessor: 'move',
  },]
 },
]

