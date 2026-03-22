// Remove markdown formatting characters from text
export const stripMarkdown = (text) => {
  if (!text) return "";

  return (
    text
      // Remove bold (**text** or __text__)
      .replaceAll(/\*\*(.+?)\*\*/g, "$1")
      .replaceAll(/__(.+?)__/g, "$1")
      // Remove italic (*text* or _text_)
      .replaceAll(/\*(.+?)\*/g, "$1")
      .replaceAll(/_(.+?)_/g, "$1")
      // Remove code blocks (```code```)
      .replaceAll(/```[\s\S]*?```/g, "")
      // Remove inline code (`code`)
      .replaceAll(/`(.+?)`/g, "$1")
      // Remove headers (# Header)
      .replaceAll(/^#+\s+/gm, "")
      // Remove links [text](url)
      .replaceAll(/\[(.+?)\]\(.+?\)/g, "$1")
      // Remove horizontal lines
      .replaceAll(/^[-*_]{3,}$/gm, "")
      // Remove list markers
      .replaceAll(/^\s*[-*+]\s+/gm, "")
      // Remove numbered lists
      .replaceAll(/^\s*\d+\.\s+/gm, "")
      // Remove blockquote markers
      .replaceAll(/^\s*>\s+/gm, "")
      // Clean up extra whitespace
      .trim()
  );
};
