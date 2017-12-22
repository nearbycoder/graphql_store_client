import React, { Component } from 'react';
import { EventEmitter } from '../lib';
import styled, { keyframes } from 'styled-components';
import polychrome from 'polychrome';

const AlertContainer = styled.div``;

const Animate = keyframes`
  100% {
    top: 0;
  }
`;

const Alert = styled.figure`
  -webkit-box-shadow: 0 2px 15px 0 rgba(45, 45, 45, 0.2);
  -moz-box-shadow: 0 2px 15px 0 rgba(45, 45, 45, 0.2);
  -o-box-shadow: 0 2px 15px 0 rgba(45, 45, 45, 0.2);
  box-shadow: 0 2px 15px 0 rgba(45, 45, 45, 0.2);
  animation-duration: 0.8s;
  animation-fill-mode: forwards;
  animation-name: ${Animate};
  font-family: 'Lato', 'Helvetica', sans-serif;
  font-style: normal;
  font-weight: 400;
  position: fixed;
  top: -500px;
  right: 0;
  left: 0;
  border: none;
  border-radius: 0;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
  width: 100%;
  z-index: 100001;
  ${props =>
    props.type === 'success' &&
    `
    background: #3296F1;
    #app-icon {
      fill: ${polychrome('#3296F1')
        .darken(20)
        .rgb()};
    }
  `} ${props =>
      props.type === 'caution' &&
      `
    background: #EDAC59;
    #app-icon {
      fill: ${polychrome('#EDAC59')
        .darken(20)
        .rgb()};
    }
  `} ${props =>
      props.type === 'warning' &&
      `
    background: #ff5f60;
    #app-icon {
      fill: ${polychrome('#ff5f60')
        .darken(20)
        .rgb()};
    }
  `};
`;

const AlertText = styled.h5`
  font-size: 18px;
  color: #ffffff;
  margin: 0;
`;

const AlertTrigger = styled.a`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;

const AlertImage = styled.svg`
  height: 15px;
  width: 15px;
`;

export default class AlertPortal extends Component {
  state = {
    alerts: [],
    emitter: EventEmitter.subscribe('alert', alert => {
      this.setState({ alerts: [...this.state.alerts, alert] });
      setTimeout(() => {
        const index = this.state.alerts.indexOf(alert);
        this.closeAlert(index);
      }, alert.timeout ? alert.timeout : 5000);
    })
  };

  closeAlert = (index, event) => {
    this.setState({
      alerts: this.state.alerts.filter((_, i) => i !== index)
    });
    if (event) {
      event.preventDefault();
    }
  };

  componentWillUnmount() {
    this.state.emitter();
  }

  renderAlerts() {
    return this.state.alerts.map((alert, index) => (
      <Alert key={index} type={alert.type}>
        <AlertText>{alert.message}</AlertText>
        <AlertTrigger href="#" onClick={event => this.closeAlert(index, event)}>
          <AlertImage width="15" height="15" viewBox="0 0 15 15">
            <title>cancel-path</title>
            <path
              d="M14.577 14.573c-.267.267-.63.417-1.007.417-.378 0-.74-.15-1.007-.417L7.51 9.52l-5.056 5.053c-.355.377-.887.53-1.388.4-.5-.128-.892-.52-1.02-1.02-.13-.503.024-1.034.4-1.39L5.502 7.51.448 2.454C.07 2.1-.083 1.57.045 1.067c.13-.5.52-.893 1.02-1.022.502-.13 1.034.024 1.39.4L7.508 5.5 12.562.446c.358-.366.884-.51 1.38-.38.493.13.88.516 1.01 1.01.13.495-.015 1.022-.38 1.38L9.517 7.508l5.054 5.054c.555.554.557 1.453.005 2.01z"
              fill="#B0BFC7"
              fillRule="evenodd"
              id="app-icon"
            />
          </AlertImage>
        </AlertTrigger>
      </Alert>
    ));
  }

  render() {
    return (
      <AlertContainer show={this.props.trigger} inverse={this.props.inverse}>
        {this.renderAlerts()}
      </AlertContainer>
    );
  }
}
