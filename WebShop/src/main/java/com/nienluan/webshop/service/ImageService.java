package com.nienluan.webshop.service;

import com.nienluan.webshop.dto.request.ImageRequest;
import com.nienluan.webshop.dto.request.ImageUpdateRequest;
import com.nienluan.webshop.dto.response.ImageResponse;
import com.nienluan.webshop.entity.Image;
import com.nienluan.webshop.mapper.ImageMapper;
import com.nienluan.webshop.repository.ImageRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ImageService {

    ImageRepository imageRepository;

    ImageMapper imageMapper;


    public ImageResponse createImage(ImageRequest imageRequest) {
        return imageMapper.toImageResponse(imageRepository.save(imageMapper.toImage(imageRequest)));
    }

    public List<ImageResponse> createImages(List<ImageRequest> imageRequests) {
        List<Image> images = imageRequests.stream().map(imageMapper::toImage).toList();
        return images.stream().map(imageMapper::toImageResponse).collect(Collectors.toList());
    }

    public Page<ImageResponse> getAllImages(Pageable pageable) {
        return imageRepository.findAll(pageable).map(imageMapper::toImageResponse);
    }

    public ImageResponse getImage(String id) {
        return imageMapper.toImageResponse(imageRepository.findById(id).orElseThrow(()->new RuntimeException("Image not found")));
    }

    public List<ImageResponse> getImageByCategory(String categoryId) {
        var images = imageRepository.findByCategoryId(categoryId);
        return images.stream().map(imageMapper::toImageResponse).collect(Collectors.toList());
    }

    public List<ImageResponse> getImagesByProduct(String productId) {
        var images = imageRepository.findByProductId(productId);
        return images.stream().map(imageMapper::toImageResponse).collect(Collectors.toList());
    }

    public ImageResponse updateImage(String id, ImageUpdateRequest request) {
        Image image = imageRepository.findById(id).orElseThrow(()->new RuntimeException("Image not found"));
        imageMapper.updateImage(image,request);
        return imageMapper.toImageResponse(image);
    }

    public void deleteImage(String id) {
        imageRepository.deleteById(id);
    }

}
