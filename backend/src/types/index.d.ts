declare namespace Express {
    type User={
        id: string;
        email: string;
        username: string;
        fullName: string
    }
    export interface Request {
      user?: User; // Replace `any` with a specific user type if you have one
    }
  }