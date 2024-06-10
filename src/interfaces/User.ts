interface User {
  _id: string;
  email: string;
  name: string;
  profilePicture: string;
  role: string;
  number?: string;
  address?: string;
  education?: string;
  skills?: string[];
  work_experience?: string;
  rating?: number;
  requested?: boolean;
  changedRole: boolean;
  comments?: { name: string; comment: string; rating: number }[];
}

export default User;
