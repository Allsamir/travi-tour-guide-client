interface Bookings {
  _id: string;
  email: string;

  name: string;

  photoURL: string;
  guide: string;
  price: number;

  date: Date;

  status: string;
  packageID: string;
}

export default Bookings;
