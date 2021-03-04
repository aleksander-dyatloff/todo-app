export type Color = 'red' | 'blue' | 'green';

export type FetchStatus = 'pending' | 'fulfilled' | 'rejected';

export type TypographyElementName = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';

export type TextTransform = 'capitalize' | 'lowercase' | 'uppercase' | '';

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
