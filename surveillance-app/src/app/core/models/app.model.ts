export interface UserProfile {
    name: string;
    email: string;
    role: string;
    avatar: string;
}

export interface SystemSettings {
    continuousRecording: boolean;
    aiMotionTracking: boolean;
    darkMode: boolean;
    autoUpdate: boolean;
}

export interface AppNotification {
    id: string;
    message: string;
    time: string;
    isUnread: boolean;
    type: string;
}