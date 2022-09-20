import _ from 'lodash';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { editStream, fetchStream } from '../../actions';
import StreamForm from './StreamForm';

const StreamEdit = (props) => {
  useEffect(() => {
    props.fetchStream(props.match.params.id);
  }, []);

  const onSubmit = (formValues) => {
    props.editStream(props.match.params.id, formValues);
  };

  return (
    <div>
      <h3>Edit a Stream</h3>
      <StreamForm
        onSubmit={onSubmit}
        initialValues={
          props.stream && _.pick(props.stream, 'title', 'description')
        }
      />
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchStream, editStream })(
  StreamEdit
);
