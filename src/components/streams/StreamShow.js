import flv from 'flv.js';
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStream } from '../../actions';

const StreamShow = (props) => {
  const dispatch = useDispatch();
  const { id } = props.match.params;
  const videoRef = useRef();
  const player = useRef();
  console.log('1');
  const stream = useSelector((state) => state.streams[id]);

  useEffect(() => {
    dispatch(fetchStream(id));
  }, [dispatch, id]);

  useEffect(() => {
    const buildPlayer = () => {
      if (!stream) {
        return;
      }
      player.current = flv.createPlayer({
        type: 'flv',
        url: `http://localhost:8000/live/${id}.flv`,
      });
      player.current.attachMediaElement(videoRef.current);
      player.current.load();
    };
    buildPlayer();
    return () => {
      if (player.current) {
        player.current.destroy();
      }
    };
  }, [stream, id]);

  if (!stream) {
    return <div>Loading</div>;
  }

  return (
    <div>
      <video ref={videoRef} style={{ width: '100%' }} controls />
      <h1>{stream.title}</h1>
      <h5>{stream.description}</h5>
    </div>
  );
};

export default StreamShow;
