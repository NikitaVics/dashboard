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
    errorMessage:string[]
    source: string
    exception: string
    errors:string[]
    ScheduledDateTime:string
    errorId: string
    supportMessage: string
    title:string
    statusCode: number
  }

  export type BookingMessage = {
    message : string
  }

  export type Session = {
    result: string[]
    token: string
  }

  export type MemberProps ={
    membershipLeft : string
bookingId:string
    image:string
   memberId : string
   gender:string
   userId : string
   age:string
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
  
         bookingStatus?: string
          userName : string
          userImage : string
          bookingId: string
          slot: string
          bookingDate:string
          tennisCourt?:{
            name:string
            courtImages : string
          },
          teamMembers?:{
            name:string
            imageUrl : string
          }
    
  }

export type ReportProps = {
  bookingDate : string
  court : string
  coach : string
  fromBookingDate  :string
  toBookingDate : string
}

  export type getMember = {
    searchTerm : string
   bookerName : string
   fromBookingDate : string
   toBookingDate : string
  }

  export type getAnnouncementProps = {
    announcementType : string
  }

  export type CourtMaintainence = {
    scheduledDateTime: string
    message : string
    scheduledTime : string
    courtNames:string
    image? : string;
    Message:string
  }

  export type AnnouncementProps = {
    id:string
    message : string
    images : File[];
    date  : string
    time : string
    scheduledDateTime : string
    // images : FileList 
  }

  export type AddCoachProps = {
  name:string
  coachId?: string
  firstName:string
  lastName:string
  phoneNumber:string
  successfulBookings:string
  exp:string
  phoneNo:string
  email:string
  gender:string
  experience:string
  image : File
  }

