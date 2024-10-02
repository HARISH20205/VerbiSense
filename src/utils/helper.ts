export function getFilenameFromUrl(url: string) {
  const urlObj = new URL(url);
  const pathParts = urlObj.pathname.split("/");
  const filenameWithToken = pathParts[pathParts.length - 1];
  const filename = decodeURIComponent(filenameWithToken.split("?")[0]).split(
    "/"
  )[2];
  return filename;
}
export const truncateFilename = (filename: string, maxLength: number = 35) => {
  if (filename.length > maxLength) {
    return filename.substring(0, maxLength - 3) + "...";
  }
  return filename;
};

export function formatDateAsString(): string {
  const today = new Date();

  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const year = today.getFullYear();
  return `${day}${month}${year}`;
}

export function formatDate(dateStr: string): string {
  // Extract day, month, and year from the string
  const day: number = parseInt(dateStr.slice(0, 2));
  const month: number = parseInt(dateStr.slice(2, 4)) - 1; // months are zero-indexed in JS

  // Create a date object

  // Get the suffix for the day (st, nd, rd, th)
  const getDaySuffix = (day: number): string => {
    if (day > 3 && day < 21) return "th"; // covers 11th to 19th
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

  // Array of month abbreviations
  const monthNames: string[] = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Format the date as "day + suffix + month"
  return `${day}${getDaySuffix(day)} ${monthNames[month]}`;
}
