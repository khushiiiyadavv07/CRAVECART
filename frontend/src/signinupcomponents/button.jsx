
function ButtonElement({text, onClick}){
    return(
        <div className="btndiv">
            <button onClick={onClick}>{text}</button>
        </div>
    );
}

export default ButtonElement