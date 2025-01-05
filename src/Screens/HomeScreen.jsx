import FormButton from '../Components/FormButton';
import './HomeScreen.css';
import React, { use, useEffect, useState } from 'react';
import fire from '../Firebase/FireBase'
import firebase from '../Firebase/FireBase';

function HomeScreen() {
    const list = [1, 2, 3, 4, 5]
    const [data, setData] = useState([]);
    // const [refresh, setRefresh] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
          fire.getData((newData) => {
                setData(newData);
                console.log("data", newData);
            });
        };
        fetchData();
    }, []);

    useEffect(() => {
        setData(fire.data);
        console.log("data" ,data);
        // setRefresh(prev => !prev);    
       
    }, [fire.data])

    return (
        <div className='home-screen'>

            <div className='btn-list'>
                {
                Object.keys(data).map((item, index) => {
                    return(
                    < div key = {index}>
                    <FormButton value={item}></FormButton>
                    </div> 
                    )   
                })
                
                }

            </div>

        </div>
    );
}

export default HomeScreen;
