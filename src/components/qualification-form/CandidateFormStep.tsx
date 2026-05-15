import { FC } from 'react';
import { FieldErrors, UseFormRegister, UseFormWatch } from 'react-hook-form';

import { CandidateQualificationFormValues, Question, QuestionType } from '@/types/qualificationForm';

import StepWrapper from '../formSteps/StepWrapper';
import InputField from './InputField';
import RadioField from './RadioField';
import SelectField from './SelectField';
import TextAreaField from './TextAreaField';

export type CandidateFormStepProps = {
    title: string,
    helper: string,
    stepNo: number,
    questions: Question[],
    register: UseFormRegister<CandidateQualificationFormValues>,
    errors: FieldErrors<CandidateQualificationFormValues>,
    watch: UseFormWatch<CandidateQualificationFormValues>
}

const CandidateFormStep: FC<CandidateFormStepProps> = ({ title, helper, questions, register, errors, watch }) => {
    return (
        <StepWrapper
            title={title}
            helper={helper}
        >
            {questions.map((question) => (
                <div key={question.id}>
                    {question.questionType == QuestionType.TEXT && (
                        <InputField 
                            questionKey={question.questionKey}
                            questionText={question.questionText}
                            questionType={question.questionType}
                            isRequired={question.isRequired}
                            placeholder={question.placeholder!}
                            register={register}
                            errors={errors}
                        />
                    )}

                    {question.questionType == QuestionType.SELECT && (
                        <SelectField 
                            questionKey={question.questionKey}
                            questionText={question.questionText}
                            isRequired={question.isRequired}
                            options={question.options}
                            placeholder={question.placeholder!}
                            register={register}
                            errors={errors}
                        />
                    )}

                    {question.questionType == QuestionType.RADIO && (
                        <RadioField 
                            questionKey={question.questionKey}
                            questionType={question.questionType}
                            selectedValue={watch(question.questionKey)}
                            options={question.options}
                            register={register}
                            errors={errors}
                        />
                    )}

                    {question.questionType == QuestionType.TEXTAREA && (
                        <TextAreaField 
                            questionKey={question.questionKey}
                            questionText={question.questionText}
                            isRequired={question.isRequired}
                            placeholder={question.placeholder!}
                            register={register}
                            errors={errors}
                        />
                    )}
                </div>
            ))}
        </StepWrapper>
    );
};

export default CandidateFormStep;