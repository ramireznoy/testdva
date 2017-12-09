import React from 'react';
import { Icon, Button } from 'antd';
import { connect } from 'react-redux';
import styles from './resetcounters.css';

// An autonomous component
class ResetCounters extends React.Component {
  // Component specific methods
  // In this case the methods are being used to fire actions
  reset = () => {
    this.props.dispatch({ type: 'counters/reset' });
  }

  // Normal rendering for the component
  render() {
    return (
      <div className={styles.resetButton}>
        <Button type="danger" size="large" onClick={this.reset}>
          <Icon type="sync" />General Reset
        </Button>
      </div>
    );
  }
}

// Nothing to map this time
export default connect()(ResetCounters);
