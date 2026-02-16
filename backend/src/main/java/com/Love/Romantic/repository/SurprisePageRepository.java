package com.Love.Romantic.repository;

import com.Love.Romantic.model.SurprisePage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SurprisePageRepository extends JpaRepository<SurprisePage, Long> {
    Optional<SurprisePage> findBySlug(String slug);
}
