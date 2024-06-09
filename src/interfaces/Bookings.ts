interface Bookings {
  _id: string;
  email: string;

  name: string;

  photoURL: string;
  guide: string;
  price: number;

  date: Date;

  status: string;
  paid: boolean;
  packageID: string;
}

export default Bookings;
