const getDaySuffix = (day: number) => {
  if (day > 3 && day < 21) return "th";
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
};

export const formatChatTimestamp = (timestamp: number) => {
  const date = new Date(Number(timestamp));
  const month = date.toLocaleString("en-US", { month: "short" });
  const day = date.getDate();
  const daySuffix = getDaySuffix(day);
  const time = date.toLocaleString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return `${month} ${day}${daySuffix}, ${time}`;
};
