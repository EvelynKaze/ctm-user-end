export interface UserAction {
  id: string;
  type: 'withdrawal' | 'investment';
  name: string;
  location: string;
  amount: number;
  timestamp: Date;
}

const userActions: UserAction[] = [
  {
    id: "1",
    type: "withdrawal",
    name: "Enola Rutherford",
    location: "Jacobport, Italy",
    amount: 53982.56,
    timestamp: new Date(),
  },
  {
    id: "2", 
    type: "investment",
    name: "Sarah Thompson",
    location: "New York, USA",
    amount: 25000.00,
    timestamp: new Date(),
  },
  {
    id: "3",
    type: "withdrawal",
    name: "James Carter",
    location: "London, UK", 
    amount: 18750.25,
    timestamp: new Date(),
  },
  {
    id: "4",
    type: "investment",
    name: "Amina Khalid",
    location: "Dubai, UAE",
    amount: 42300.80,
    timestamp: new Date(),
  },
  {
    id: "5",
    type: "withdrawal",
    name: "Lucas Martins",
    location: "São Paulo, Brazil",
    amount: 31200.45,
    timestamp: new Date(),
  },
  {
    id: "6",
    type: "investment", 
    name: "Priya Patel",
    location: "Mumbai, India",
    amount: 15600.90,
    timestamp: new Date(),
  },
  {
    id: "7",
    type: "withdrawal",
    name: "Michael Nguyen",
    location: "Sydney, Australia",
    amount: 67500.30,
    timestamp: new Date(),
  },
  {
    id: "8",
    type: "investment",
    name: "Emily Davis",
    location: "Toronto, Canada", 
    amount: 38900.75,
    timestamp: new Date(),
  },
  {
    id: "9",
    type: "withdrawal",
    name: "Daniel Kim",
    location: "Seoul, South Korea",
    amount: 29800.60,
    timestamp: new Date(),
  },
  {
    id: "10",
    type: "investment",
    name: "Sofia Lopez",
    location: "Madrid, Spain",
    amount: 21450.85,
    timestamp: new Date(),
  },
  {
    id: "11",
    type: "withdrawal",
    name: "Tom Anderson",
    location: "Berlin, Germany",
    amount: 45600.20,
    timestamp: new Date(),
  },
  {
    id: "12",
    type: "investment",
    name: "Nina Roberts",
    location: "Paris, France",
    amount: 33750.40,
    timestamp: new Date(),
  }
];

export default userActions;
