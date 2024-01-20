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
    errors:string[]
    ScheduledDateTime:string
    errorId: string
    supportMessage: string
    title:string
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

export type ReportProps = {
  bookingDate : string
  court : string
  coach : string
}

  export type getMember = {
    searchTerm : string
  }

  export type CourtMaintainence = {
    scheduledDateTime: string
    message : string
    scheduledTime : string
    images:string
  }

  export type AddCoachProps = {
  name:string
  coachId?: string
  firstName:string
  lastName:string
  phoneNumber:string
  exp:string
  phoneNo:string
  email:string
  gender:string
  experience:string
  image : File
  }

