import React, { useEffect, useMemo,useState } from 'react'
import { useTable, useSortBy, useExpanded } from 'react-table'
import { COLUMNS } from './columns'
import {useSelector} from 'react-redux'
import './table.css'
import { DndProvider } from 'react-dnd'
import {HTML5Backend} from 'react-dnd-html5-backend'
import Row from '../dragAndDrop/Row'
import update from 'immutability-helper'
import SubTable from './SubTable'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';

 const BasicTable = () => {

  const [idActiveRow, setIdActiveRow] = useState(null);
  const [listData,setListData] = useState()
  const DATA = useSelector( state => state.organizationUsers.listOrganizationUsers )
  const [ShowModal, setShowModal] = useState(false)

  const list = useSelector( state=> state.userAcount.listUserAcount );

  useEffect(()=>{
    setListData(list)
  },[list])
 
  const columns = useMemo(() => COLUMNS, [])

  const [data, setData] = useState(DATA)

  useEffect(()=>{
    setData(DATA)
  },[DATA])

  const {
    nextPage,
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    rows,
    prepareRow,
    setFilter,
    visibleColumns,
    state: { expanded }
  } = useTable({
    columns,
    data,
    initialState: { pageSize: 25 }
  },
  useSortBy,
  useExpanded
  )

  const moveRow = (dragIndex, hoverIndex) => {
    const dragRecord = data[dragIndex]
    setData(
      update(data, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragRecord],
        ],
      })
    )
  }
  
  const clickOnRowHandler = (row) =>{
        setIdActiveRow(row.original.userId);
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div >
      <table role="table" {...getTableProps()} >
        <thead role="rowgroup">
          {headerGroups.map(headerGroup => (
            <tr role="row" {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th role="columnheader" {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                   <span>
                   {column.isSorted
                     ? column.isSortedDesc
                       ? ' 🔽'
                       : ' 🔼'
                     : ''}
                 </span>
                 </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row,index) =>{ 
            
          prepareRow(row); 
          
          return (
          
          <React.Fragment>

          <Row
              kew={index}
              index={index}
              row={row}
              moveRow={moveRow}
              clickOnRowHandler = {clickOnRowHandler}
              idActiveRow = {idActiveRow}
              {...row.getRowProps()}
          />
                
            {row.isExpanded ? (
                <tr>
                  <td colSpan={visibleColumns.length}>
                      <SubTable key={index} list={listData} />
                  </td>
                </tr>

              ) : null}

            </React.Fragment>

          );
                    
            })}
        </tbody>
      </table>

      <div>
            <p>total of rows: {rows.length}</p>
      </div>
      </div>
      </DndProvider>
  )
}

export default BasicTable