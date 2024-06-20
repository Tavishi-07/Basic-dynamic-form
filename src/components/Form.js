import React from 'react';
import useForm from '../hooks/useForm';
import Modal from './Modal';
import './Form.css';

const validate = (values) => {
  let errors = {};

  if (!values.name) {
    errors.name = "Name is required";
  } else if (/[^a-zA-Z\s]/.test(values.name)) {
    errors.name = "Name can only contain letters and spaces";
  }

  if (!values.email) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "Email address is invalid";
  }

  if (!values.age) {
    errors.age = "Age is required";
  } else if (values.age <= 0) {
    errors.age = "Age must be greater than 0";
  }

  if (values.attendingWithGuest === '') {
    errors.attendingWithGuest = "Please specify if you are attending with a guest";
  } else if (values.attendingWithGuest === 'yes' && !values.guestName) {
    errors.guestName = "Guest Name is required";
  }

  return errors;
};

const Form = () => {
  const { values, errors, formSubmitted, handleChange, handleSubmit, resetForm } = useForm(
    {
      name: '',
      email: '',
      age: '',
      attendingWithGuest: '',
      guestName: '',
    },
    validate
  );

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={values.name}
            onChange={handleChange}
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>
        <div className="form-field">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>
        <div className="form-field">
          <label>Age</label>
          <input
            type="number"
            name="age"
            value={values.age}
            onChange={handleChange}
          />
          {errors.age && <p className="error">{errors.age}</p>}
        </div>
        <div className="form-field">
          <label>Are you attending with a guest?</label>
          <div>
            <label>
              <input
                type="radio"
                name="attendingWithGuest"
                value="yes"
                checked={values.attendingWithGuest === 'yes'}
                onChange={handleChange}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="attendingWithGuest"
                value="no"
                checked={values.attendingWithGuest === 'no'}
                onChange={handleChange}
              />
              No
            </label>
          </div>
          {errors.attendingWithGuest && <p className="error">{errors.attendingWithGuest}</p>}
        </div>
        {values.attendingWithGuest === 'yes' && (
          <div className="form-field">
            <label>Guest Name</label>
            <input
              type="text"
              name="guestName"
              value={values.guestName}
              onChange={handleChange}
            />
            {errors.guestName && <p className="error">{errors.guestName}</p>}
          </div>
        )}
        <button type="submit">Submit</button>
      </form>
      <Modal show={formSubmitted} onClose={resetForm}>
        <h2>Form Summary</h2>
        <p>Name: {values.name}</p>
        <p>Email: {values.email}</p>
        <p>Age: {values.age}</p>
        <p>Attending with Guest: {values.attendingWithGuest === 'yes' ? 'Yes' : 'No'}</p>
        {values.attendingWithGuest === 'yes' && <p>Guest Name: {values.guestName}</p>}
      </Modal>
    </div>
  );
};

export default Form;
