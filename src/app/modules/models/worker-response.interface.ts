export interface WorkerResponse {
  id:         string;
  firstName:   string;
  lastName:    string;
  email:       string;
  companyCode: string;
  role:        number;
  schedules:   Schedule[];
}

export interface WorkerScheduleResponse {
  workerId: string;
  name: string;
  schedules: Schedule[];
}

export interface Schedule {
  date: string;      // año / mes / día
  start: string;    // Ej: "08:00"
  end: string;      // Ej: "16:00"
}
