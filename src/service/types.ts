export type User = {
    name: string
    id: string
    userName: string
    firstName: string
    lastName: string
    email: string
    isActive: boolean
    emailConfirmed: boolean
    phoneNumber: string
    imageUrl: string
  }

  export type Session = {
    result: string[]
    token: string
  }