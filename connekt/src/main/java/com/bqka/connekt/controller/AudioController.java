package com.bqka.connekt.controller;

import com.bqka.connekt.service.WhisperClient;

import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/audio")
public class AudioController {

    private final WhisperClient whisperClient;

    @PostMapping("/upload")
    public ResponseEntity<String> upload(
            @RequestParam("file") MultipartFile file,
            @RequestParam(defaultValue = "false") boolean translate) {

        String text = whisperClient.callWhisper(file, translate);
        return ResponseEntity.ok(text);
    }

    @GetMapping("/ping")
    public String ping() {
        return "Backend is alive!";
    }

}