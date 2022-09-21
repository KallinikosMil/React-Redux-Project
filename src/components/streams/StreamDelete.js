import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteStream, fetchStream } from '../../actions';
import history from '../../history';
import Modal from '../Modal';

const StreamDelete = (props) => {
  useEffect(() => {
    props.fetchStream(props.match.params.id);
  }, []);
  const actions = (
    <>
      <button
        onClick={() => props.deleteStream(props.match.params.id)}
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
  return (
    <Modal
      title="Delete Stream"
      content={
        !props.stream
          ? 'Are you sure you want to delete this stream?'
          : `Are you sure you want to delete the stream with title: ${props.stream.title}`
      }
      actions={actions}
      onDismiss={() => history.push('/')}
    />
  );
};
const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
};
export default connect(mapStateToProps, { fetchStream, deleteStream })(
  StreamDelete
);
