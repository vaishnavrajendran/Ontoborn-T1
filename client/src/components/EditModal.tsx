import { ChangeEvent, useState } from 'react';
import Dropdown from './Dropdown';
import { updateTask } from '../actions/taskActions';
import { useAppDispatch, useAppSelector } from '../store/store';
import { setLoading, updateUserTask } from '../store/Features/taskSlice';

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  props: {
    _id: string;
    name: string;
    desc: string;
    status: string;
  };
}

type InputChangeEvent = ChangeEvent<HTMLInputElement>;

const EditModal = ({ isOpen, onClose, props }: EditModalProps) => {
  const [inputValue, setInputValue] = useState<string>(props.name);
  const [inputDesc, setInputDesc] = useState<string>(props.desc)
  const [status, setStatus] = useState<string>(props.status)
  const [open, setOpen] = useState<boolean>(false);
  const token = useAppSelector(state => state.person.userInfo.token)
  const dispatch = useAppDispatch();

  const handleInputChange = (e: InputChangeEvent) => {
    setInputValue(e.target.value);
  };

  const handleDescChange = (e: InputChangeEvent) => {
    setInputDesc(e.target.value);
  };


  const toggleDropdown = () => {
    setOpen(prev => !prev)
  }

  const handleSelect = (status: string) => {
    setStatus(status)
  }

  const handleSubmit = () => {
    dispatch(setLoading())
    const updateObj = {
      taskId: props._id,
      inputValue,
      inputDesc,
      status
    }
    updateTask(token, updateObj).then(data => {
      dispatch(setLoading());
      return dispatch(updateUserTask(data))
    })
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
      <div className="bg-white w-1/2 p-8 rounded shadow-lg z-10">
        <h2 className="text-2xl font-semibold mb-4">Edit Task</h2>
        <input
          type="text"
          placeholder="Description"
          className="w-full border border-gray-300 rounded p-2 mb-4"
          value={inputValue}
          onChange={handleInputChange}
        />
        <input
          type="text"
          placeholder="Enter something"
          className="w-full border border-gray-300 rounded p-2 mb-4"
          value={inputDesc}
          onChange={handleDescChange}
        />
        <div className='mb-2'>
          <Dropdown isOpen={open} toggleDropdown={toggleDropdown} onSelect={handleSelect} status={props.status} />
        </div>
        <div className="flex justify-end">
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
            onClick={handleSubmit}
          >
            Submit
          </button>
          <button
            className="bg-gray-400 text-white py-2 px-4 rounded ml-2 hover:bg-gray-500 transition duration-200"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
