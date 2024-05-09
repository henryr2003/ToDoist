import React, { useState, useEffect } from "react";


import "./ToDo.css"


export default function ToDo(){
    
    const apiUrl = process.env.REACT_APP_API_URL;

    
    const taskData = [
        
    ]


    const [tasks, setTasks] = useState(taskData);
    

    const getCurrentTasks = () => {
        fetch(`${apiUrl}/tasks`, {
            method: 'GET'
        })

        .then(response => {
            if (response.ok) {  // Check if response status code is 200
                return response.json();  // Parse JSON only if response is OK
            }
            throw new Error('Network response was not ok.');  // Throw an error if response is not OK
        })
        .then(data => {
            setTasks(data);  // Update local state with the tasks from the server
        })
        .catch(error => console.error('Error:', error));
    };


    // Function to update task at specific index
    const handleTaskChange = (taskId, newValue) => {
        
        
        const updatedTasks = tasks.map((task,idx) => {

            if(idx === taskId){
                return {...task, task: newValue}
            }
            
            return task;

        });

        setTasks(updatedTasks);

        fetch(`${apiUrl}/tasks/${taskId+1}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedTasks)
        })
        .then(response => response.json())
        .then(data => {
            setTasks([...tasks, data]);  // Update local state with the new task from the server
        })
        .catch(error => console.error('Error:', error));
    };


    
    const addTask = () => {
        

        const newTask = {
            task: "",
            recurring: false,
            time: "NA",
            alarm: false,
        }

        fetch(`${apiUrl}/tasks`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newTask)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.id);
        setTasks([...tasks, data]);  // Update local state with the new task from the server
    })
    .catch(error => console.error('Error:', error));
       
    };

    const deleteTask = (taskId) => {
        console.log(taskId);
    
        fetch(`${apiUrl}/tasks/${taskId+1}`, {
            method: 'DELETE',
        })

        .then(response => {
            if (response.ok) {
                // Only update state if server-side delete was successful
                setTasks(previousTasks => previousTasks.filter(task => task.id !== taskId));
            } else {
                throw new Error('Failed to delete task');
            }
        })

        .then(data => {
            console.log(data.id);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    // useEffect hook to call getTasks on component mount
    useEffect(() => {
        getCurrentTasks();
    }, []);

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
                        {tasks.map((task, index) => (

                            <div key={task.id} className="singleTask">

                                <div className="buttonAndTitle">

                                    <button onClick={ () => deleteTask(task.id)} className="circleButton"> </button>

                                    <input
                                        type="text"
                                        className="singleTaskTitle"
                                        value={task.task}
                                        onChange={(e) => handleTaskChange(index, e.target.value)}
                                        
                                    />

                                </div>

                                <div className="underTask"> 
                                    
                                    <div className="leftSide"> 
                                        <div className="recurringImg"> </div>

                                        {task.time != "NA" && (

                                            <p className="timeText"> {task.time} </p>
                                        
                                        )}

                                        <div className="clockImg"> </div>
                                    </div>

                                    <div className="toDoListName">

                                        <p className="listName"> List Name #</p>

                                    </div>

                                    


                                </div>

                            </div>
                        ))}

                        <button onClick={addTask} className="addTaskButton"> 
                            <h1> + Add Task</h1>
                        </button>

                    </div>

                </div>

            </div>
        
        
        </div>



    );
}