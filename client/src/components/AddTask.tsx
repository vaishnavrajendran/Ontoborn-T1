import { useState } from 'react';
import Dropdown from './Dropdown';
import { addUserTasks } from '../actions/taskActions';
import { useAppDispatch, useAppSelector } from '../store/store';
import { addTask } from '../store/Features/taskSlice';

type TaskName = {
    title: string,
}

export interface TaskProps {
    name:string
    desc:string
    status:string
}

const AddTask = ({ title }: TaskName) => {

    const [modalVisible, setModalVisible] = useState(false);
    const [isOpen, setOpen] = useState<boolean>(false);
    const [name, setName] = useState<string>('');
    const [desc, setDesc] = useState<string>('');
    const [status, setStatus] = useState<string>('');
    const [warning, setWarning] = useState<boolean>(false);
    const dispatch = useAppDispatch();

    const token = useAppSelector(state => state.person.userInfo.token)

    const handleSubmit = () => {
        if (name === '' || desc === '' || status === '') {
            setWarning(prev => !prev)
        }
        else {
            setWarning(prev => !prev)
            const newTask: TaskProps = {
                name,
                desc,
                status
            }
            addUserTasks(token, newTask).then(updatedTasks => {
                dispatch(addTask(updatedTasks))
                closeModal()
            })  
        }

    }

    const toggleDropdown = () => {
        setOpen(prev => !prev)
    }

    const openModal = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    const handleSelect = (status: string) => {
        setStatus(status)
    }

    return (
        <div>
            <div className={` bg-gray-700 transition duration-150 ease-in-out z-10 absolute top-0 right-0 bottom-0 left-0 ${modalVisible ? 'block' : 'hidden'}`} id="modal">
                <div role="alert" className="container mx-auto w-11/12 md:w-2/3 max-w-lg">
                    <div className="relative py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400">
                        <div className="w-full flex justify-start text-gray-600 mb-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-wallet" width={52} height={52} viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" />
                                <path d="M17 8v-3a1 1 0 0 0 -1 -1h-10a2 2 0 0 0 0 4h12a1 1 0 0 1 1 1v3m0 4v3a1 1 0 0 1 -1 1h-12a2 2 0 0 1 -2 -2v-12" />
                                <path d="M20 12v4h-4a2 2 0 0 1 0 -4h4" />
                            </svg>
                        </div>
                        <h1 className="text-gray-800 font-lg font-bold tracking-normal leading-tight mb-4">Enter Task Details</h1>
                        <label className="text-gray-800 text-sm font-bold leading-tight tracking-normal">
                            Task Name
                        </label>
                        <input id="name" className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" placeholder="Workout" onChange={(e) => setName(e.target.value)} />
                        <label className="text-gray-800 text-sm font-bold leading-tight tracking-normal">
                            Task Description
                        </label>
                        <input id="name" className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" placeholder="Cardio" onChange={(e) => setDesc(e.target.value)} />
                        <div className='mb-4'>
                            <Dropdown isOpen={isOpen} toggleDropdown={toggleDropdown} onSelect={handleSelect} />
                        </div>
                        {warning && <p className='text-custom-secondary w-full text-center mb-2'>All fields are required</p>}
                        <div className="flex items-center justify-start w-full">
                            <button type='submit' className="focus:outline-none transition duration-150 ease-in-out hover:bg-indigo-600 bg-indigo-700 rounded text-white px-8 py-2 text-sm" onClick={handleSubmit}
                            >Submit</button>
                            <button className="focus:outline-none ml-3 bg-gray-100 transition duration-150 text-gray-600 ease-in-out hover:border-gray-400 hover:bg-gray-300 border rounded px-8 py-2 text-sm" onClick={closeModal}>
                                Cancel
                            </button>
                        </div>
                        <div className="cursor-pointer absolute top-0 right-0 mt-4 mr-5 text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out" onClick={closeModal}>
                            <svg xmlns="http://www.w3.org/2000/svg" aria-label="Close" className="icon icon-tabler icon-tabler-x" width={20} height={20} viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" />
                                <line x1={18} y1={6} x2={6} y2={18} />
                                <line x1={6} y1={6} x2={18} y2={18} />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full flex justify-center " id="button">
                <button className="font-bold focus:outline-none mx-auto transition duration-150 ease-in-out rounded text-white px-4 sm:px-8 py-2 text-xs sm:text-sm" onClick={openModal}>
                    {title}
                </button>
            </div>
        </div>
    );
};
export default AddTask;
