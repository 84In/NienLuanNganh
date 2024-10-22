package com.nienluan.webshop.service;

import com.nienluan.webshop.entity.Order;
import com.nienluan.webshop.repository.OrderRepository;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;


@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class MailService {

    JavaMailSender mailSender;
    TemplateEngine templateEngine;
    OrderRepository orderRepository;

    public void sendOrderConfirmationEmail(String toEmail, Order order) {

        // Prepare the context for Thymeleaf template
        Context context = new Context();
        context.setVariable("recipient", order.getRecipient());
        String formattedDate = order.getCreatedAt() != null
                ? order.getCreatedAt().format(DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss"))
                : LocalDateTime.now().format(DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss"));
        context.setVariable("createdAt", formattedDate);
        context.setVariable("orderId", order.getId());
        context.setVariable("orderDetails", order.getOrderDetails());
        context.setVariable("totalPrice", order.getTotalAmount());
        
        // Process Thymeleaf template into a String
        String htmlContent = templateEngine.process("order-confirmation", context);

        // Build the email
        MimeMessage message = mailSender.createMimeMessage();

        try {
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            helper.setTo(toEmail);
            helper.setSubject("Order Confirmation #" + order.getId());
            helper.setText(htmlContent, true);
            mailSender.send(message);
        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }
}

