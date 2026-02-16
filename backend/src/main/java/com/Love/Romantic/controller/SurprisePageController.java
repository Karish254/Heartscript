package com.Love.Romantic.controller;

import com.Love.Romantic.model.SurprisePage;
import com.Love.Romantic.service.SurprisePageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/pages")
@CrossOrigin(origins = "*") // For local development simplicity
public class SurprisePageController {

    @Autowired
    private SurprisePageService service;

    @PostMapping
    public ResponseEntity<SurprisePage> createPage(@RequestBody SurprisePage page) {
        return ResponseEntity.ok(service.createPage(page));
    }

    @GetMapping("/{slug}")
    public ResponseEntity<SurprisePage> getPage(@PathVariable String slug) {
        return service.getPageBySlug(slug)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
