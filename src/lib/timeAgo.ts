import { format } from "date-fns";

export const timeAgo = (date: number) => {
  const millisecondsPerMinute = 60 * 1000;
  const millisecondsPerHour = millisecondsPerMinute * 60;
  const millisecondsPerDay = millisecondsPerHour * 24;
  const millisecondsPerWeek = millisecondsPerDay * 7;

  const elapsed = new Date().getTime() - date;

  if (elapsed < millisecondsPerDay) {
    return format(new Date(date), "hh:mm aa");
  } else if (elapsed < millisecondsPerDay * 2) {
    return "yesterday";
  } else if (elapsed < millisecondsPerWeek) {
    return format(new Date(date), "EEEE");
  } else {
    return format(new Date(date), "MM/dd/yyyy");
  }
};
