import createDataContext from './createDataContext';

const blogReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_BLOGPOST': return [...state, {
            id: Math.floor(Math.random() * 99999),
            title: action.payload.title,
            content: action.payload.content
        }];
        case 'EDIT_BLOGPOST': {
            return state.map(x => {
                return x.id === action.payload.id ? action.payload : x;
            });
        }
        case 'DELETE_BLOGPOST': return state.filter(x => x.id !== action.payload);
        default: return state;
    }
};

const addBlogPost = (dispatch) => {
    return (title, content, callback) => {
        dispatch({ type: 'ADD_BLOGPOST', payload: { title, content } });
        callback();
    };
};

const editBlogPost = (dispatch) => {
    return (id, title, content, callback) => {
        dispatch({ type: 'EDIT_BLOGPOST', payload: { id, title, content } });
        if (callback) callback();
    };
};

const deleteBlogPost = (dispatch) => {
    return id => {
        dispatch({ type: 'DELETE_BLOGPOST', payload: id });
    };
};

export const { Context, Provider } = createDataContext(blogReducer,
    { addBlogPost, deleteBlogPost, editBlogPost },
    []
);