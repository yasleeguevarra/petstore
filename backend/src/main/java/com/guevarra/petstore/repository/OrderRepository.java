package com.guevarra.petstore.repository;

import com.guevarra.petstore.entity.Order;
import com.guevarra.petstore.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

    List<Order> findByUserOrderByCreatedAtDesc(User user);

    Order findByOrderNumber(String orderNumber);
}