export interface IUser {
   _id: string
   name: string
   role: string
   avatarDefault: string
}
export interface IInputSignup {
   name: string
   email: string
   password: string
   confirmPassword: string
}
export interface IInputSignin {
   email: string
   password: string
}
