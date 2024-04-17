import React, {useState, useEffect} from "react";
import PlayerIcon from "../components/player_icons";
import NavBar from "../components/navbar";

function Home() {

    const [data, setData] = useState({
        columns: [],
        results: []
    });

    async function getPlayers(){
        fetch("http://127.0.0.1:5000/players").then((res) => res.json()).then((data) => {
        setData({
            columns: data.columns,
            results: data.results
        });        
        console.log(data.columns);
        console.log(data.results);
        })
    }

    useEffect(() => {
        let ignore = false;

        if (!ignore)  getPlayers()
        return () => { ignore = true; }
    }, []);


    return (
        <>
        <NavBar/>
        <div style={{display: "flex", flexDirection: "row"}}>
            {data.results.map((record) => {
                return <PlayerIcon name={record[0]} number={record[1]} ppg={record[2]} profilepic={record[3]} colnames={data.columns}/>
            })}
        </div>
        </>
    )
}
 
export default Home;