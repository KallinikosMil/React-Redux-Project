import React, { useEffect, useState } from 'react';

const GoogleAuth = () => {
  const [isSignedIn, setIsSignedIn] = useState(null);
  useEffect(() => {
    window.gapi.load('client:auth2', () => {
      window.gapi.client
        .init({
          clientId:
            '356641501173-hcs9ihlgvfv3ph6fh2pu16o65fvm6gc3.apps.googleusercontent.com',
          scope: 'email',
          plugin_name: 'streamy',
        })
        .then(() => {
          const auth = window.gapi.auth2.getAuthInstance();
          setIsSignedIn(auth.isSignedIn.get());
        });
    });
  }, []);

  const renderAuthButton = () => {
    if (isSignedIn === null) {
      return <div>I dont know if we are signed in</div>;
    } else if (isSignedIn) {
      return <div>I am Signed In</div>;
    } else {
      return <div>I am not signed in</div>;
    }
  };

  return <div>{renderAuthButton()}</div>;
};

export default GoogleAuth;
