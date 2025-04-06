import React from "react";
import { CheckCircle, AlertCircle, Info } from "lucide-react";
import { Card, CardContent } from "./ui/card";

const TestResult = ({ result }) => {
    const getStatusIcon = (status) => {
        switch (status) {
            case "pass":
                return <CheckCircle className="h-4 w-4 text-green-500" />;
            case "fail":
                return <AlertCircle className="h-4 w-4 text-red-500" />;
            default:
                return <Info className="h-4 w-4 text-gray-500" />;
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "pass":
                return "bg-green-50 border-green-200";
            case "fail":
                return "bg-red-50 border-red-200";
            default:
                return "bg-gray-50 border-gray-200";
        }
    };

    return (
        <>
            <Card className={`border ${getStatusColor(result.status)}`}>
                <CardContent className="p-4">
                    <div className="flex items-start">
                        <div className="mr-3 mt-0.5">{getStatusIcon(result.status)}</div>
                        <div>
                            <h3 className="font-medium flex items-center">
                                <span className="capitalize">{result.elementType}</span>
                                {result.id && (
                                    <span className="text-gray-500 text-sm ml-2">#{result.id}</span>
                                )}
                            </h3>
                            <p className="text-sm text-gray-600 mt-1">{result.message}</p>
                            {result.details && (
                                <p className="text-xs text-gray-500 mt-1">{result.details}</p>
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </>
    );
};

export default TestResult;
