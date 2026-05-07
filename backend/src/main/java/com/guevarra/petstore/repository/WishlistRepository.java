package com.guevarra.petstore.repository;

import com.guevarra.petstore.entity.User;
import com.guevarra.petstore.entity.Wishlist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface WishlistRepository extends JpaRepository<Wishlist, Long> {

    Optional<Wishlist> findByUser(User user);

    Optional<Wishlist> findByUserId(Long userId);
}