import React, { useEffect, useRef, useState } from "react";
import absoluteUrl from '@lib/absUrl';
import { useForm } from 'react-hook-form';
import style from '@styles/Login.module.css';
import Router from "next/router";


interface UserType {
  email: string;
  password: string
}

/* Error functional component */
function InputError({ error }) {
  return (
    <span className={error ? style.error : `${style.error} .hide`}>{error ? error.message : ''}</span>
  );
}

/* Contact form component */
export default function Login(props) {

  const { baseApiUrl } = props;

  const { register, handleSubmit, errors } = useForm<UserType>({
    mode: 'onSubmit',
    defaultValues: {}
  });

  const [collectedData, setCollectedData] = useState(null);
  const [resMessage, setResMessage] = useState<any>(null);
  const emailInputRef = useRef(null);

  useEffect(() => {
    if (collectedData) {
      console.log('Sending ....', collectedData);
      loginHandler();
    }

  }, [collectedData])

  const loginHandler = async () => {

    try {
      const logRes = await fetch(`${baseApiUrl}/auth/login`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(collectedData)
        });

      const data = await logRes.json();

      if (data.status === 'success') {
        console.log(data)
        Router.push({
          pathname: '/',
          //query: data.user
        });
      } else {
        setResMessage('User not found!');
      }

    } catch (e) {
      throw Error(e.message)
    }
  }

  const onSubmitForm = (data) => {
    //console.log(data);
    setCollectedData(data);
  }

  /* Checking text cursor position */
  const checkTextCursor = () => {
    emailInputRef.current?.focus();
    var startPosition = emailInputRef.current?.selectionStart || 0;
    var endPosition = emailInputRef.current?.selectionEnd || 0;

    let text = emailInputRef.current?.value;

    // Check if you've selected text
    if (startPosition === endPosition) {
      console.log("The position of the cursor is (" + startPosition + "/" + emailInputRef.current?.value.length + ")");
      text = text?.substring(0, startPosition) + '.com' + text?.substring(startPosition, text.length + 1);
    } else {
      text = text?.substring(0, startPosition) + '.com' + text?.substring(endPosition, text.length + 1);
      console.log("Selected text from (" + startPosition + " to " + endPosition + " of " + emailInputRef.current?.value.length + ")");
    }

    emailInputRef.current.value = text;
  }

  return (
    <>
      <form className={style.loginForm} autoComplete="off" onSubmit={handleSubmit(onSubmitForm)}>
        <label className={style.loginLabel} htmlFor="email">E-mail</label>
        <span className={style.emailContainer}>
          <input
            className={style.inputForm}
            ref={(e) => {
              emailInputRef.current = e;
              register(e, {
                required: "Your e-mail can't be empty!",
                minLength: {
                  value: 10,
                  message: "Mail must contain min 10 characters!",
                },
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/gi,
                  message: "Your email have invalid format!",
                },
              });
            }}
            placeholder="Your E-mail ..."
            type="text"
            name="email"
          />

          <button
            className={style.inputForm}
            type="button"
            name="com"
            onClick={checkTextCursor}
          >+[.com]</button>
        </span>
        <InputError error={errors.email} />

        <label className={style.loginLabel} htmlFor="password">Password</label>
        <input
          className={style.inputForm}
          ref={register({
            required: "Password is empty",
            minLength: {
              value: 4,
              message: "Password must contain min 4 characters!",
            },
            pattern: {
              value: /[0-9%-+$#&?]+/ig,
              message: "Password must contain at least one number or special character!",
            },
          })}
          placeholder="Your password ..."
          type="password"
          name="password"
        />
        <InputError error={errors.password} />

        <input className={style.inputForm} type="submit" value="Login"></input>
        {resMessage && <span>{resMessage}</span>}
      </form>
    </>
  );
}

export async function getServerSideProps(context) {

  const { req } = context;

  const { origin } = absoluteUrl(req);

  const baseApiUrl = `${origin}/api`;

  return {
    props: {
      baseApiUrl
    },
  };
}

