export interface EmployeeSettingProps {
    id: string;
    duration: string;
    start_time: string;
    end_time: string;
    intervals: Array<SettingsInterval>;
    saturday_off: boolean;
    close_days: string;
    employee_id: string;
}

export interface SettingsInterval {
    start: string;
    end: string;
}