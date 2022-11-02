
import {useDrag, useDrop } from 'react-dnd'
import React, {useState} from 'react'
import './ActiveRow.css'
import {BiMoveVertical} from 'react-icons/bi'
import '../table/table.css'

const DND_ITEM_TYPE = 'row'

const Row = ({ row, index, moveRow, clickOnRowHandler,idActiveRow,ShowModal }) => {
    const dropRef = React.useRef(null)
    const dragRef = React.useRef(null)
    
    const [, drop] = useDrop({
      accept: DND_ITEM_TYPE,
      hover(item, monitor) {
        if (!dropRef.current) {
          return
        }
        const dragIndex = item.index
        const hoverIndex = index
     
        if (dragIndex === hoverIndex) {
          return
        }
       
        const hoverBoundingRect = dropRef.current.getBoundingClientRect()
      
        const hoverMiddleY =
          (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      
        const clientOffset = monitor.getClientOffset()
       
        const hoverClientY = clientOffset.y - hoverBoundingRect.top
    
        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
          return
        }
     
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
          return
        }
      
        moveRow(dragIndex, hoverIndex)
  
        item.index = hoverIndex
      },
    })
  
    const [{ isDragging }, drag, preview] = useDrag({
      type: DND_ITEM_TYPE,
      item: () => ({index}),
      collect: monitor => ({
        isDragging: monitor.isDragging(),
      }),
    })
  
    const opacity = isDragging ? 0 : 1
  
    preview(drop(dropRef))
    drag(dragRef)
  
    return (

        
      <tr role="row" ref={dropRef} className={ idActiveRow === row.original.userId ? `Active` : ''} onClick={()=>clickOnRowHandler(row)}>
        {row.cells.map((cell,index) => {
          return index !== row.cells.length -1 ? <td role="cell" {...cell.getCellProps()}>{cell.render('Cell')}</td> : <td role="cell" ref={dragRef}><BiMoveVertical/></td>
        })}
      </tr>
      
    )
  }

  export default Row