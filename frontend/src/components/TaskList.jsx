import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaSearch } from 'react-icons/fa';
import TaskItem from './TaskItem';
import TaskForm from './TaskForm';
import { getTasks, createTask, updateTask, deleteTask } from '../api';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTask, setEditingTask] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const data = await getTasks();
            setTasks(Array.isArray(data) ? data : (data.tasks || []));
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = async (taskData) => {
        try {
            const newTask = await createTask(taskData);
            setTasks(prev => [newTask, ...prev]);
            setIsModalOpen(false);
        } catch (error) { console.error(error); }
    };

    const handleUpdate = async (taskData) => {
        try {
            const updated = await updateTask(editingTask._id, taskData);
            setTasks(prev => prev.map(t => t._id === editingTask._id ? updated : t));
            setIsModalOpen(false);
            setEditingTask(null);
        } catch (error) { console.error(error); }
    };

    const handleToggle = async (id, completed) => {
        setTasks(prev => prev.map(t => t._id === id ? { ...t, completed } : t));
        try { await updateTask(id, { completed }); } catch (error) { /* revert */ }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Systems check: Delete task?")) return;
        setTasks(prev => prev.filter(t => t._id !== id));
        try { await deleteTask(id); } catch (error) { /* revert */ }
    };

    const filteredTasks = useMemo(() => {
        return tasks.filter(task => {
            const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesFilter = filter === 'all' ? true :
                filter === 'completed' ? task.completed : !task.completed;
            return matchesSearch && matchesFilter;
        });
    }, [tasks, searchQuery, filter]);

    const activeCount = tasks.filter(t => !t.completed).length;

    return (
        <div className="w-full max-w-lg relative z-10">
            {/* Main Centered Card */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="neon-glass rounded-3xl p-6 md:p-8 min-h-[600px] flex flex-col relative overflow-hidden"
            >
                {/* Decorative glow at top */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-[#00f3ff] shadow-[0_0_20px_#00f3ff] rounded-b-full opacity-80" />

                {/* Header */}
                <div className="flex justify-between items-end mb-8">
                    <div>
                        <h1 className="text-3xl font-rajdhani font-bold text-white tracking-widest uppercase neon-text-glow">
                            Nexus<span className="text-[#00f3ff]">Task</span>
                        </h1>
                        <p className="text-[#bc13fe] text-xs font-semibold tracking-wide mt-1">
                            {activeCount} TASKS PENDING
                        </p>
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.1, rotate: 90 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => { setEditingTask(null); setIsModalOpen(true); }}
                        className="w-12 h-12 bg-gradient-to-br from-[#00f3ff] to-[#bc13fe] rounded-full flex items-center justify-center text-black shadow-[0_0_15px_rgba(188,19,254,0.5)]"
                    >
                        <FaPlus size={18} />
                    </motion.button>
                </div>

                {/* Filter Tabs & Search */}
                <div className="space-y-4 mb-6">
                    <div className="relative">
                        <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                        <input
                            type="text"
                            placeholder="SEARCH PROTOCOLS..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-[#111] border border-gray-700 rounded-xl py-3 pl-10 pr-4 text-sm text-gray-300 focus:border-[#bc13fe] focus:shadow-[0_0_10px_rgba(188,19,254,0.2)] focus:outline-none transition-all placeholder-gray-600 font-rajdhani"
                        />
                    </div>

                    <div className="flex p-1 bg-[#111] rounded-xl border border-gray-800">
                        {['all', 'active', 'completed'].map(f => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${filter === f
                                        ? 'bg-[#00f3ff]/10 text-[#00f3ff] shadow-[inset_0_0_10px_rgba(0,243,255,0.2)]'
                                        : 'text-gray-500 hover:text-gray-300'
                                    }`}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Task List */}
                <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                    {loading ? (
                        <div className="flex justify-center items-center h-40">
                            <div className="w-8 h-8 border-2 border-[#00f3ff] border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    ) : (
                        <AnimatePresence mode="popLayout">
                            {filteredTasks.length === 0 ? (
                                <motion.div
                                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                    className="text-center py-10 opacity-40"
                                >
                                    <p className="font-rajdhani text-sm">NO DATA FOUND</p>
                                </motion.div>
                            ) : (
                                filteredTasks.map(t => (
                                    <TaskItem
                                        key={t._id}
                                        task={t}
                                        onToggle={handleToggle}
                                        onDelete={handleDelete}
                                        onEdit={(task) => { setEditingTask(task); setIsModalOpen(true); }}
                                    />
                                ))
                            )}
                        </AnimatePresence>
                    )}
                </div>
            </motion.div>

            {isModalOpen && (
                <TaskForm
                    show={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSave={editingTask ? handleUpdate : handleCreate}
                    taskToEdit={editingTask}
                />
            )}
        </div>
    );
};

export default TaskList;
