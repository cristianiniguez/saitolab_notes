import React from 'react';
import { connect } from 'react-redux';

import Alert from 'react-bootstrap/Alert';

import { removeAlert } from '../actions';

const Main = ({ children, alert, removeAlert }) => {
  return (
    <main>
      <section>
        {alert && (
          <div className='container pt-4'>
            <Alert variant={alert.type} dismissible onClose={removeAlert}>
              {alert.content}
            </Alert>
          </div>
        )}
      </section>
      {children}
    </main>
  );
};

const mapStateToProps = (state) => ({
  alert: state.alert,
});

const mapDispatchToProps = {
  removeAlert,
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
