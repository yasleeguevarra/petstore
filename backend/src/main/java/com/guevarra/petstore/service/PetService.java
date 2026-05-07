package com.guevarra.petstore.service;

import com.guevarra.petstore.entity.Pet;
import com.guevarra.petstore.repository.PetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Service
public class PetService {

    @Autowired
    private PetRepository petRepository;

    public List<Pet> getAllPets() {
        return petRepository.findByIsAvailableTrue();
    }

    public Optional<Pet> getPetById(Long id) {
        return petRepository.findById(id);
    }

    public List<Pet> getFilteredPets(Pet.PetType type, BigDecimal minPrice, BigDecimal maxPrice,
                                   Integer minAge, Integer maxAge, String search,
                                   int page, int size) {
        List<Pet> pets = petRepository.findFilteredPets(type, minPrice, maxPrice, minAge, maxAge, search);
        // Simple pagination (in production, use Pageable)
        int fromIndex = page * size;
        int toIndex = Math.min(fromIndex + size, pets.size());
        if (fromIndex > pets.size()) {
            return List.of();
        }
        return pets.subList(fromIndex, toIndex);
    }

    public int getTotalFilteredCount(Pet.PetType type, BigDecimal minPrice, BigDecimal maxPrice,
                                   Integer minAge, Integer maxAge, String search) {
        return petRepository.findFilteredPets(type, minPrice, maxPrice, minAge, maxAge, search).size();
    }

    public Pet savePet(Pet pet) {
        return petRepository.save(pet);
    }

    public void deletePet(Long id) {
        petRepository.deleteById(id);
    }
}