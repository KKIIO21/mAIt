import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from bs4 import BeautifulSoup
from urllib.parse import urljoin, urlparse
import json

# 크롤링 함수 정의
def crawl_naver_news():
    # Chrome WebDriver 설정
    chrome_options = webdriver.ChromeOptions()
    chrome_options.add_argument("--headless")
    chrome_options.add_argument("--disable-gpu")
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--disable-dev-shm-usage")

    driver = webdriver.Chrome(options=chrome_options)

    # 섹션에 따른 파일명 매핑
    section_names = {
        100: 'poli',
        101: 'econo',
        102: 'soci',
        103: 'cul'
    }

    for section in range(100, 104):
        base_url = f"https://news.naver.com/main/main.naver?mode=LSD&mid=shm&sid1={section}#&date=%2000:00:00&page="
        articles = []

        for page in range(1, 10):
            url = base_url + str(page)
            driver.get(url)
            html = driver.page_source
            soup = BeautifulSoup(html, 'html.parser')

            section_article_list = soup.find('ul', class_='sa_list')
            if not section_article_list:
                print(f"Section {section}, page {page}: section_article_list를 찾을 수 없습니다.")
                continue

            links = [urljoin(url, link.get('href')) for link in section_article_list.find_all('a', class_='sa_text_title', href=True)]
            links = list(set(links))
            print(f"Section {section}, page {page}: 추출된 링크 수 (중복 제거 후): {len(links)}")

            for link in links:
                try:
                    print(f"기사 링크: {link}")
                    driver.get(link)
                    html = driver.page_source
                    article_soup = BeautifulSoup(html, 'html.parser')

                    title_tag = article_soup.select_one('div.media_end_head_title h2')
                    title = title_tag.get_text(strip=True) if title_tag else "제목을 찾을 수 없음"

                    articles.append({'title': title, 'link': link})

                except Exception as e:
                    print(f"링크 열기 실패: {link}, 오류: {e}")

        # 섹션에 해당하는 파일명으로 저장
        file_name = section_names.get(section, f'section_{section}')  # 기본 파일명은 section_{section}
        with open(f'{file_name}.json', 'w', encoding='utf-8') as file:
            json.dump(articles, file, ensure_ascii=False, indent=2)

        print(f"Section {section}: Total articles saved: {len(articles)}\n")

    driver.quit()

# 주기적으로 실행
while True:
    try:
        crawl_naver_news()
    except Exception as e:
        print(f"크롤링 중 오류 발생: {e}")

    print("10분 대기 중...")
    time.sleep(600)  # 600초 (10분) 대기
