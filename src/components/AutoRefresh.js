

const AutoRefresh = () =>{

    const refreshHandler = () =>{
        window.location.reload(false)
    }

    return (
        <button onClick={refreshHandler}>Refresh</button>
    )

}

export default AutoRefresh