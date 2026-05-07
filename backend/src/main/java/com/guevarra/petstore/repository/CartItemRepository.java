package com.guevarra.petstore.repository;

import com.guevarra.petstore.entity.Cart;
import com.guevarra.petstore.entity.CartItem;
import com.guevarra.petstore.entity.Pet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Long> {

    List<CartItem> findByCart(Cart cart);

    Optional<CartItem> findByCartAndPet(Cart cart, Pet pet);

    void deleteByCart(Cart cart);
}