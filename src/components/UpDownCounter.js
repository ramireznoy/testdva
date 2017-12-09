import React from 'react';
import { Card, Icon, Button } from 'antd';
import { connect } from 'react-redux';
import styles from './updowncounter.css';

// An autonomous component
class UpDownCounter extends React.Component {
  constructor(props) {
    super(props);
    this.index = this.props.index;
    this.step = parseInt(props.step, 10);
  }

  // Component specific methods
  // In this case the methods are being used to fire actions
  setAsync = (checked) => {
    this.props.dispatch({ type: 'counters/flagAsync', index: this.index, status: checked });
  }

  upCount = () => {
    this.props.dispatch({ type: 'counters/add', index: this.index, step: this.step });
  }

  downCount = () => {
    this.props.dispatch({ type: 'counters/sub', index: this.index, step: this.step });
  }

  // Normal rendering for the component
  render() {
    let top = 0;
    let current = 0;
    if (this.props.counters[this.props.index] !== undefined) {
      top = this.props.counters[this.props.index].top;
      current = this.props.counters[this.props.index].current;
    }
    this.title = 'Top value: '.concat(top);
    return (
      <Card title={this.title} className={styles.frame} >
        <div className={styles.current}>{current}</div>
        <div className={styles.buttons}>
          <Button.Group size="large">
            <Button type="primary" onClick={this.downCount}>
              <Icon type="minus" />Decrease
            </Button>
            <Button type="primary" onClick={this.upCount}>
              Increase<Icon type="plus" />
            </Button>
          </Button.Group>
        </div>
      </Card>
    );
  }
}

// Mapping the properties to connect the component to the store
const mapStateToProps = (state) => {
  return {
    counters: state.counters,
  };
};

export default connect(mapStateToProps)(UpDownCounter);
