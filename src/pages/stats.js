import React, {useEffect, useState}from "react";
import NavBar from "../components/navbar";
import "./stats.css"
import BARGRAPH from "../graphs/bargraph.png"
import HEATMAP from "../graphs/heatmap.png"

function Stats() {

    const IP = "http://127.0.0.1:5000"

    const [teamdata, setteamdata] = useState([]);

    const [teamsforgraph, setteamsforgraph] = useState([])

    const [query, setquery] = useState("");
    const [bargraph, setbargraph] = useState("");
    const [heatmap, setheatmap] = useState("");




    async function getTeams(){
        fetch(IP + "/getteams").then((res) => res.json()).then((data) => {
        // console.log(data);
        setteamdata(data)
        })
    }

    async function getGraphs(q){
        fetch(IP + "/stats", {
            method: "POST",
            headers: {
                "Access-Control-Allow-Origin" : "*",
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                command: q
            })
        }).then((res) => res.json()).then((data) => {
        console.log(data.success);
        // bargraph = BARGRAPH;
        // heatmap = HEATMAP;
    })
    }

    const generateGraphs = () => {
        let my_q = "SELECT teamabbr FROM teamstats WHERE season = 2024 ";
        let temp = "";
        teamsforgraph.map((element) => {
            if(teamsforgraph.length === 0) {
                return ""
            } else if(teamsforgraph.length === 1) {
                temp = "AND";
                temp = `${temp} teamabbr LIKE '${element}'`;
            } else if(teamsforgraph.indexOf(element) === 0) {
                temp = "AND (";
                temp = `${temp} teamabbr LIKE '${element}' OR`;
            }else if(teamsforgraph.indexOf(element) !== teamsforgraph.length-1) {
                temp = `${temp} teamabbr LIKE '${element}' OR`;
            } else {
                temp = `${temp} teamabbr LIKE '${element}')`;
            }
            return temp
        })
        my_q = my_q + temp;
        console.log(my_q);
        getGraphs(my_q);
        setbargraph(BARGRAPH);
        setheatmap(HEATMAP);
        return
    }

    const updateTeams = (e) => {
        if(e.target.checked) {
            // console.log(e.target.checked);
            console.log("Adding: " + e.target.value);
            setteamsforgraph(prevteamsforgraph => [...prevteamsforgraph, e.target.value]);
        } else {
            let index = teamsforgraph.indexOf(e.target.value);
            // console.log("Removing: " + e.target.value + " at index: " + index);
            teamsforgraph.splice(index, 1);
            
        }        
        // console.log(teamsforgraph);
        return
    }

    useEffect(() => {
        let ignore = false;

        if (!ignore)  getTeams()
        return () => { ignore = true; }
    }, []);

    return (
        <>
        <NavBar/>
        <div className="main">
            <div className="filterOptions">
                <h2>Graph Options</h2>
                <p>Teams to Include</p>
                <div>
                {
                    teamdata.map((element) => {
                        return (
                            <div key={element[0]}>
                                <input className="checkBox" type={"checkbox"} value={element[1]} onChange={updateTeams}></input>
                                <label className="checkBoxLabel">{element[0]}</label>
                            </div>
                    )})
                }
                </div>
                <br></br>
                <button className="generateGraphsButton" onClick={generateGraphs}>Generate Graphs</button>
            </div>
            <div>
                <img src={bargraph} alt="statsbar"></img>
                <img src={heatmap} alt="statsmap"></img>
            </div>
        </div>
        </>
    )
}
 
export default Stats;