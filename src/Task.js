import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
import {FiTrash2} from 'react-icons/fi';

const Container = styled.div`
    border: 1px solid lightgrey;
    padding:8px;
    margin-bottom:8px;
    border-radius:2px;
    background-color:${props => (props.isDragging ? '#e0ffe0' : 'white')};
`

const excluir = (props) => {
    console.log("Excluir")
    let column = props.coluna.column.id
    let task = props.task.id
    let data = JSON.parse(localStorage.getItem('data'))
    data.columns[column].taskIds.pop(task)
    localStorage.setItem('data', JSON.stringify(data))
    window.dispatchEvent(new Event('storage'))
}

function Task(props){

    return (
        <Draggable draggableId={props.task.id} index={props.index}>
            {(provided, snapshot) => (
                <Container
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                   
                    isDragging={snapshot.isDragging}
                >   
                    {props.task.content} <button type="button" style={{width: "20px", border:'none', background:'transparent', cursor: 'pointer'}} onClick={() =>excluir(props)}><FiTrash2/></button>
                </Container>
            )}
        </Draggable>

    )

}

export default Task