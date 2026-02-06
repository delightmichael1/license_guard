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

declare const OFFLINE_GRACE_PERIOD: number;
declare const DEFAULT_API_ENDPOINT = "";

export { AppValidator, DEFAULT_API_ENDPOINT, Maintenance, OFFLINE_GRACE_PERIOD, type ValidationResponse, validateApp };
