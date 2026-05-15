import { configureStore } from '@reduxjs/toolkit';

import candidateAnswerReducer from '@/lib/slices/candidateAnswerSlice';
import qualificationFormReducer from '@/lib/slices/qualificationFormSlice';

export const makeStore = () => {
    return configureStore({
        reducer: {
            qualificationForm: qualificationFormReducer,
            candidateAnswer: candidateAnswerReducer
        },
        middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}),
    });
};

export type AppStore = ReturnType<typeof makeStore>;

export type RootState = ReturnType<AppStore['getState']>;

export type AppDispatch = AppStore['dispatch'];