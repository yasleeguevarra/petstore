package com.guevarra.petstore.repository;

import com.guevarra.petstore.entity.Pet;
import com.guevarra.petstore.entity.Wishlist;
import com.guevarra.petstore.entity.WishlistItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface WishlistItemRepository extends JpaRepository<WishlistItem, Long> {

    List<WishlistItem> findByWishlist(Wishlist wishlist);

    Optional<WishlistItem> findByWishlistAndPet(Wishlist wishlist, Pet pet);

    void deleteByWishlist(Wishlist wishlist);
}