import FormButton from '../Components/FormButton';
import './HomeScreen.css';
import React, { useEffect, useState } from 'react';
import fire from '../Firebase/FireBase';

function HomeScreen() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = () => {
            fire.getData((newData) => {
                setData(newData);
                console.log("data", newData);
            });
        };
        fetchData();
    }, []);

    useEffect(() => {
        setData(fire.data);
        console.log("data", data);
    }, [fire.data]);

    const handleDelete = (formId) => {
        if (window.confirm('Are you sure you want to delete this form?')) {
            fire.deleteData(formId);
        }
    };

    return (
        <div className='home-screen'>
            <div className='card-list'>
                {
                    Object.keys(data).map((item, index) => (
                        <div key={index} className='card'>
                            <h2 className='card-title'>{item}</h2>
                            <FormButton value={item} />
                            <button className='delete-button' onClick={() => handleDelete(item)}>Delete</button>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default HomeScreen;