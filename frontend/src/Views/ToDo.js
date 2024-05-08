import React, { useState, useEffect } from "react";


import "./ToDo.css"


export default function ToDo(){


    let arr = ["you" , "stupid", "ni"];


    const [tasks, setTasks] = useState(arr);

    // Function to update task at specific index
    const handleTaskChange = (index, newValue) => {
        const updatedTasks = [...tasks];
        updatedTasks[index] = newValue;
        setTasks(updatedTasks);
    };


    return (

        
        <div className="totalBox"> 

            <div className="leftContainer">



            </div>
        
        
            <div className="rightContainer">

                <div className="contentContainer">

                    <div className="topContainer">

                        <div className="titleContainer">
                            <h2 className="titleText"> Today</h2>
                        </div>
                        

                        <button className="viewSettings">
                            <div className="viewImg">

                            </div>

                            <h1> View</h1>
                        </button>
                    </div>

                    <div className="singleToDo">

                        <h2 className="toDoTitle"> To Do Title</h2>

                    {/* want to loop singleTask and change singleTaskTitle based on the name i get from the list*/}
                        {arr.map((task, index) => (
                            <div className="singleTask">

                                <div className="buttonAndTitle">

                                    <button className="circleButton"> </button>

                                    <input
                                        type="text"
                                        className="singleTaskTitle"
                                        value={task}
                                        onChange={(e) => handleTaskChange(index, e.target.value)}
                                        
                                    />

                                </div>

                            </div>
                        ))}

                    </div>

                </div>

            </div>
        
        
        </div>



    );
}