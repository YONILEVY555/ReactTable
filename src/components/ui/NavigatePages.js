import { Fragment,useState } from "react";
import './NavigatePages.css'

const NavigatePages = (props) =>{

    const onPrevHandler = () =>{
        
        props.updatedPage(props.currentPage - 1)

    }

    const onForwardHandler = () =>{

          props.updatedPage(props.currentPage + 1)

    }

    return(

        <Fragment>

            <div className="center">
             <button className="button buttonCircle" onClick={onForwardHandler} >+</button>
                <span>{props.currentPage}</span>
             <button className="button buttonCircle" onClick={onPrevHandler} >-</button>
             </div>

        </Fragment>

    );

}

export default NavigatePages