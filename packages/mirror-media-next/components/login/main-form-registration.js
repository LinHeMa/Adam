import styled from 'styled-components'
import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux'
import {
  loginEmail,
  loginPassword,
  loginActions,
  FormState,
} from '../../slice/login-slice'
import {
  getAccessToken,
  loginPageOnAuthStateChangeAction,
  errorHandler,
} from '../../utils/membership'
import { auth } from '../../firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { FirebaseError } from 'firebase/app'
import EmailInput from './email-input'
import RegistrationPasswordInput from './registration-password-input'
import CenteredHint from '../shared/cemtered-hint'
import { InputState } from '../../constants/component'
import PrimaryButton from '../shared/buttons/primary-button'
import DefaultButton from '../shared/buttons/default-button'
import { isValidEmail, isValidPassword } from '../../utils'
import ReminderSection from './reminder-section'

const Title = styled.p`
  font-size: 24px;
  font-weight: 500;
  line-height: 150%;
  margin-bottom: 16px;
`

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 16px;
`

const ControlGroup = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 12px;
  margin-top: 24px;
  margin-bottom: 24px;
`

export default function MainFormRegistration() {
  const dispatch = useAppDispatch()
  const [isLoading, setIsLoading] = useState(false)
  const [isDuplicateEmailMember, setIsDuplicateEmailMember] = useState(false)
  const email = useAppSelector(loginEmail)
  const password = useAppSelector(loginPassword)
  const allowToSubmit = isValidEmail(email) && isValidPassword(password)

  /** @type {import('react').MouseEventHandler<HTMLButtonElement>} */
  const handleBack = () => {
    setIsDuplicateEmailMember(false)
    dispatch(loginActions.goToStart())
  }

  /** @type {import('react').MouseEventHandler<HTMLButtonElement>} */
  const handleSubmit = async () => {
    setIsLoading(true)

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )
      if (!user) {
        throw new Error('Unable to get Firebase User')
      }
      const idToken = await user.getIdToken()
      if (!idToken) {
        throw new Error('Unexpected Error when getting firebase Id token.')
      }
      const accessToken = await getAccessToken(idToken)
      const result = await loginPageOnAuthStateChangeAction(
        user,
        true,
        accessToken
      )

      dispatch(loginActions.changeState(result))
    } catch (e) {
      if (
        e instanceof FirebaseError &&
        e?.code === 'auth/email-already-in-use'
      ) {
        setIsDuplicateEmailMember(true)
      } else {
        errorHandler(e)
        dispatch(loginActions.changeState(FormState.RegisterFail))
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Title>Email 註冊</Title>
      <InputGroup>
        <EmailInput />
        <RegistrationPasswordInput />
      </InputGroup>
      <ControlGroup>
        {isDuplicateEmailMember && (
          <CenteredHint $state={InputState.Invalid}>
            這個 Email 已經註冊過囉
          </CenteredHint>
        )}
        <PrimaryButton
          isLoading={isLoading}
          disabled={!allowToSubmit}
          onClick={handleSubmit}
        >
          註冊會員
        </PrimaryButton>
        <DefaultButton onClick={handleBack}>回上一步</DefaultButton>
      </ControlGroup>
      <ReminderSection />
    </>
  )
}
