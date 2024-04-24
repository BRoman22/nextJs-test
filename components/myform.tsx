'use client';
import './styles.css';
import EyeIcon from './eyeIcon';
import CloseEyeIcon from './closeEyeIcon';
import { useState } from 'react';
import { useForm, Form } from 'react-hook-form';

const PASSWORD_STATE = {
  show: 'text',
  hide: 'password',
};

interface IInputs {
  email: string;
  password: string;
}

const MyForm = () => {
  const [nextStep, setNextStep] = useState(false);
  const [showPassword, setShowPassword] = useState(PASSWORD_STATE.hide);

  const toggleShowPassword = () => {
    setShowPassword(
      showPassword === PASSWORD_STATE.hide
        ? PASSWORD_STATE.show
        : PASSWORD_STATE.hide,
    );
  };

  const toggleNextStep = () => {
    setNextStep(!nextStep);
  };

  const toggleEyeIcon =
    showPassword === PASSWORD_STATE.hide ? (
      <CloseEyeIcon onClick={toggleShowPassword} />
    ) : (
      <EyeIcon onClick={toggleShowPassword} />
    );

  const {
    register,
    control,
    reset,
    formState: { errors, isValid, isDirty },
  } = useForm<IInputs>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  return (
    <Form
      className="form"
      control={control}
      action="/api/save"
      onSuccess={() => {
        alert('Your application is updated.');
      }}
      onError={() => {
        alert('Submission has failed.');
        toggleNextStep();
        reset();
      }}
    >
      {!nextStep && (
        <>
          <input
            type="text"
            placeholder="email"
            className="input"
            {...register('email', {
              required: true,
              pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            })}
          />
          {!isValid && isDirty && <span>Заполните email</span>}
          <button
            type="button"
            className="button"
            onClick={() => isValid && toggleNextStep()}
          >
            Далее
          </button>
        </>
      )}
      {nextStep && (
        <>
          <div className="wrapper">
            <>
              <input
                type={showPassword}
                placeholder="password"
                className="input"
                {...register('password', { required: true, minLength: 6 })}
              />
              {!isValid && isDirty && <span>минимум 6 символов</span>}
            </>
            {<span className="icon">{toggleEyeIcon}</span>}
          </div>
          <button type="submit" className="button" disabled={!isValid}>
            Отправить
          </button>
        </>
      )}
    </Form>
  );
};

export default MyForm;
