import { initialTickets } from "@/data";
import { Ticket } from "../types";

export const getTickets = async () : Promise<Ticket[] | undefined> => {
  // return initialTickets;
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return await new Promise((resolve) => {
    resolve(initialTickets as Ticket[]);
  });
};

