package com.bqka.connekt.controller;

import java.util.Map;

import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class SignallingController {

    @MessageMapping("/send/{roomId}")
    @SendTo("/topic/room/{roomId}")
    public Map<String, Object> signaling(@DestinationVariable String roomId, Map<String, Object> message) {
        return message;
    }
}
