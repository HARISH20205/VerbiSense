import {
  Eye,
  FileText,
  Film,
  Headphones,
  Image,
  Video,
  Zap,
} from "lucide-react";

export interface AboutDataModel {
  heading: string;
  text: string;
  icon: React.ReactNode;
}
export const capabilitiesData: AboutDataModel[] = [
  {
    icon: <FileText className="w-10 h-10 mt-3 text-black" />,
    heading: "Text Documents",
    text: "Process PDFs, TXT files, and DOCX documents with ease.",
  },
  {
    icon: <Video className="w-10 h-10 mt-3 text-black" />,
    heading: "Video Analysis",
    text: "Extract information and insights from video content.",
  },
  {
    icon: <Headphones className="w-10 h-10 mt-3 text-black" />,
    heading: "Audio Transcription",
    text: "Accurately transcribe and analyze audio files.",
  },
  {
    icon: <Image className="w-10 h-10 mt-3 text-black" />,
    heading: "Image Processing",
    text: "Extract information from images and graphics.",
  },
  {
    icon: <Zap className="w-10 h-10 mt-3 text-black" />,
    heading: "Contextual Responses",
    text: "Deliver accurate, context-rich answers to queries.",
  },
];
export const enhancementsData: AboutDataModel[] = [
  {
    icon: <Eye className="w-10 h-10 mt-3 text-black" />,
    heading: "Advanced Image Recognition",
    text: "Implement cutting-edge image recognition technology for more detailed and accurate image analysis.",
  },
  {
    icon: <Film className="w-10 h-10 mt-3 text-black" />,
    heading: "In-depth Video Analysis",
    text: "Enhance video processing capabilities to extract deeper insights and perform complex scene analysis.",
  },
];
