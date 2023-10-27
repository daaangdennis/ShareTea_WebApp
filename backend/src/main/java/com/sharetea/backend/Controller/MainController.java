package com.sharetea.backend.Controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.sharetea.backend.Entities.*;
import com.sharetea.backend.Services.*;

@CrossOrigin(origins = "*")
@RestController
public class MainController {
    @Autowired
    private Services service;
    
    @GetMapping("/customer/get")
    public Iterable<Customer> getCustomers() {
        return service.getAllCustomers();
    }
    @PostMapping("/customer/add")
    public Customer addCustomer(@RequestBody Customer customer) {
        return service.addCustomer(customer);
    }


    @GetMapping("/employee/get")
    public Iterable<Employee> getEmployees() {
        return service.getAllEmployees();
    }
    @PostMapping("/employee/add")
    public Employee addEmployee(@RequestBody Employee employee) {
        return service.addEmployee(employee);
    }


    @GetMapping("/orders/get")
    public Iterable<Orders> getOrders() {
        return service.getAllOrders();
    }
    @PostMapping("/orders/add")
    public Orders addOrder(@RequestBody Orders order) {
        return service.addOrder(order);
    }


    @GetMapping("/product/get")
    public List<String> getProducts() {
        return service.getAllProducts();
        
    }
    @GetMapping("/product/getbycategory")
    public List<Map<String, Object>> getProductsByCategory() {
        return service.getProductsbyCategory();  
    }
    @GetMapping("/product/getbestselling")
    public List<List<Object>> getBestSelling() {
        return service.getBestSelling();  
    }

    @PostMapping("/product/update/{productID}")
    public Product updateProduct(@PathVariable Integer productID, @RequestBody Product productUpdate) {
        return service.updateProduct(productID, productUpdate);
    }


    @GetMapping("/inventory/get")
    public Iterable<Inventory> getInventory() {
        return service.getAllInventory();
    }
    @PostMapping("/inventory/update/{inventoryID}")
    public Inventory updateInventory(@PathVariable Integer inventoryID, @RequestBody Inventory inventoryUpdate) {
        return service.updateInventory(inventoryID, inventoryUpdate);
    }


}