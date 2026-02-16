package com.Love.Romantic.service;

import com.Love.Romantic.model.SurprisePage;
import com.Love.Romantic.repository.SurprisePageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class SurprisePageService {

    @Autowired
    private SurprisePageRepository repository;

    public SurprisePage createPage(SurprisePage page) {
        if (page.getSlug() == null || page.getSlug().isEmpty()) {
            page.setSlug(UUID.randomUUID().toString().substring(0, 8));
        }
        
        if (page.getMessage() == null || page.getMessage().isEmpty()) {
            page.setMessage(generateRomanticMessage(page));
        }
        
        return repository.save(page);
    }

    public Optional<SurprisePage> getPageBySlug(String slug) {
        return repository.findBySlug(slug);
    }

    private String generateRomanticMessage(SurprisePage page) {
        String recipient = page.getRecipientName();
        String creator = page.getCreatorName();
        String occasion = page.getOccasion() != null ? page.getOccasion().toLowerCase() : "special day";
        String relationship = page.getRelationship() != null ? page.getRelationship().toLowerCase() : "someone special";

        String[] templates = {
            "My dearest %s, on this %s, I wanted to tell you how much you mean to me. You are my %s and my everything. With all my love, %s.",
            "To the most beautiful soul, %s: Every moment with you feels like a dream. Happy %s! You are the best %s anyone could ask for. Forever yours, %s.",
            "Hey %s, just a little surprise to remind you that I love you more than words can say. This %s is just another reason to celebrate us. You're my favorite %s. Love, %s."
        };

        String template = templates[(int) (Math.random() * templates.length)];
        return String.format(template, recipient, occasion, relationship, creator);
    }
}
