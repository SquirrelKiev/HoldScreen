enum PartType {
  Wavy,
  Emote,
  StyledText,
  RawText,
  Group,
}

interface WavyPart {
  type: PartType.Wavy;
  content: Part;
  index: number;
}

interface EmotePart {
  type: PartType.Emote;
  url: string;
  index: number;
}

interface StyledTextPart {
  type: PartType.StyledText;
  content: Part;
  className: string | undefined;
  color: string | undefined;
  index: number;
}

interface RawTextPart {
  type: PartType.RawText;
  content: string;
  index: number;
}

interface GroupPart {
  type: PartType.Group;
  content: Part[];
  index: number;
}

type Part = WavyPart | EmotePart | StyledTextPart | RawTextPart | GroupPart;

export { PartType };
export type {
  Part,
  WavyPart,
  EmotePart,
  StyledTextPart,
  RawTextPart,
  GroupPart,
};
