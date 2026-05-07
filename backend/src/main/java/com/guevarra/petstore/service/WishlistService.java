package com.guevarra.petstore.service;

import com.guevarra.petstore.entity.Pet;
import com.guevarra.petstore.entity.User;
import com.guevarra.petstore.entity.Wishlist;
import com.guevarra.petstore.entity.WishlistItem;
import com.guevarra.petstore.repository.PetRepository;
import com.guevarra.petstore.repository.WishlistItemRepository;
import com.guevarra.petstore.repository.WishlistRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class WishlistService {

    private final WishlistRepository wishlistRepository;
    private final WishlistItemRepository wishlistItemRepository;
    private final PetRepository petRepository;

    public WishlistService(WishlistRepository wishlistRepository, WishlistItemRepository wishlistItemRepository, PetRepository petRepository) {
        this.wishlistRepository = wishlistRepository;
        this.wishlistItemRepository = wishlistItemRepository;
        this.petRepository = petRepository;
    }

    public Wishlist getOrCreateWishlist(User user) {
        return wishlistRepository.findByUser(user).orElseGet(() -> {
            Wishlist wishlist = new Wishlist(user);
            return wishlistRepository.save(wishlist);
        });
    }

    public Wishlist getWishlistByUserId(Long userId) {
        return wishlistRepository.findByUserId(userId).orElse(null);
    }

    public WishlistItem addToWishlist(User user, Long petId) {
        Pet pet = petRepository.findById(petId)
                .orElseThrow(() -> new RuntimeException("Pet not found"));

        Wishlist wishlist = getOrCreateWishlist(user);

        Optional<WishlistItem> existingItem = wishlistItemRepository.findByWishlistAndPet(wishlist, pet);
        if (existingItem.isPresent()) {
            return existingItem.get(); // Already in wishlist
        } else {
            WishlistItem newItem = new WishlistItem(wishlist, pet);
            return wishlistItemRepository.save(newItem);
        }
    }

    public void removeFromWishlist(User user, Long itemId) {
        WishlistItem item = wishlistItemRepository.findById(itemId)
                .orElseThrow(() -> new RuntimeException("Wishlist item not found"));

        if (!item.getWishlist().getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized");
        }

        wishlistItemRepository.delete(item);
    }

    public void clearWishlist(User user) {
        Wishlist wishlist = getOrCreateWishlist(user);
        wishlistItemRepository.deleteByWishlist(wishlist);
    }

    public List<WishlistItem> getWishlistItems(User user) {
        Wishlist wishlist = getOrCreateWishlist(user);
        return wishlistItemRepository.findByWishlist(wishlist);
    }
}