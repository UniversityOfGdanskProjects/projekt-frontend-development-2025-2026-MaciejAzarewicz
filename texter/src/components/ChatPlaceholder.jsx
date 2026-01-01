import { useContext } from "react";
import { ChatContext } from "../context/ChatContext";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";

export default function ChatPlaceholder() {
  const { activeContactId } = useContext(ChatContext);

  if (!activeContactId) {
    return (
      <div className="chat-area">
        <p>Wybierz rozmowę</p>
      </div>
    );
  }

  return (
    <div className="chat-area">
      <ChatMessages />
      <ChatInput />
    </div>
  );
}
