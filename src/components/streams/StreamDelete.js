import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteStream, fetchStream } from '../../actions';
import history from '../../history';
import Modal from '../Modal';

const StreamDelete = (props) => {
  const dispatch = useDispatch();
  const { id } = props.match.params;

  useEffect(() => {
    dispatch(fetchStream(id));
  }, []);
  const actions = (
    <>
      <button
        onClick={() => dispatch(deleteStream(id))}
        className="ui button negative"
      >
        Delete
      </button>
      <Link to="/" className="ui button">
        Cancel
      </Link>
    </>
  );

  // const renderContent = () => {
  //   if (!props.stream) {
  //     return 'Are you sure you want to delete this stream?';
  //   }

  //   return `Are you sure you want to delete the stream with title: ${props.stream.title}`;
  // };
  const stream = useSelector((state) => state.streams[id]);
  return (
    <Modal
      title="Delete Stream"
      content={
        !stream
          ? 'Are you sure you want to delete this stream?'
          : `Are you sure you want to delete the stream with title: ${stream.title}`
      }
      actions={actions}
      onDismiss={() => history.push('/')}
    />
  );
};

export default StreamDelete;
