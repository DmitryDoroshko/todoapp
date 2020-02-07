export default function createReducers() {
    return {
        addItem: (payload, state) => ({
            ...state,
            todos: [...state.todos, payload],
        }),
        removeItem: (payload, state) => ({
            ...state,
            todos: [
                ...state.todos.slice(0, payload.id),
                ...state.todos.slice(payload.id + 1, state.todos.length),
                ]

        }),
    }

}