import _ from 'lodash';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editStream, fetchStream } from '../../actions';
import StreamForm from './StreamForm';

const StreamEdit = (props) => {
  const { id } = props.match.params;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchStream(id));
  }, []);

  const onSubmit = (formValues) => {
    dispatch(editStream(id, formValues));
  };
  const stream = useSelector((state) => state.streams[id]);

  return (
    <div>
      <h3>Edit a Stream</h3>
      <StreamForm
        onSubmit={onSubmit}
        initialValues={stream && _.pick(stream, 'title', 'description')}
      />
    </div>
  );
};

export default StreamEdit;
