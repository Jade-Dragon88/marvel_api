import React, { Component } from "react";
import ErrorMessage from "../errorMessage/errorMessage";

class ErrorBoundary extends Component {
  state = {
    error: false,
  };

  // static getDerivedStateFromError() {
  //   return { error: true };
  // }

  componentDidCatch(error, errorInfo) {
    console.log(error, errorInfo);
    this.setState({
      error: true,
    });
  }

  render() {
    const { error } = this.state;
    const { children } = this.props;
    if (error) {
      return <ErrorMessage />;
    }
    return children;
  }
}

export default ErrorBoundary;
