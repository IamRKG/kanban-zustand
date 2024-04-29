import './Column.css'
import Task from '../component/Task'
import { useStore } from "../store"
import { useState } from 'react'
import classNames from 'classnames';

export default function Column({ state }) {

    const [text, setText] = useState('');
    const [open, setOpen] = useState(false);
    const [drop, setDrop] = useState(false);

    const tasks = useStore(
        (store) => store.tasks.filter((task) => task.state === state)
    )

    const addTask = useStore((store) => store.addTask);

    
    const setDraggedTask = useStore((store)=>store.setDraggedTask);

    const draggedTask = useStore((store)=>store.draggedTask);

    const moveTask = useStore((store)=>store.moveTask)

    return (
        <div className={classNames("column", {drop:drop})} onDragOver={(e)=>{e.preventDefault(); setDrop(true)}} onDragLeave={(e)=>{e.preventDefault(); setDrop(false)}} onDrop={(e)=>{setDraggedTask(null);moveTask(draggedTask,state); setDrop(false)}}>
            <div className='titleWrapper'>  <p>{state}</p><button onClick={() => setOpen(true)}>Add</button></div>

            {tasks.map((task) => <Task title={task.title} key={task.title} />)}

            {open && (
                <div className='modal'>
                    <div className='modalContent'>
                        <input type="text" name="" id="" onChange={(e) => setText(e.target.value)} value={text} />
                        <button onClick={() => { addTask(text, state); setText(''), setOpen(false) }}>Save</button>
                    </div>
                </div>
            )}
        </div>

    )

}