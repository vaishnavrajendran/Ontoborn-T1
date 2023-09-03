import { deleteUserTask } from "../actions/taskActions";
import { useAppDispatch, useAppSelector } from "../store/store";
import { removeTask, setLoading } from "../store/Features/taskSlice";
import { useState } from "react";
import EditModal from "./EditModal";

type CardData = {
    data: data,
    index: number
}

type data = {
    description: string,
    name: string,
    status: string,
    _id: string,
    userId?: string
}

type classType = {
    Pending: string;
    Completed: string;
}

const Card = ({ data, index }: CardData) => {
    console.log("INdex", index);
    
    const token = useAppSelector(state => state.person.userInfo.token)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const props = {
        title: "Edit",
        _id: data._id,
        name: data.name,
        desc: data.description,
        status: data.status
    }
    const dispatch = useAppDispatch();
    const deleteTask = async () => {
        deleteUserTask(token, data._id).then(deletedData => {
            if (deletedData.status) {
                dispatch(setLoading())
                return dispatch(removeTask(data._id))
            }
        })
    }
    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const classSwitch: classType = {
        Pending: "focus:outline-none text-red-700 bg-red-100 py-1 px-2 rounded text-xs leading-3 mt-2",
        Completed: "focus:outline-none text-green-700 bg-green-100 py-1 px-2 rounded text-xs leading-3 mt-2"
    }

    return (
        <div className="flex items-center justify-center py-8 px-4 w-full" key={data.userId}>
            <div className="md:w-96 rounded-md shadow-lg py-4 px-5 w-full bg-white dark:bg-gray-800">
                <div className="flex justify-between">
                    <h2 tabIndex={0} className="focus:outline-none text-xs leading-3 text-gray-600 dark:text-gray-100">Task - {index+1}</h2>
                    <div className="flex">
                        <button className="bg-blue-500 text-white py-2 px-2 rounded hover:bg-blue-600 transition duration-200"
                            onClick={() => {
                                deleteTask()
                                dispatch(setLoading())
                            }}
                        >Delete</button>
                    </div>
                </div>
                <div className="pt-3 relative">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <p tabIndex={0} className="focus:outline-none text-gray-600 dark:text-gray-100 text-sm leading-none pt-2">{data.name}</p>
                        </div>
                        <button onClick={openModal} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200">
                            Edit
                        </button>
                        <EditModal isOpen={isModalOpen} onClose={closeModal} props={props} />
                    </div>

                    <p tabIndex={0} className="focus:outline-none text-xs italic pt-1 leading-3 text-gray-400">{data.description}</p>
                    <div className="flex items-center justify-left">
                        <div tabIndex={0} className={classSwitch[data.status as keyof classType]}>{data.status}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Card;
