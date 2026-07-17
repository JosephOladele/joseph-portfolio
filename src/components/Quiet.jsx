import React from "react";

/*
 * An error boundary for decorative children. If a flourish (like the
 * WebGL robot scene) throws while loading or rendering, the fallback
 * takes its place and the page carries on — cosmetics must never take
 * the site down.
 */
export default class Quiet extends React.Component {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch() {
    this.props.onFail?.();
  }

  render() {
    if (this.state.failed) return this.props.fallback ?? null;
    return this.props.children;
  }
}
