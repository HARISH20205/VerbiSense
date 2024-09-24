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
