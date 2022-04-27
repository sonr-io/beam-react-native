import { format } from "date-fns";

export const getTime = (date: number) => format(new Date(date), "hh:mm aa");
