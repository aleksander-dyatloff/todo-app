export type Color = 'red' | 'blue' | 'green';

export type FetchStatus = 'pending' | 'fulfilled' | 'rejected' | 'idle';

export type TypographyElementName = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';

export type TextTransform = 'capitalize' | 'lowercase' | 'uppercase' | '';

export type ButtonTypes = 'button' | 'reset' | 'submit' | undefined;

export type AppColor = Color | 'primary' | 'secondary';

export interface Todo {
  readonly id: number
  title: string
  description: string
  isDone: boolean
  color: Color
}

export interface TodoInfo {
  readonly id: number
  title?: string
  description?: string
  isDone?: boolean
  color?: Color
}

export interface TodoValues {
  title?: string
  description?: string
  isDone?: boolean
  color?: Color
}
