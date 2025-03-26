export interface EmployeeSettingProps {
    id: string;
    duration: number;
    start_time: string;
    end_time: string;
    intervals: Array<SettingsInterval>;
    saturday_off: boolean;
    close_days: number;
    employee_id: string;
}

export interface SettingsInterval {
    start: string;
    end: string;
}