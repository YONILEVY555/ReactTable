import useInput from '../../hooks/useInput';
import { useDispatch,useSelector } from 'react-redux';
import { organizationUsersActions } from '../../store/slice/organizationUsersSlice';

const isNotEmpty = (value) => value.trim() !== '';
const isEmail = (value) => value.includes('@');

const ModalForm = (props) => {

    const data = useSelector(state=>state.form.dataforUpdate);
    const status = useSelector(state=>state.form.status);

    const dispatch = useDispatch();

    const {
        value: statusValue,
        isValid: statusIsValid,
        hasError: statusHasError,
        valueChangeHandler: statusChangeHandler,
        inputBlurHandler: statusBlurHandler,
        reset: resetStatus,
      } = useInput(isNotEmpty,data ? data.status: null);

      const {
        value: dateValue,
        isValid: dateIsValid,
        hasError: dateHasError,
        valueChangeHandler: dateChangeHandler,
        inputBlurHandler: dateBlurHandler,
        reset: resetDate,
      } = useInput(isNotEmpty,data ? data.lastLoginDate: null);

const {
    value: userIdValue,
    isValid: userIdIsValid,
    hasError: userIdHasError,
    valueChangeHandler: userIdChangeHandler,
    inputBlurHandler: userIdBlurHandler,
    reset: resetUserId,
  } = useInput(isNotEmpty,data ? data.userId: null);

  const {
    value: firstNameValue,
    isValid: firstNameIsValid,
    hasError: firstNameHasError,
    valueChangeHandler: firstNameChangeHandler,
    inputBlurHandler: firstNameBlurHandler,
    reset: resetFirstName,
  } = useInput(isNotEmpty,data ? data.firstName: null);

  const {
    value: lastNameValue,
    isValid: lastNameIsValid,
    hasError: lastNameHasError,
    valueChangeHandler: lastNameChangeHandler,
    inputBlurHandler: lastNameBlurHandler,
    reset: resetLastName,
  } = useInput(isNotEmpty,data ? data.lastName: null);

  const {
    value: emailValue,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmail,
  } = useInput(isEmail,data ? data.email: null);

  let formIsValid = false;

  if (firstNameIsValid && lastNameIsValid && emailIsValid && statusIsValid && dateIsValid && userIdIsValid) {
    formIsValid = true;
  }

  const submitHandler = event => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }

    const row = {
        userId:userIdValue,
        firstName:firstNameValue,
        lastName:lastNameValue,
        organizationCode:'',
        lastLoginDate:dateValue,
        email:emailValue,
        status:statusValue
    }

    if(status === 'Add')
        dispatch(organizationUsersActions.addRow(row))
    
    if(status === 'Update')
        dispatch(organizationUsersActions.updateRow(row))

    resetFirstName();
    resetLastName();
    resetEmail();
    resetStatus();
    resetDate();
    resetUserId();

  };

  return (
    <form onSubmit={submitHandler}>
      <div>
      <div>
          <label htmlFor='id'>User Id</label>
          <input
            type='number'
            id='id'
            value={userIdValue}
            onChange={userIdChangeHandler}
            onBlur={userIdBlurHandler}
          />
          {userIdHasError && <p>Please enter a valid id.</p>}
        </div>
        <div>
          <label htmlFor='name'>First Name</label>
          <input
            type='text'
            id='name'
            value={firstNameValue}
            onChange={firstNameChangeHandler}
            onBlur={firstNameBlurHandler}
          />
          {firstNameHasError && <p>Please enter a first name.</p>}
        </div>
        <div>
          <label htmlFor='name'>Last Name</label>
          <input
            type='text'
            id='name'
            value={lastNameValue}
            onChange={lastNameChangeHandler}
            onBlur={lastNameBlurHandler}
          />
          {lastNameHasError && <p>Please enter a last name.</p>}
        </div>
      </div>
      <div>
        <label htmlFor='name'>E-Mail Address</label>
        <input
          type='text'
          id='name'
          value={emailValue}
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
        />
        {emailHasError && <p>Please enter a valid email address.</p>}
      </div>
      <div>
          <label htmlFor='date'>Date & Time</label>
          <input
            type="datetime-local"
            id='date'
            value={dateValue}
            onChange={dateChangeHandler}
            onBlur={dateBlurHandler}
          />
          {dateHasError && <p>Please enter a valid date.</p>}
        </div>
        <div>
          <label htmlFor='status'>status</label>
          <input
            type='number'
            id='status'
            min={0}
            max={1}
            value={statusValue}
            onChange={statusChangeHandler}
            onBlur={statusBlurHandler}
          />
          {statusHasError && <p>Please enter a valid id.</p>}
        </div>
      <div>
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default ModalForm;