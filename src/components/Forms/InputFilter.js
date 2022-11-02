import react,{Fragment,useState,useEffect} from 'react'

const InputFilter = (props) =>{

    const [filter,setFilter] = useState(''); 

    const inputFilterHandler = (event) =>{
        setFilter(event.target.value);
    }

   useEffect (() =>{

        const timer = setTimeout(() => {
            props.onInputFilterHandler(filter);
        }, 500);
      
        return () => {
            clearTimeout(timer);
        };

    },[filter])

    return (

        <Fragment>

         <input value={filter} placeholder="Search" onChange={inputFilterHandler}></input>

        </Fragment>

    );

}

export default InputFilter