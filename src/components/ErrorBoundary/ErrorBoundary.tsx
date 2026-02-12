import type { ReactNode } from "react";
import { Component } from "react";
import { ModalPortal } from "@/components/ModalPortal/ModalPortal";
import classNames from "classnames/bind";
import styles from "@/components/ErrorBoundary/ErrorBoundary.module.scss";
import { Button } from "@/ui/Button/Button";

const cn = classNames.bind(styles);

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  errorMessage: string;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = {
    hasError: false,
    errorMessage: "",
  };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, errorMessage: error.message };
  }

  resetError = () => {
    this.setState({ hasError: false, errorMessage: "" });
  };

  render() {
    if (this.state.hasError) {
      return (
        <ModalPortal isOpen={true}>
          <div className={cn("error-modal")}>
            <div className={cn("error-modal__header")}>Ups!</div>
            <div className={cn("error-modal__body")}>
              {this.state.errorMessage || "Es ist ein Fehler aufgetreten."}
            </div>
            <div className={cn("error-modal__footer")}>
              <Button onClick={this.resetError}>Zurücksetzen</Button>
            </div>
          </div>
        </ModalPortal>
      );
    }

    return this.props.children;
  }
}
