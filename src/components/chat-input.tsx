"use client";

import { useState, useEffect } from "react";
import { sendDiscordMessage, getLatestDiscordMessages, DiscordMessage } from "@/services/discord";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";

export const ChatInput = () => {
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("User"); // Default username
  const [chatHistory, setChatHistory] = useState<DiscordMessage[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const messages = await getLatestDiscordMessages();
        setChatHistory(messages);
      } catch (error) {
        console.error("Error fetching chat history:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load chat history.",
        });
      }
    };

    fetchChatHistory();
  }, []);

  const handleSendMessage = async () => {
    if (message.trim() === "") {
      return;
    }

    try {
      await sendDiscordMessage(message, username);
      setMessage(""); // Clear the input after sending
      // Optimistically update chat history
      setChatHistory(prevHistory => [...prevHistory, { username, content: message }]);
      toast({
        title: "Message Sent!",
        description: "Your message has been sent to the DJ.",
      });
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to send message. Please try again.",
      });
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-md">
      <ScrollArea className="w-full h-48 mb-2 rounded-md border p-2">
        {chatHistory.map((msg, index) => (
          <div key={index} className="mb-1">
            <span className="font-semibold">{msg.username}:</span> {msg.content}
          </div>
        ))}
      </ScrollArea>
      <Input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="mb-2"
      />
      <div className="flex w-full">
        <Input
          type="text"
          placeholder="Type your message here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="mr-2"
        />
        <Button onClick={handleSendMessage}>Send</Button>
      </div>
    </div>
  );
};
