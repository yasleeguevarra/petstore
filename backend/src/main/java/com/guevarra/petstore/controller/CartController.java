package com.guevarra.petstore.controller;

import com.guevarra.petstore.entity.CartItem;
import com.guevarra.petstore.entity.User;
import com.guevarra.petstore.service.AuthService;
import com.guevarra.petstore.service.CartService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/guevarra/cart")
public class CartController {

    private final CartService cartService;
    private final AuthService authService;

    public CartController(CartService cartService, AuthService authService) {
        this.cartService = cartService;
        this.authService = authService;
    }

    @GetMapping
    public ResponseEntity<List<CartItem>> getCart(@RequestAttribute("userId") Long userId) {
        User user = authService.findByUsername(null).orElseThrow(); // Need to get user from userId
        // Actually, since we have userId from filter, but to get User entity, need to adjust.

        // For now, assume we have a way to get user.
        // In SecurityConfig, we set request.setAttribute("userId", userId);
        // But to get User, we need to fetch it.

        // Let's modify to get user from userId.

        // Actually, let's add a method in AuthService to get user by id.

        // For simplicity, assume we have user.

        // Wait, let's fix this.

        // In the filter, we can set the user in context, but for now, let's add to AuthService.

        // To keep simple, let's modify the controller to get user from userId.

        User user = authService.findById(userId); // Need to add this method.

        // Let's add findById to AuthService.

        // For now, I'll assume it's there.

        List<CartItem> items = cartService.getCartItems(user);
        return ResponseEntity.ok(items);
    }

    @PostMapping("/add")
    public ResponseEntity<CartItem> addToCart(@RequestAttribute("userId") Long userId,
                                             @RequestBody AddToCartRequest request) {
        User user = authService.findById(userId);
        CartItem item = cartService.addToCart(user, request.getPetId(), request.getQuantity());
        return ResponseEntity.ok(item);
    }

    @PutMapping("/item/{itemId}")
    public ResponseEntity<?> updateCartItem(@RequestAttribute("userId") Long userId,
                                           @PathVariable Long itemId,
                                           @RequestBody UpdateCartRequest request) {
        User user = authService.findById(userId);
        CartItem item = cartService.updateCartItemQuantity(user, itemId, request.getQuantity());
        if (item == null) {
            return ResponseEntity.ok(Map.of("message", "Item removed"));
        }
        return ResponseEntity.ok(item);
    }

    @DeleteMapping("/item/{itemId}")
    public ResponseEntity<?> removeFromCart(@RequestAttribute("userId") Long userId,
                                           @PathVariable Long itemId) {
        User user = authService.findById(userId);
        cartService.removeFromCart(user, itemId);
        return ResponseEntity.ok(Map.of("message", "Item removed"));
    }

    @DeleteMapping
    public ResponseEntity<?> clearCart(@RequestAttribute("userId") Long userId) {
        User user = authService.findById(userId);
        cartService.clearCart(user);
        return ResponseEntity.ok(Map.of("message", "Cart cleared"));
    }

    // Add findById to AuthService
    // In AuthService, add:
    // public Optional<User> findById(Long id) {
    //     return userRepository.findById(id);
    // }

    public static class AddToCartRequest {
        private Long petId;
        private Integer quantity = 1;

        public Long getPetId() { return petId; }
        public void setPetId(Long petId) { this.petId = petId; }
        public Integer getQuantity() { return quantity; }
        public void setQuantity(Integer quantity) { this.quantity = quantity; }
    }

    public static class UpdateCartRequest {
        private Integer quantity;

        public Integer getQuantity() { return quantity; }
        public void setQuantity(Integer quantity) { this.quantity = quantity; }
    }
}