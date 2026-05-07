package com.guevarra.petstore.controller;

import com.guevarra.petstore.entity.Pet;
import com.guevarra.petstore.service.PetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/guevarra")
@CrossOrigin(origins = "*") // Configure properly for production
public class PetController {

    @Autowired
    private PetService petService;

    @GetMapping("/pets")
    public ResponseEntity<Map<String, Object>> getPets(
            @RequestParam(required = false) Pet.PetType type,
            @RequestParam(required = false) BigDecimal minPrice,
            @RequestParam(required = false) BigDecimal maxPrice,
            @RequestParam(required = false) Integer minAge,
            @RequestParam(required = false) Integer maxAge,
            @RequestParam(required = false) String search,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {

        try {
            List<Pet> pets = petService.getFilteredPets(type, minPrice, maxPrice, minAge, maxAge, search, page, size);
            int totalElements = petService.getTotalFilteredCount(type, minPrice, maxPrice, minAge, maxAge, search);
            int totalPages = (int) Math.ceil((double) totalElements / size);

            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("data", Map.of(
                "pets", pets,
                "totalElements", totalElements,
                "totalPages", totalPages,
                "currentPage", page,
                "size", size
            ));

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                .body(Map.of("success", false, "error", "Internal server error", "code", "INTERNAL_ERROR"));
        }
    }

    @GetMapping("/pets/{id}")
    public ResponseEntity<Map<String, Object>> getPetById(@PathVariable Long id) {
        try {
            Optional<Pet> pet = petService.getPetById(id);
            if (pet.isPresent()) {
                Map<String, Object> response = new HashMap<>();
                response.put("success", true);
                response.put("data", pet.get());
                return ResponseEntity.ok(response);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                .body(Map.of("success", false, "error", "Internal server error", "code", "INTERNAL_ERROR"));
        }
    }

    @GetMapping("/pets/types")
    public ResponseEntity<Map<String, Object>> getPetTypes() {
        try {
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("data", Map.of("types", List.of("DOG", "CAT", "BIRD", "FISH")));
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                .body(Map.of("success", false, "error", "Internal server error", "code", "INTERNAL_ERROR"));
        }
    }
}