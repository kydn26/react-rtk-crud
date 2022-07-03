import { createSlice } from "@reduxjs/toolkit";


const initialState = [
    {
        id: "1",
        title: 'Title 1',
        description: 'Description 1',
        completed: false,
    },
    {
        id: "2",
        title: 'Title 2',
        description: 'Description 2',
        completed: false,
    }
]

export const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask: (state, action) => {
            state.push(action.payload)
        },
        deleteTask: (state, action) => {
            const taskFound = state.find( t => t.id === action.payload);
            if(taskFound) {
                state.splice(state.indexOf(taskFound), 1);
            }
        },
        updateTask: (state, action) => {
            const { id, title, description } = action.payload;
            const taskFound = state.find( t => t.id === id);
            if(taskFound) {
                taskFound.title = title;
                taskFound.description = description;
            }
        }
    }
});

export const { addTask, deleteTask, updateTask } = taskSlice.actions;
export default taskSlice.reducer;