import React, { Component } from 'react';
import renderGlobe from './renderGlobe';

export default class GlobeMenu extends Component {
  constructor(props) {
    super(props);
    this.componentDidMount = this.componentDidMount.bind(this);
  }
  componentDidMount() {
    renderGlobe(this.container);
  }

  render() {
    return (
      <div
        ref={(el) => { this.container = el; }}
        className="globeContainer"
      />
    );
  }
}
