import React, { useState} from "react";
 
function Test() {
    const [data, setdata] = useState({
        columns: [],
        results: []
    });

    async function getUsers(){
        fetch("http://127.0.0.1:5000/users").then((res) => res.json()).then((data) => {
        setdata({
            columns: data.columns,
            results: data.results
        });
        console.log(data.columns);
        console.log(data.results);
        })
    }

    async function getPlayers(){
        fetch("http://127.0.0.1:5000/players").then((res) => res.json()).then((data) => {
        setdata({
            columns: data.columns,
            results: data.results
        });        
        console.log(data.columns);
        console.log(data.results);
        })
    }
 
    return (
        <div className="App">
            <header className="App-header">
                <h1>React and flask</h1>
                <div style={{display: "flex"}}>
                {data.columns.map(colname => {
                    return (
                        <h2 style={{padding: "10px"}}>{colname}</h2>
                    )
                })}
                </div>
                {data.results.map(element => {
                    return (
                        <>  

                            <div style={{display: "flex"}}>
                                <p style={{padding: "10px"}}>{element[0]}</p>
                                <p style={{padding: "10px"}}>{element[1]}</p>
                                <p style={{padding: "10px"}}>{element[2]}</p>
                            </div>
                        </>
                    )
                })} 
            </header>
            <button onClick={getUsers}>
                Get Users!
            </button>
            <button onClick={getPlayers}>
                Get Players!
            </button>
        </div>
    );
}
 
export default Test;