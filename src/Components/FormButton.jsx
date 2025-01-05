import './FormButton.css';


function FormButton(props) {

    const clickHandler = (e) => { 
        console.log("clicked", e.target.innerText);   
        }

    return (
        <div>
            <button onClick={clickHandler}>{props.value}</button>
        </div>
    );
}

export default FormButton;
