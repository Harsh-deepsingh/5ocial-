import { IconMoodSmile } from "@tabler/icons-react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { useState } from "react";
interface Emoji {
  native: string;
}

const Emoji = ({ sendEmoji }: { sendEmoji: (arg0: string) => void }) => {
  const [emojiBoard, setEmojiBoard] = useState(false);
  const [emoji, setEmoji] = useState<Emoji | null>(null);

  if (emoji?.native) {
    sendEmoji(emoji.native);
  }

  return (
    <div>
      <button onClick={() => setEmojiBoard((prev) => !prev)}>
        <IconMoodSmile />
      </button>
      {emojiBoard ? (
        <div className="absolute scale-75 top-24">
          <Picker data={data} onEmojiSelect={setEmoji} />
        </div>
      ) : null}
    </div>
  );
};

export default Emoji;
