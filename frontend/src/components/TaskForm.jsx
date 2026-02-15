import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';

const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
};

const modalVariants = {
    hidden: { scale: 0.8, opacity: 0, y: 50 },
    visible: {
        scale: 1,
        opacity: 1,
        y: 0,
        transition: { type: 'spring', damping: 25, stiffness: 400 }
    },
    exit: { scale: 0.8, opacity: 0, y: 50 }
};

const TaskForm = ({ show, onClose, onSave, taskToEdit }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        if (taskToEdit) {
            setTitle(taskToEdit.title);
            setDescription(taskToEdit.description || '');
        } else {
            setTitle('');
            setDescription('');
        }
    }, [taskToEdit, show]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim()) return;
        onSave({ title, description });
    };

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                    variants={overlayVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    onClick={onClose}
                >
                    <motion.div
                        variants={modalVariants}
                        onClick={(e) => e.stopPropagation()}
                        className="w-full max-w-md bg-[#0a0a0c] border border-gray-800 relative rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)]"
                    >
                        {/* Neon borders */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#00f3ff] via-[#bc13fe] to-[#00f3ff]" />
                        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#00f3ff] via-[#bc13fe] to-[#00f3ff] opacity-50" />

                        <div className="p-8">
                            <div className="flex justify-between items-center mb-8">
                                <h2 className="text-2xl font-rajdhani font-bold text-white tracking-widest">
                                    {taskToEdit ? 'EDIT // NODE' : 'NEW // NODE'}
                                </h2>
                                <button
                                    onClick={onClose}
                                    className="text-gray-500 hover:text-white transition-colors"
                                >
                                    <FaTimes size={20} />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-xs font-bold text-[#00f3ff] mb-2 font-rajdhani tracking-wider">
                                        TARGET IDENTIFIER
                                    </label>
                                    <input
                                        type="text"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        className="w-full bg-[#15151a] border-b-2 border-gray-800 px-4 py-3 text-white focus:border-[#bc13fe] focus:outline-none transition-colors"
                                        placeholder="Enter objective..."
                                        autoFocus
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-[#bc13fe] mb-2 font-rajdhani tracking-wider">
                                        DATA PARAMETERS
                                    </label>
                                    <textarea
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        className="w-full bg-[#15151a] border-b-2 border-gray-800 px-4 py-3 text-white focus:border-[#bc13fe] focus:outline-none h-24 resize-none transition-colors"
                                        placeholder="Supplementary data..."
                                    />
                                </div>

                                <div className="flex justify-end gap-4 pt-4">
                                    <button
                                        type="button"
                                        onClick={onClose}
                                        className="px-6 py-3 rounded-lg text-xs font-bold tracking-widest text-gray-400 hover:text-white transition-colors font-rajdhani"
                                    >
                                        ABORT
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-8 py-3 bg-gradient-to-r from-[#00f3ff] to-[#00aeef] hover:from-[#fff] hover:to-[#ccc] hover:text-black rounded-lg text-xs font-extrabold tracking-widest text-black shadow-[0_0_20px_rgba(0,243,255,0.4)] transition-all font-rajdhani transform active:scale-95"
                                    >
                                        {taskToEdit ? 'OVERWRITE' : 'INITIALIZE'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default TaskForm;
