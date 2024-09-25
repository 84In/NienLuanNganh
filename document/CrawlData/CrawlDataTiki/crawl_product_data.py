import pandas as pd
import requests
import time
import random
from tqdm import tqdm

# Set headers for requests
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 6.3; Win64; x64; rv:83.0) Gecko/20100101 Firefox/83.0',
    'Accept': 'application/json, text/plain, */*',
    'Accept-Language': 'vi-VN,vi;q=0.8,en-US;q=0.5,en;q=0.3',
    'Referer': 'https://tiki.vn/',
    'x-guest-token': 'eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIxMDY5Njc3MCIsImlhdCI6MTcyNzE4NDYyMCwiZXhwIjoxNzI3MjcxMDIwLCJpc3MiOiJodHRwczovL3Rpa2kudm4iLCJjdXN0b21lcl9pZCI6IjEwNjk2NzcwIiwiZW1haWwiOiJwbXNzMDE2OEBnbWFpbC5jb20iLCJjbGllbnRfaWQiOiJ0aWtpLXNzbyIsIm5hbWUiOiIxMDY5Njc3MCIsInNjb3BlIjoic3NvIiwiZ3JhbnRfdHlwZSI6Imdvb2dsZSJ9.I8v9eYpMJuN0hL2_Y265m-cx6hSB0NbQwKnbkFjqvJpmd3ybz3lvXrzyl1Eyddg5GtrxxUPQ-E1TJyfLVxgqObsQLahZozzWeN59YSZUJa4KM0sq-VINVonlrA2QZJSX1knHeO_xFLIYsPQwRM-unXVdgyo-sMGyu5owejRLTFjWJQg-SVTQfNEud-O8p-BBh6CHvw7ZxPCHqlQFzX-YZlES2xme63UzcStVwrdck3_P-5EMfnnzXWklrcKIHhbyDyFJ72zCMUwvUPAhUn5AHg_tVuXhPJuwFk0LXLqEqoUd5wuvikrhTON0DxUNqzWwxQbK0dC_zh4XeKB8YMnCYWAhkkxe3RcKDJWgodXN8Tpr9kAwdWoTeFxPiXcJ8JuIdPnuROBRGNggZY4EkWwJhqEQ62TljgEgzUltMfqqdQSoYOax1WpuDITkq9MTAs-vYiOIhacOY4VepBINQvN_M3ZNNTaRVfBiYkUGN7bp0bv9QTshJM0uwmzjAvH-40VbdDn7metmNd1TaUE60l9rJkQV4LTluqZAOof6x0d0CC4JoYm4bFk_v7U5R_O7caw1j_akn4DgP_q92RRExMvWYABMv0u3hQS_ED7-0SurcrPg4miJf3HkK7W1i-aFJen584NM5FvHHpb2_5OpSDhO8F4f5NykSpxOAizjqomgAi8',
    # Make sure to replace with your valid guest token
    'Connection': 'keep-alive',
    'TE': 'Trailers',
}

params = (
    ('platform', 'web'),
    ('version', '3'),
)


# Function to parse product data from JSON
def parser_product(json):
    d = dict()
    d['id'] = json.get('id')
    d['product_name'] = json.get('name')
    d['description'] = json.get('short_description')
    d['price'] = json.get('price')
    d['original_price'] = json.get('original_price')
    d['price_usd'] = json.get('price_usd')
    d['discount'] = json.get('discount')
    d['discount_rate'] = json.get('discount_rate')
    d['review_count'] = json.get('review_count')
    d['stock_item_qty'] = json.get('stock_item', {}).get('qty', 0)  # Handle missing stock_item
    d['brand_id'] = json.get('brand', {}).get('id', None)  # Handle missing brand
    d['brand_name'] = json.get('brand', {}).get('name', None)
    d['url_key'] = json.get('url_key')
    images = json.get('images', [])
    d['images'] = [image.get('base_url') for image in images if image.get('base_url')]
    return d


# Retry fetching the product in case of failures
def fetch_product_data(product_id, retries=3):
    attempt = 0
    while attempt < retries:
        try:
            response = requests.get(f'https://tiki.vn/api/v2/products/{product_id}', headers=headers, params=params)
            if response.status_code == 200:
                return response.json()
            else:
                print(f"Failed to fetch product {product_id} - Status code: {response.status_code}")
        except Exception as e:
            print(f"Error fetching product {product_id}: {e}")

        attempt += 1
        print(f"Retrying product {product_id} (Attempt {attempt}/{retries})")
        time.sleep(random.uniform(1, 3))  # Wait a bit before retrying
    return None


PREFIX_PATH = 'D:/Workspace/MyProject/NienLuanNganh/document/CrawlData/data_tuixachnu'
# Read product IDs from CSV file
df_id = pd.read_csv(f'{PREFIX_PATH}/product_id_WEBSHOP.csv')
p_ids = df_id.id.to_list()

# Store fetched products
result = []

# Loop through product IDs and fetch data
for pid in tqdm(p_ids, total=len(p_ids)):
    product_data = fetch_product_data(pid)
    if product_data:
        print(f"Crawl data {pid} success !!!")
        result.append(parser_product(product_data))
    else:
        print(f"Failed to fetch data for product {pid} after multiple attempts.")

# Convert the result list to a DataFrame and save to CSV
df_product = pd.DataFrame(result)
df_product.to_csv(f'{PREFIX_PATH}/crawled_data_WEBSHOP.csv', index=False)

print("Data fetching completed.")
