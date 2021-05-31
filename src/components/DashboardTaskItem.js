const Task = ({task, onSelectStatus}) => {
    return (
        <div className='task'>
            <h5>{task.id}</h5>
            <h3>{task.name}</h3>
            <h5>{task.estimate}</h5>
            <h5>{task.priority}</h5>
            <div>
                <select defaultValue={task.status} onChange={(selectedValue) => onSelectStatus(task.id, selectedValue.target.value)}>
                    <option value="TODO">TODO</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Done">Done</option>
                </select>
            </div>   
        </div>
    )
}

export default Task