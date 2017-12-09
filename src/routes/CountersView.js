import React from 'react';
import { Row, Col, Icon, Tag } from 'antd';
import UpDownCounter from '../components/UpDownCounter';
import ResetCounters from '../components/ResetCounters';
import styles from './counterviews.css';

// A simple interface
const CountersView = () => {
  // For each counter, set index and how much the counting will be modified
  return (
    <div>
      <Row gutter={2} type="flex" justify="center">
        <ResetCounters />
      </Row>
      <Row gutter={10}>
        <Col sm={12} md={8}>
          <UpDownCounter index="counter0" step="1" />
        </Col>
        <Col sm={12} md={8}>
          <UpDownCounter index="counter1" step="2" />
        </Col>
        <Col sm={12} md={8}>
          <UpDownCounter index="counter2" step="3" />
        </Col>
      </Row>
      <Row gutter={2} type="flex" justify="center">
        <div className={styles.helpText}>
          <div><span className={styles.helpIcon}><Icon type="info-circle" /></span> You can use the keyboard to affect all counters: </div>
          <div>
            <ol>
              <li>Increment all counters by one(1s delay): <Tag>⌘ + up</Tag> <Tag>Ctrl + up</Tag></li>
              <li>Decrement all counters by one(1s delay): <Tag>⌘ + up</Tag> <Tag>Ctrl + up</Tag></li>
              <li>Reset all counters to zero: <Tag>Space</Tag></li>
            </ol>
          </div>
        </div>
      </Row>
    </div>
  );
};

export default CountersView;
