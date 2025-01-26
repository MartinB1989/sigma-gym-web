export interface ClassObj {
  id: string
  name: string
  description: string
  capacity: number
  schedules: Array<{
    id: string
    weekDay: string
    startTime: string
    endTime: string
  }>
}

interface Schedule {
  id?: string;
  weekDay: string;
  startTime: string;
  endTime: string;
}

export interface ClassFormData {
  name: string
  description: string
  capacity: number
  schedules: Schedule[]
}