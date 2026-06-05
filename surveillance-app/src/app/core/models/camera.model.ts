export interface Camera {
    id: string;
    name: string;
    resolution: string;
    fps: number | null;
    status: 'REC' | 'OFFLINE';
    motionDetected: boolean;
    lastUpdate?: string;
}

export interface Metrics {
    activeCameras: { current: number; total: number; trend: string; trendPeriod: string };
    alerts: { count: number; trend: string; trendPeriod: string };
    storage: { used: string; capacityRemains: string };
    cpu: { load: string; status: string };
}