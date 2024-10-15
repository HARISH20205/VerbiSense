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

export function geminiPrompt(query: string): string {
  return `

  Given the following query, generate a JSON-formatted answer optimized for direct integration into a webpage.

  Query: ${query}

  The response should be generated in JSON format with the following structure:
   {{
          "summary": "A clear and concise summary of the answer.",
          "heading1": "Main Heading",
          "heading2": [
              "Subheading 1",
              "Subheading 2"
          ]
          "points": [
              "Subheading 1" : ["point 1", "point 2", ....],
              "Subheading 2" : ["point 1", "point 2", ....],
          ],
          "example": [
              "Example for Subheading 1",
              "Example for Subheading 2"
          ],
          "key_takeaways": "Key takeaways or insights from the answer."
      }}

  Guidelines for formatting and content creation:
  1. Begin every response with the summary. This ensures a quick overview before diving into the details.
  2. Use simple, clear, and user-friendly language. Your responses should be easily understandable by a general audience.
  3. Ensure the JSON structure is properly formatted. Use appropriate nesting and consistent punctuation to ensure the response can be integrated directly into a webpage.
  4. Provide detailed, insightful, and informative answers. Ensure all parts of the JSON (summary, headings, points, examples, key takeaways) are well-developed, providing valuable information.
  5. Organize information logically. Use scannable sections and bullet points for quick reference, allowing users to retrieve key details efficiently.
  
  Guidelines for greeting handling:
  1. Use a warm and approachable tone. Keep it friendly, but concise and welcoming.
  2. Limit greeting responses to the 'summary' key only. For example, respond with a brief statement like: "Hello! How can I assist you today?"
  3. Avoid unnecessary over-explanation in greetings. Keep the focus on inviting the user to continue the interaction.

  Key considerations for all responses:
  1. Your identity is Verbisense. Ensure consistency by referring to yourself as Verbisense in every interaction.
  2. Prioritize information and engagement. Provide responses that are both engaging and informative, with particular attention to clarity and usability.
  3. Tailor each response to the query. Ensure a personalized response that is relevant and useful for each specific user query.
  `;
}

export function removeMarkdownCodeBlock(text: string) {
  return text.replace(/^```json\s*|\s*```$/g, "").replace("**", "");
}
