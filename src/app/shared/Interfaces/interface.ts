export interface User {
  mail: string
  nickname: string
  password: string
  photo: string
  first: true
}

export interface Pfx {
  userId: string
  money_acount: number
  money_saved: ForeignCurrency[]
  money_per_day: number
  start_selected_day: Date
  end_selected_day: Date
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
