package com.Love.Romantic.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "surprise_pages")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SurprisePage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String slug;

    @Column(nullable = false)
    private String creatorName;

    @Column(nullable = false)
    private String recipientName;

    private String occasion;
    private String relationship;

    @Column(columnDefinition = "TEXT")
    private String message;

    private String theme;
    private String musicUrl;

    @ElementCollection
    @CollectionTable(name = "surprise_page_photos", joinColumns = @JoinColumn(name = "surprise_page_id"))
    @Column(name = "photo_url")
    private List<String> photoUrls;

    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}
