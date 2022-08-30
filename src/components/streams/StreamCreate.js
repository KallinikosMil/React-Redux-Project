import React from 'react';
import { Field, reduxForm } from 'redux-form';
//Field is supposed to be a react component and thats why it has a capital F
//a component that we are going to render on the screen

//reduxForm is a function. it has the same functionality as the connect
// function that we use with React Redux! (lecture 327)

const StreamCreate = (props) => {
  const renderInput = ({ input, label }) => {
    return (
      <div className="field">
        <label>{label}</label>
        <input {...input} />
      </div>
    );
  };
  return (
    <form className="ui form">
      <Field name="title" component={renderInput} label="Enter Title" />
      <Field
        name="description"
        component={renderInput}
        label="Enter Description"
      />
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
