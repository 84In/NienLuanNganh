import re
import requests
import pandas as pd
import base64
import mimetypes
import os

PREFIX_PATH = 'D:/Workspace/MyProject/NienLuanNganh/document/CrawlData'
# List of folder names
folders = ['data_sach', 'data_tuixachnu']


# Function to sanitize the image URL (removing unnecessary characters)
def sanitize_url(url):
    return url.strip().strip("[]'\"")


# Function to fetch images from the URL, convert to base64, and get the image type
def fetch_images_as_base64_with_type(image_urls, product_name, product_index, total_products):
    image_urls = image_urls[:4]  # Limit to the first 4 images
    base64_images_with_type = []

    for index, image_url in enumerate(image_urls):
        image_url = sanitize_url(image_url)  # Clean the image URL

        try:
            # Fetch the image data from the URL
            response = requests.get(image_url, stream=True)
            if response.status_code == 200:
                # Guess the image's content type (e.g., image/jpeg)
                content_type = response.headers.get('Content-Type')
                if content_type:
                    # Extract the file extension based on the content type (e.g., 'jpeg' from 'image/jpeg')
                    image_extension = mimetypes.guess_extension(content_type).replace('.', '')
                else:
                    image_extension = 'unknown'

                # Convert image content to base64
                image_base64 = base64.b64encode(response.content).decode('utf-8')

                # Create an object with base64 and type
                base64_images_with_type.append({
                    "base64": image_base64,
                    "type": image_extension
                })

                # Log progress for each image
                print(
                    f"Product {product_index + 1}/{total_products}: {product_name} - Image {index + 1}/{len(image_urls)} processed.")
            else:
                print(f"Failed to fetch {image_url} (status code: {response.status_code})")
        except Exception as e:
            print(f"Error fetching {image_url}: {e}")

    return base64_images_with_type


# Function to process each folder and convert images to base64
def process_folder(folder_name):
    print(f"\nProcessing folder: {folder_name}")

    csv_file = f'{PREFIX_PATH}/{folder_name}/crawled_data_WEBSHOP.csv'

    if not os.path.exists(csv_file):
        print(f"CSV file not found for {folder_name}, skipping...")
        return

    # Read the CSV file
    df = pd.read_csv(csv_file)

    # Assuming 'product_name' is the product name and 'images' is the comma-separated URLs field
    base64_columns = []  # To store base64 strings and types for each product

    total_products = len(df)  # Get the total number of products for progress tracking

    # Loop through each product in the DataFrame
    for product_index, row in df.iterrows():
        product_name = row['product_name']
        image_urls = row['images'].split(',')  # Split the image URLs by comma

        print(f"Processing product {product_index + 1}/{total_products}: {product_name}")

        # Fetch and convert the images to base64 with their type (without saving to disk)
        base64_images_with_type = fetch_images_as_base64_with_type(image_urls, product_name, product_index,
                                                                   total_products)

        # Convert the list of image objects to a string representation that can be stored in CSV
        base64_string_with_type = str(base64_images_with_type)

        # Append the base64 string with types for this product to the list
        base64_columns.append(base64_string_with_type)

    # Add the base64 image data with type as a new column in the DataFrame
    df['base64_images'] = base64_columns

    # Save the updated DataFrame to a new CSV file with the base64 image strings
    output_csv_file = f'{PREFIX_PATH}/{folder_name}/data_base64_WEBSHOP.csv'
    df.to_csv(output_csv_file, index=False)

    print(f"Process completed for folder '{folder_name}'. Data saved to {output_csv_file}")


# Loop through each folder and process its respective CSV file
for folder in folders:
    process_folder(folder)

print("\nAll folders processed.")
