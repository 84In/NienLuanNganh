package com.nienluan.webshop.utils;

import org.springframework.context.annotation.Bean;

import java.util.List;

public class CommentFilter {
    @Bean
    public static boolean isCommentValid(String comment) {
        List<String> spamKeywords = SpamKeywords.getSpamKeywords();
        String lowerCaseComment = comment.toLowerCase();

        for (String keyword : spamKeywords) {
            if (lowerCaseComment.contains(keyword)) {
                return false;
            }
        }
        return true;
    }
}
