import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { API } from '../../src/firebase/api';
import {
  AppQuestionnaire,
  QuestionnaireAnswer,
} from '../../types/questionnaires';
import { RootState } from '../store';
import { userIdSel } from '../user/userSlice';
import { RegistrationQuestionnaire } from './registrationQuest.types';

const initialState: RegistrationQuestionnaire = {
  id: 'Registration',
  answers: undefined,
  questions: undefined,
  getQuestionsStatus: 'idle',
  saveQuestionnaireStatus: 'idle',
};

export const getRegistrationQuestionsDefaultThunk = createAsyncThunk(
  'registration/getQuestionsDefaultThunk',
  async (): Promise<AppQuestionnaire | undefined> => {
    const Questions = (await API.getQuestionnaire('Registration')).data();
    return Questions;
  }
);

export const saveRegistrationDataThunk = createAsyncThunk(
  'registration/saveRegistrationThunk',
  async (_, { getState }) => {
    const rootState = getState() as RootState;
    const userId = userIdSel(rootState);
    const registrationData = answersSel(rootState);
    if (registrationData != undefined)
      return await API.saveRegistrationQuestionnaire(registrationData, userId);
  }
);

export const registrationQuestSlice = createSlice({
  name: 'registration',
  initialState,
  reducers: {
    saveAnswers: (state, action: PayloadAction<Array<number>>) => {
      const answers: QuestionnaireAnswer = {
        id: 'RegistrationQuestionnaire',
        answers: action.payload,
      };
      state.answers = answers;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getRegistrationQuestionsDefaultThunk.pending, (state) => {
        state.getQuestionsStatus = 'loading';
      })
      .addCase(
        getRegistrationQuestionsDefaultThunk.fulfilled,
        (state, action) => {
          state.getQuestionsStatus = 'idle';
          state.questions = action.payload;
        }
      )
      .addCase(getRegistrationQuestionsDefaultThunk.rejected, (state) => {
        state.getQuestionsStatus = 'failed';
      })
      .addCase(saveRegistrationDataThunk.pending, (state) => {
        state.saveQuestionnaireStatus = 'loading';
      })
      .addCase(saveRegistrationDataThunk.fulfilled, (state) => {
        state.saveQuestionnaireStatus = 'idle';
      })
      .addCase(saveRegistrationDataThunk.rejected, (state) => {
        state.saveQuestionnaireStatus = 'failed';
      });
  },
});

export const { saveAnswers } = registrationQuestSlice.actions;

export const getQuestionsStatusSel = (state: RootState) =>
  state.registration.getQuestionsStatus;
export const RegQuestionnaireSel = (state: RootState) =>
  state.registration.questions?.questionsList;
export const answersSel = (state: RootState) => state.registration.answers;

export default registrationQuestSlice.reducer;
