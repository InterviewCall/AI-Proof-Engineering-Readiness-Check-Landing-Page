import { configureStore } from '@reduxjs/toolkit';

import qualificationFormReducer from '@/lib/slices/qualificationFormSlice';

export const makeStore = () => {
    return configureStore({
        reducer: {
            qualificationForm: qualificationFormReducer
        }
    });
};

export type AppStore = ReturnType<typeof makeStore>;

export type RootState = ReturnType<AppStore['getState']>;

export type AppDispatch = AppStore['dispatch'];