export interface User {
    _id: string,
    username: string,
    email:String,
    avatar: string,
    userRole:String,
    password: String
}

export interface TokenPayload {
    username: string;
    email: string;
    avatar: string;
  }