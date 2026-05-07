package com.guevarra.petstore.controller;

import com.guevarra.petstore.entity.User;
import com.guevarra.petstore.entity.WishlistItem;
import com.guevarra.petstore.service.AuthService;
import com.guevarra.petstore.service.WishlistService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/guevarra/wishlist")
public class WishlistController {

    private final WishlistService wishlistService;
    private final AuthService authService;

    public WishlistController(WishlistService wishlistService, AuthService authService) {
        this.wishlistService = wishlistService;
        this.authService = authService;
    }

    @GetMapping
    public ResponseEntity<List<WishlistItem>> getWishlist(@RequestAttribute("userId") Long userId) {
        User user = authService.findById(userId);
        List<WishlistItem> items = wishlistService.getWishlistItems(user);
        return ResponseEntity.ok(items);
    }

    @PostMapping("/add")
    public ResponseEntity<WishlistItem> addToWishlist(@RequestAttribute("userId") Long userId,
                                                     @RequestBody AddToWishlistRequest request) {
        User user = authService.findById(userId);
        WishlistItem item = wishlistService.addToWishlist(user, request.getPetId());
        return ResponseEntity.ok(item);
    }

    @DeleteMapping("/item/{itemId}")
    public ResponseEntity<?> removeFromWishlist(@RequestAttribute("userId") Long userId,
                                               @PathVariable Long itemId) {
        User user = authService.findById(userId);
        wishlistService.removeFromWishlist(user, itemId);
        return ResponseEntity.ok(Map.of("message", "Item removed from wishlist"));
    }

    @DeleteMapping
    public ResponseEntity<?> clearWishlist(@RequestAttribute("userId") Long userId) {
        User user = authService.findById(userId);
        wishlistService.clearWishlist(user);
        return ResponseEntity.ok(Map.of("message", "Wishlist cleared"));
    }

    public static class AddToWishlistRequest {
        private Long petId;

        public Long getPetId() { return petId; }
        public void setPetId(Long petId) { this.petId = petId; }
    }
}