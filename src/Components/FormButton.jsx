import { useNavigate, useParams } from 'react-router-dom';
import './FormButton.css';

function FormButton(props) {
    const param = useParams();
    const navigate = useNavigate();
    const clickHandler = (e) => { 
        console.log("clicked", e.target.innerText);
        navigate(`/form/${props.value}`);  
    }

    return (
        <div className="form-button-container">
            <button className="form-button" onClick={clickHandler}>{props.value}</button>
        </div>
    );
}

export default FormButton;