import React, {useState} from 'react';
import styled from 'styled-components';
import dataset from './dataset';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Column from './Column';
import {v4 as uuidv4} from 'uuid';

const Container = styled.div`
    display: flex;
`

const App = () => {

    let new_dataset = JSON.parse(localStorage.getItem('data'))?JSON.parse(localStorage.getItem('data')) : dataset
    localStorage.setItem('data', JSON.stringify(new_dataset))
    
    const [data, setData] = useState(new_dataset)
    const [novatarefa,setNovatarefa] = useState('') 

    const onDragEnd = (result) => { 

        const {destination, source, draggableId, type} = result;

        if(!destination){
            return;
        }
        
        if(destination.droppableId === source.droppableId && destination.index === source.index){
            return;
        }

        if (type === 'column') {

            const newColumnOrder = Array.from(data.columnOrder)
            newColumnOrder.splice(source.index, 1)
            newColumnOrder.splice(destination.index, 0, draggableId)
            const newState = {
                ...data,
                columnOrder: newColumnOrder
            }
            localStorage.setItem('data', JSON.stringify(newState))
            setData(newState)
            return;
        }


        const start = data.columns[source.droppableId]
        const finish = data.columns[destination.droppableId]

        if (start === finish){
            const newTaskIds = Array.from(start.taskIds);
            newTaskIds.splice(source.index, 1);
            newTaskIds.splice(destination.index, 0, draggableId);
            
            const newColumn = {
                ...start,
                taskIds : newTaskIds
        }   
            const newState = {
                ...data,
                columns: {
                    ...data.columns,
                    [newColumn.id]: newColumn
                }
            }
            localStorage.setItem('data', JSON.stringify(newState))
            setData(newState)
            return;

    }
    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
        ...start,
        taskIds: startTaskIds
    }
    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = { 
        ...finish,
        taskIds: finishTaskIds
    }

    const newState = {
        ...data,
        columns: {
            ...data.columns,
            [newStart.id]: newStart,
            [newFinish.id]: newFinish}
    }
    localStorage.setItem('data', JSON.stringify(newState))
    setData(newState)
}
    window.addEventListener("storage", function(e){
        setData(JSON.parse(localStorage.getItem('data')))
    })

    const createtask = () => {

        let tempdata = data
        let newid = uuidv4()

        let newtask = {
            [newid] : {'id' : newid, 'content' : novatarefa}
        }

        tempdata.tasks = {...data.tasks, ...newtask}

        tempdata.columns['column-1'].taskIds.push(newid)
        localStorage.setItem('data', JSON.stringify(tempdata))
        setData(tempdata)
        window.dispatchEvent(new Event('storage'));

    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div>
                <label style={{marginRight: '10px'}}>Tarefa:</label>
                <input style={{marginRight: '10px'}} novatarefa={novatarefa} onChange={(e) => {setNovatarefa(e.target.value)}}></input>
                <button type="button" style={{width : "fit-content", marginRight: "10px"}} onClick={() => createtask()}>Criar Tarefa</button>  

            </div>
            <Droppable droppableId='all-columns' direction='horizontal' type='column'>
                {(provided) => (

                    <Container {...provided.droppableProps} ref={provided.innerRef}>
                        {data.columnOrder.map((id, index) => {
                            const column= data.columns[id]
                            const tasks = column.taskIds.map(taskId => data.tasks[taskId])

                            return <Column key={column.id} column={column} tasks={tasks} index={index}/>

                        })}
                        
                    {provided.placeholder}      
                    </Container>

                )}
                
            </Droppable>

        </DragDropContext>
    )

}

export default App;

