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
const renderInput = ({ input, label }) => {
  return (
    <div className="field">
      <label>{label}</label>
      <input {...input} />
    </div>
  );
};

const onSubmit = (formValues) => {
  console.log(formValues);
};
const StreamCreate = (props) => {
  return (
    <form onSubmit={props.handleSubmit(onSubmit)} className="ui form">
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

export default reduxForm({
  form: 'streamCreate',
})(StreamCreate);

// import React from 'react';
// import { Field, reduxForm } from 'redux-form';
// class StreamCreate extends React.Component {
//   renderInput(formProps) {
//     return <input {...formProps.input} />;
//   }

//   render() {
//     return (
//       <form>
//         <Field name="title" component={this.renderInput} />
//         <Field name="description" component={this.renderInput} />
//       </form>
//     );
//   }
// }
// export default reduxForm({
//   form: 'sreamCreate',
// })(StreamCreate);
