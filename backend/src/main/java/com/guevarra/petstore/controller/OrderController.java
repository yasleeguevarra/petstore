package com.guevarra.petstore.controller;

import com.guevarra.petstore.entity.Order;
import com.guevarra.petstore.entity.User;
import com.guevarra.petstore.service.AuthService;
import com.guevarra.petstore.service.OrderService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/guevarra/orders")
public class OrderController {

    private final OrderService orderService;
    private final AuthService authService;

    public OrderController(OrderService orderService, AuthService authService) {
        this.orderService = orderService;
        this.authService = authService;
    }

    @PostMapping
    public ResponseEntity<Order> createOrder(@RequestAttribute("userId") Long userId) {
        User user = authService.findById(userId);
        Order order = orderService.createOrderFromCart(user);
        return ResponseEntity.ok(order);
    }

    @GetMapping
    public ResponseEntity<List<Order>> getUserOrders(@RequestAttribute("userId") Long userId) {
        User user = authService.findById(userId);
        List<Order> orders = orderService.getUserOrders(user);
        return ResponseEntity.ok(orders);
    }

    @GetMapping("/{orderId}")
    public ResponseEntity<Order> getOrder(@PathVariable Long orderId, @RequestAttribute("userId") Long userId) {
        User user = authService.findById(userId);
        Order order = orderService.getOrderById(orderId, user);
        return ResponseEntity.ok(order);
    }
}