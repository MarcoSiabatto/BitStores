// Export the class
export class User {
  // Generate a constructor
  constructor(
    public _id: String,
    public names: String,
    public lastName: String,
    public age: Number,
    public email: String,
    public pass: String,
    public role: String,
    public getToken: boolean
  ) {}
}
