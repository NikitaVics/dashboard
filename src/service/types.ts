export type User = {
    name: string
    id: string
    userName: string
    firstName: string
    lastName: string
    email: string
    isActive: Boolean
    emailConfirmed: Boolean
    phoneNumber: string
    imageUrl: string
  }

  export type Session = {
    result: any
    token: string
  }