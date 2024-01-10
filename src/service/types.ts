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

  export interface ErrorResponse {
    messages: string[]
    source: string
    exception: string
    errorId: string
    supportMessage: string
    statusCode: number
  }

  export type Session = {
    result: string[]
    token: string
  }

  export type MemberProps ={

    image:string
   memberId : string
   gender:string
      id?:string
      value:string
      name : string
      description : string
      phoneNo:string
      status?: string;
      email:string
      memberSince:string
      membershipExpirationCountDown:string
   
  }
  export type BookingsProps={

    image:string
    memberId : string
    gender:string
       id?:string
       value:string
       name : string
       description : string
       phoneNo:string
       status?: string;
       email:string
       memberSince:string
       membershipExpirationCountDown:string
  }

