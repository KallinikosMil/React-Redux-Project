import React from 'react';
import { Field, reduxForm } from 'redux-form';
//Field is supposed to be a react component and thats why it has a capital F
//a component that we are going to render on the screen

//reduxForm is a function. it has the same functionality as the connect
// function that we use with React Redux! (lecture 327)

//When writing functional components with Redux Form you must move
//the renderInput and onSubmit methods outside of the component.
// *****************************************************
// You must define the stateless function outside of your render()
// method, or else it will be recreated on every render and will force the Field to
// rerender because its component prop will be different.
// If you are defining your stateless function inside of render()
// it will not only be slower, but your input will lose focus
// whenever the entire form component rerenders.
//******************************************************
const renderError = ({ error, touched }) => {
  if (touched && error) {
    return (
      <div className="ui error message">
        <div className="header">{error}</div>
      </div>
    );
  }
};
const renderInput = ({ input, label, meta }) => {
  const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
  return (
    <div className={className}>
      <label>{label}</label>
      <input {...input} autoComplete="off" />
      {renderError(meta)}
    </div>
  );
};

const StreamForm = (props) => {
  const onSubmit = (formValues) => {
    props.onSubmit(formValues);
  };

  return (
    <form onSubmit={props.handleSubmit(onSubmit)} className="ui form error">
      <Field name="title" component={renderInput} label="Enter Title" />
      <Field
        name="description"
        component={renderInput}
        label="Enter Description"
      />
      <button className="ui button primary">Submit</button>
    </form>
  );
};

const validate = (formValues) => {
  const errors = {};
  if (!formValues.title) {
    errors.title = 'You must enter a title';
  }
  if (!formValues.description) {
    errors.description = 'You must enter a description';
  }
  return errors;
};

export default reduxForm({
  form: 'streamForm',
  validate,
})(StreamForm);
