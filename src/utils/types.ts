export type Color = 'red' | 'blue' | 'green';

export type FetchStatus = 'pending' | 'fulfilled' | 'rejected';

export interface Todo {
  readonly id: number
  title: string
  description: string
  isDone: boolean
  color: Color
  startTime: string
  endTime: string
}

export interface TodoInfo {
  readonly id: number
  title?: string
  description?: string
  isDone?: string
  color?: Color
  startTime?: string
  endTime?: string
}
