import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    todos: JSON.parse(localStorage.getItem('todos')) || [],
};

export const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTask: (state, action) => {
            state.todos.push(action.payload);
            localStorage.setItem('todos', JSON.stringify(state.todos));
        },
        editTask: (state, action) => {
            const { key, updatedTask } = action.payload;
            const taskIndex = state.todos.findIndex(task => task.key === key);
            if (taskIndex !== -1) {
                state.todos[taskIndex] = { ...state.todos[taskIndex], ...updatedTask };
                localStorage.setItem('todos', JSON.stringify(state.todos));
            }
        },
        toggleTask: (state, action) => {
            const key = action.payload;
            const taskIndex = state.todos.findIndex(task => task.key === key);
            if (taskIndex !== -1) {
                state.todos[taskIndex].completed = !state.todos[taskIndex].completed;
                localStorage.setItem('todos', JSON.stringify(state.todos));
            }
        },
        deleteTask: (state, action) => {
            const key = action.payload;
            state.todos = state.todos.filter(task => task.key !== key);
            localStorage.setItem('todos', JSON.stringify(state.todos));
        }
    },
});

export const { addTask, editTask, toggleTask, deleteTask } = todosSlice.actions;

export const selectTasks = state => state.todos.todos;

export default todosSlice.reducer;
