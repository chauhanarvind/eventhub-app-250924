interface User {
  name: string;
  email: string;
  username: string;
  password: string; // In a real-world app, you'd securely hash passwords

  createdAt: Date;
  updatedAt: Date;
}
export default User;
