export interface User {
  _id?: string
  mail: string
  nickname: string
  password: string
  photo: string
  first: boolean
}

export interface Pfx {
  userId: string
  money_acount: number
  money_saved: ForeignCurrency[]
  money_per_day: number
  start_selected_day: Date | string
  end_selected_day: Date | string
  days: DescriptionDay[]
}

export interface ForeignCurrency {
  name: string
  amount: number
}

export interface DescriptionDay {
  day: Date
  movement_day: Movement[]
  total_amount_day: number
  money_per_day?: number
}

export interface Movement {
  description: string
  amount: number
}

export interface SavingsMovement {
  flow?: string;
  descriptionA?: string;
  descriptionB?: string;
  amount?: number;
  date?: Date;
}
