interface User {
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
  comments?: { name: string; comment: string }[];
}

export default User;
