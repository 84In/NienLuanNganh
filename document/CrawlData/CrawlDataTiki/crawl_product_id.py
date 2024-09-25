import requests
import time
import random
import pandas as pd

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 6.3; Win64; x64; rv:83.0) Gecko/20100101 Firefox/83.0',
    'Accept': 'application/json, text/plain, */*',
    'Accept-Language': 'vi-VN,vi;q=0.8,en-US;q=0.5,en;q=0.3',
    'Referer': 'https://tiki.vn/?src=header_tiki',
    'x-guest-token': 'eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIxMDY5Njc3MCIsImlhdCI6MTcyNzE4NDYyMCwiZXhwIjoxNzI3MjcxMDIwLCJpc3MiOiJodHRwczovL3Rpa2kudm4iLCJjdXN0b21lcl9pZCI6IjEwNjk2NzcwIiwiZW1haWwiOiJwbXNzMDE2OEBnbWFpbC5jb20iLCJjbGllbnRfaWQiOiJ0aWtpLXNzbyIsIm5hbWUiOiIxMDY5Njc3MCIsInNjb3BlIjoic3NvIiwiZ3JhbnRfdHlwZSI6Imdvb2dsZSJ9.I8v9eYpMJuN0hL2_Y265m-cx6hSB0NbQwKnbkFjqvJpmd3ybz3lvXrzyl1Eyddg5GtrxxUPQ-E1TJyfLVxgqObsQLahZozzWeN59YSZUJa4KM0sq-VINVonlrA2QZJSX1knHeO_xFLIYsPQwRM-unXVdgyo-sMGyu5owejRLTFjWJQg-SVTQfNEud-O8p-BBh6CHvw7ZxPCHqlQFzX-YZlES2xme63UzcStVwrdck3_P-5EMfnnzXWklrcKIHhbyDyFJ72zCMUwvUPAhUn5AHg_tVuXhPJuwFk0LXLqEqoUd5wuvikrhTON0DxUNqzWwxQbK0dC_zh4XeKB8YMnCYWAhkkxe3RcKDJWgodXN8Tpr9kAwdWoTeFxPiXcJ8JuIdPnuROBRGNggZY4EkWwJhqEQ62TljgEgzUltMfqqdQSoYOax1WpuDITkq9MTAs-vYiOIhacOY4VepBINQvN_M3ZNNTaRVfBiYkUGN7bp0bv9QTshJM0uwmzjAvH-40VbdDn7metmNd1TaUE60l9rJkQV4LTluqZAOof6x0d0CC4JoYm4bFk_v7U5R_O7caw1j_akn4DgP_q92RRExMvWYABMv0u3hQS_ED7-0SurcrPg4miJf3HkK7W1i-aFJen584NM5FvHHpb2_5OpSDhO8F4f5NykSpxOAizjqomgAi8',
    'Connection': 'keep-alive',
    'TE': 'Trailers',
}

params = {
    'limit': '40',
    'include': 'advertisement',
    'aggregations': '2',
    'version': 'home-personalized',
    'trackity_id': 'c3a7e2ff-df2b-aa2e-2563-923ef49fd2c5',
    'category': '8322',
    'page': '1',
    'urlKey': 'nha-sach-tiki',
}


def fetch_product_ids(pages=5):
    product_ids = []
    for i in range(1, pages + 1):
        params['page'] = i
        try:
            response = requests.get('https://tiki.vn/api/personalish/v1/blocks/listings', headers=headers,
                                    params=params)
            if response.status_code == 200:
                data = response.json().get('data', [])
                for record in data:
                    product_id = record.get('id')
                    if product_id:
                        product_ids.append({'id': product_id})
                print(f"Page {i} data fetched successfully!")
            else:
                print(f"Failed to fetch data for page {i}. Status code: {response.status_code}")
        except Exception as e:
            print(f"An error occurred on page {i}: {str(e)}")

        # Sleep for a random time to avoid potential blocking
        time.sleep(random.uniform(1, 3))

    return product_ids


PREFIX_PATH = 'D:/Workspace/MyProject/NienLuanNganh/document/CrawlData/data_sach'
# Fetch product IDs
product_ids = fetch_product_ids(pages=5)

# Save to CSV
df = pd.DataFrame(product_ids)
df.to_csv(f'{PREFIX_PATH}/product_id_WEBSHOP.csv', index=False)

print("Product IDs saved to 'product_id_WEBSHOP.csv'")
