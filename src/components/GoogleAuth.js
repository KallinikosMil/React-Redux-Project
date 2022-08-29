import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';

import { signIn, signOut } from '../actions';

const GoogleAuth = (props) => {
  const auth = useRef('');

  useEffect(() => {
    console.log('1');
    window.gapi.load('client:auth2', () => {
      window.gapi.client
        .init({
          clientId:
            '356641501173-hcs9ihlgvfv3ph6fh2pu16o65fvm6gc3.apps.googleusercontent.com',
          scope: 'email',
          plugin_name: 'streamy',
        })
        .then(() => {
          auth.current = window.gapi.auth2.getAuthInstance();
          onAuthChange(auth.current.isSignedIn.get());
          auth.current.isSignedIn.listen(onAuthChange);
        });
    });
  }, []);

  const onAuthChange = (isSignedIn) => {
    if (isSignedIn) {
      props.signIn(auth.current.currentUser.get().getId());
    } else {
      props.signOut();
    }
  };

  const onSignInClick = () => {
    auth.current.signIn();
  };

  const onSignOutClick = () => {
    auth.current.signOut();
  };

  const renderAuthButton = () => {
    if (props.isSignedIn === null) {
      return null;
    } else if (props.isSignedIn) {
      return (
        <button onClick={onSignOutClick} className="ui red google button">
          <i className="google icon" />
          Sign Out
        </button>
      );
    } else {
      return (
        <button onClick={onSignInClick} className="ui red google button">
          <i className="google icon" />
          Sign In With Google
        </button>
      );
    }
  };

  return <div>{renderAuthButton()}</div>;
};
const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn };
};

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);
