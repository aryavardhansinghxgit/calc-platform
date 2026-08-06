"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Props {
  children: ReactNode;
  fallbackTitle?: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class CalculatorErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("CalculatorErrorBoundary caught an exception:", error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  public render() {
    if (this.state.hasError) {
      return (
        <Card className="bg-slate-900/90 border-red-500/30 p-6 text-center space-y-4 my-4">
          <CardHeader className="p-0 space-y-2">
            <div className="mx-auto p-3 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 w-fit">
              <AlertTriangle className="h-6 w-6" />
            </div>
            <CardTitle className="text-base font-bold text-white">
              {this.props.fallbackTitle || "Calculation Error Occurred"}
            </CardTitle>
            <CardDescription className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
              {this.state.error?.message || "An unexpected error occurred while calculating results. Please verify your inputs and try again."}
            </CardDescription>
          </CardHeader>
          <Button
            onClick={this.handleReset}
            variant="outline"
            className="bg-slate-800 border-slate-700 hover:bg-slate-700 text-white text-xs font-semibold gap-2 mx-auto"
          >
            <RefreshCw className="h-3.5 w-3.5" /> Reset Calculation
          </Button>
        </Card>
      );
    }

    return this.props.children;
  }
}

export default CalculatorErrorBoundary;
