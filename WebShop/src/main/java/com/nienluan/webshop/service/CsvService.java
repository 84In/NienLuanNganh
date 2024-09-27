package com.nienluan.webshop.service;

import com.nienluan.webshop.dto.ProductCsvDTO;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;
import org.apache.commons.csv.CSVFormat;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CsvService {

    public List<ProductCsvDTO> parseCsvFile(MultipartFile file) throws IOException {
        List<ProductCsvDTO> productList = new ArrayList<>();
        try (BufferedReader fileReader = new BufferedReader(new InputStreamReader(file.getInputStream()));
             CSVParser csvParser = new CSVParser(fileReader, CSVFormat.DEFAULT.withHeader().withIgnoreHeaderCase().withTrim())) {

            Iterable<CSVRecord> csvRecords = csvParser.getRecords();

            for (CSVRecord record : csvRecords) {
                ProductCsvDTO product = ProductCsvDTO.builder()
                        .name(record.get("product_name"))
                        .description(record.get("description"))
                        .price(new BigDecimal(record.get("price")))
                        .stock_quantity(new BigDecimal(record.get("stock_item_qty")))
                        .images(record.get("images"))
                        .brandName(record.get("brand_name"))
                        .build();
                productList.add(product);
            }
        }
        return productList;
    }
}
