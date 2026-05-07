package com.guevarra.petstore.repository;

import com.guevarra.petstore.entity.Pet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface PetRepository extends JpaRepository<Pet, Long> {

    List<Pet> findByIsAvailableTrue();

    List<Pet> findByTypeAndIsAvailableTrue(Pet.PetType type);

    @Query("SELECT p FROM Pet p WHERE p.isAvailable = true " +
           "AND (:type IS NULL OR p.type = :type) " +
           "AND (:minPrice IS NULL OR p.price >= :minPrice) " +
           "AND (:maxPrice IS NULL OR p.price <= :maxPrice) " +
           "AND (:minAge IS NULL OR p.age >= :minAge) " +
           "AND (:maxAge IS NULL OR p.age <= :maxAge) " +
           "AND (:search IS NULL OR LOWER(p.name) LIKE LOWER(CONCAT('%', :search, '%')) " +
           "OR LOWER(p.description) LIKE LOWER(CONCAT('%', :search, '%')))")
    List<Pet> findFilteredPets(@Param("type") Pet.PetType type,
                              @Param("minPrice") BigDecimal minPrice,
                              @Param("maxPrice") BigDecimal maxPrice,
                              @Param("minAge") Integer minAge,
                              @Param("maxAge") Integer maxAge,
                              @Param("search") String search);
}