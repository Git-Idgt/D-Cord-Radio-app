"use client";

import { useState } from "react";
import { sendDiscordMessage } from "@/services/discord";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export const ChatInput = () => {
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("User"); // Default username
  const { toast } = useToast();

  const handleSendMessage = async () => {
    if (message.trim() === "") {
      return;
    }

    try {
      await sendDiscordMessage(message, username);
      setMessage(""); // Clear the input after sending
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
