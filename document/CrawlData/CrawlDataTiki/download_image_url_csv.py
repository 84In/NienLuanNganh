import os
import re
import requests
import shutil
import pandas as pd


# Function to sanitize the product name for use in file/folder names
def sanitize_filename(name):
    # Remove or replace any invalid characters for Windows file/folder names
    return re.sub(r'[<>:"/\\|?*]', '_', name)


# Function to sanitize the image URL
def sanitize_url(url):
    # Remove leading/trailing quotes, brackets, and spaces
    return url.strip().strip("[]'\"")


# Function to download images and save them in the respective product folder
def download_images(product_name, image_urls, product_index, total_products):
    # Sanitize the product name for folder creation
    product_name = sanitize_filename(product_name)

    product_folder = os.path.join(base_dir, product_name)

    # Create a folder for each product if it doesn't exist
    if not os.path.exists(product_folder):
        os.makedirs(product_folder)

    # Limit the images to 4 maximum
    image_urls = image_urls[:4]  # Slice to the first 4 images
    total_images = len(image_urls)  # Total number of images for the product (up to 4)

    # Download each image
    for index, image_url in enumerate(image_urls):
        image_url = sanitize_url(image_url)  # Sanitize the image URL
        image_name = f"image_{index + 1}.jpg"  # Name the image as image_1.jpg, image_2.jpg, etc.
        image_path = os.path.join(product_folder, image_name)

        try:
            # Send a GET request to the image URL
            response = requests.get(image_url, stream=True)
            if response.status_code == 200:
                with open(image_path, 'wb') as out_file:
                    shutil.copyfileobj(response.raw, out_file)
                print(f"Product {product_index + 1}/{total_products} | Image {index + 1}/{total_images} downloaded: {image_path}")
            else:
                print(f"Product {product_index + 1}/{total_products} | Failed to download {image_url} (status code: {response.status_code})")
        except Exception as e:
            print(f"Product {product_index + 1}/{total_products} | Error downloading {image_url}: {e}")


# Base directory to save all product images
base_dir = "D:/Workspace/MyProject/NienLuanNganh/document/CrawlData/BaloImages"

# Create base directory if not exists
if not os.path.exists(base_dir):
    os.makedirs(base_dir)

# Read the CSV file (modify the file path accordingly)
csv_file = 'D:/Workspace/MyProject/NienLuanNganh/document/CrawlData/data_balo/crawled_data_WEBSHOP.csv'
df = pd.read_csv(csv_file)

total_products = len(df)  # Total number of products

# Assuming 'product_name' is the product name and 'images' is the comma-separated URLs field
for product_index, row in df.iterrows():
    product_name = row['product_name']
    image_urls = row['images'].split(',')  # Split the image URLs by comma

    print(f"Downloading images for product {product_index + 1}/{total_products}: {product_name}")

    # Download the images for this product (limit to 4 images)
    download_images(product_name, image_urls, product_index, total_products)

print("Download process completed.")
