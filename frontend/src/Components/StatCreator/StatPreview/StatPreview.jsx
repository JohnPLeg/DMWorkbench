import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios';

function StatPreview() {
    const location = useLocation();
    const monsterName = (location.state.monster).replaceAll(' ','-').toLowerCase();;
    const [monster, setMonster] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`https://www.dnd5eapi.co/api/2014/monsters/${monsterName}`)
                if (res.data.name === monsterName) {
                    setMonster(res.data);      
                }
                console.log(res.data);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);
    
    return (
        <>
        
        </>
    )
    
}

export default StatPreview;