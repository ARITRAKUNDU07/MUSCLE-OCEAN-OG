export interface Member {
  id: string;
  name: string;
  email: string;
  plan: string;
  amountPaid: number;
  paymentStatus: "Paid" | "Pending" | "Expired";
  validFrom: string; // ISO format or YYYY-MM-DD
  validTill: string; // ISO format or YYYY-MM-DD
}

export const mockMembers: Member[] = [
  {
    id: "1",
    name: "Ravi Kumar",
    email: "ravi.kumar@example.com",
    plan: "1 Year Plan",
    amountPaid: 10000,
    paymentStatus: "Paid",
    validFrom: "2023-11-01",
    validTill: "2024-11-01",
  },
  {
    id: "2",
    name: "Priya Singh",
    email: "priya.singh@example.com",
    plan: "3 Months Plan",
    amountPaid: 3600,
    paymentStatus: "Pending",
    validFrom: "2024-04-10",
    validTill: "2024-07-10",
  },
  {
    id: "3",
    name: "Amit Sharma",
    email: "amit.sharma@example.com",
    plan: "1 Month Plan",
    amountPaid: 1500,
    paymentStatus: "Expired",
    validFrom: "2024-02-01",
    validTill: "2024-03-01",
  },
  {
    id: "4",
    name: "Neha Gupta",
    email: "neha.gupta@example.com",
    plan: "6 Months Plan",
    amountPaid: 6000,
    paymentStatus: "Paid",
    validFrom: "2023-12-15",
    validTill: "2024-06-15",
  },
  {
    id: "5",
    name: "Vikram Das",
    email: "vikram.das@example.com",
    plan: "3 Months Plan",
    amountPaid: 3600,
    paymentStatus: "Paid",
    validFrom: "2024-01-28",
    validTill: "2024-04-28", // About to expire
  }
];
