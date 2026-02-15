import { motion } from 'framer-motion';
import { FaTrash, FaEdit, FaCheck, FaUndo } from 'react-icons/fa';

const itemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: { x: 0, opacity: 1 },
    exit: { x: 20, opacity: 0, transition: { duration: 0.2 } },
    hover: { scale: 1.02 }
};

const TaskItem = ({ task, onToggle, onDelete, onEdit }) => {
    const isCompleted = task.completed;

    return (
        <motion.div
            layout
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            whileHover="hover"
            className={`group relative p-4 mb-3 rounded-xl border transition-all duration-300 backdrop-blur-md ${isCompleted
                    ? 'bg-gray-900/40 border-gray-800 opacity-60'
                    : 'bg-gray-900/60 border-gray-700 neon-card-hover'
                }`}
        >
            {/* Side Color Bar */}
            <div className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-xl transition-colors ${isCompleted ? 'bg-gray-600' : 'bg-[#00f3ff] shadow-[0_0_10px_#00f3ff]'
                }`} />

            <div className="pl-4 flex justify-between items-center bg-cyan-900/100">
                <div className="flex-1 pr-4">
                    <h3 className={`font-rajdhani text-lg font-semibold tracking-wide transition-colors ${isCompleted ? 'text-gray-500 line-through' : 'text-white'
                        }`}>
                        {task.title}
                    </h3>
                    {task.description && (
                        <p className={`text-xs mt-1 ${isCompleted ? 'text-gray-600' : 'text-gray-400'}`}>
                            {task.description}
                        </p>
                    )}
                </div>

                <div className="flex items-center space-x-2">
                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => onToggle(task._id, !task.completed)}
                        className={`p-2 rounded-lg transition-all ${isCompleted
                                ? 'text-yellow-500 hover:text-yellow-400'
                                : 'text-gray-400 hover:text-[#00f3ff]'
                            }`}
                    >
                        {isCompleted ? <FaUndo size={14} /> : <FaCheck size={14} />}
                    </motion.button>

                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => onEdit(task)}
                        className="p-2 text-gray-400 hover:text-[#bc13fe] transition-all"
                    >
                        <FaEdit size={14} />
                    </motion.button>

                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => onDelete(task._id)}
                        className="p-2 text-gray-400 hover:text-[#ff0055] transition-all"
                    >
                        <FaTrash size={14} />
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );
};

export default TaskItem;
