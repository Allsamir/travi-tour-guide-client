interface Package {
  title: string;
  tourType: string;
  price: number;
  images: string[];
  description: string;
  tourPlan?: {
    day1: string;
    day2: string;
    day3: string;
  };
  location: string;
}

export default Package;
