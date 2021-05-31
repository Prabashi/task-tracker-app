import DashboardTaskListHeader from './DashboardTaskListHeader'
import DashboardTaskItem from './DashboardTaskItem'

const DashboardTaskListItem = ({headerName, tasks, onSelectStatus}) => {
    return (
        <div className='container'>
            <DashboardTaskListHeader headerName={headerName} />
            
            {tasks.map((task) => (
                <DashboardTaskItem key={task.id} task={task} onSelectStatus={onSelectStatus} />
            ))}
        </div>
    )
};

export default DashboardTaskListItem;