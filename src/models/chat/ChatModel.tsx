type Points = {
  [key: string]: string[];
};

export interface ChatModel {
  query: string;
  heading1: string;
  heading2: string[];
  key_takeaways: string;
  points: Points;
  example: string[];
  summary: string;
}