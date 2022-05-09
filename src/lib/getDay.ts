import { DateTime } from "luxon";

export const getDay = (timestamp: number) => {
  const time = DateTime.fromMillis(timestamp);
  const now = DateTime.now();
  const yesterday = DateTime.now().minus({ days: 1 });

  if (time.hasSame(now, "day")) {
    return "Today";
  } else if (time.hasSame(yesterday, "day")) {
    return "Yesterday";
  }

  return time.toFormat("yyyy LLL dd");
};
