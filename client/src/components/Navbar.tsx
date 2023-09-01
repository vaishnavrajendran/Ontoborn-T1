import AddTask from "./AddTask";

interface NavbarProps {
    onLogout: () => void;
}

const Navbar = ({ onLogout }: NavbarProps) => {
    return (
        <nav className="flex items-center justify-end bg-blue-500 p-4">
            <div className="mr-4">
                <AddTask title='Add Task' />
            </div>
            <button onClick={onLogout} className="text-white">Logout</button>
        </nav>
    );
};

export default Navbar;
