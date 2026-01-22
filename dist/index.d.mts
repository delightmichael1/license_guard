import * as react_jsx_runtime from 'react/jsx-runtime';

interface AppValidatorProps {
    appId: string;
    appName?: string;
    apiEndpoint?: string;
    children: React.ReactNode;
}
declare function AppValidator({ appId, appName, apiEndpoint, children, }: AppValidatorProps): react_jsx_runtime.JSX.Element;

interface MaintenanceProps {
    appName?: string;
    message?: string;
}
declare function Maintenance({ appName, message }: MaintenanceProps): react_jsx_runtime.JSX.Element;

interface ValidationResponse {
    status: "OK" | "MAINTENANCE";
    message?: string;
}
declare function validateApp(appId: string, apiEndpoint?: string): Promise<ValidationResponse>;

declare function setValidationCookie(name: string, value: string, hours?: number): void;
declare function getValidationCookie(name: string): string | null;
declare function deleteValidationCookie(name: string): void;

declare const OFFLINE_GRACE_PERIOD: number;
declare const DEFAULT_API_ENDPOINT = "http://localhost:8000/v1/app/validate";

export { AppValidator, DEFAULT_API_ENDPOINT, Maintenance, OFFLINE_GRACE_PERIOD, type ValidationResponse, deleteValidationCookie, getValidationCookie, setValidationCookie, validateApp };
