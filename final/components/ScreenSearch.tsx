"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { IosStatusBar } from "@/components/IosStatusBar";
import { SystemIcon } from "@/components/SystemIcon";
import { trackEvent } from "@/lib/analytics";
import { hospitalList } from "@/lib/hospital-list-data";

const initialRecentSearches = ["다이어트", "탈모", "감기"];
const recommendedSearches = ["마운자로", "위고비", "비염", "여드름", "피부과", "여성질환"];
const popularCategories = [
  "다이어트",
  "탈모",
  "여드름",
  "피부",
  "비염",
  "감기",
  "여성질환",
  "남성질환",
];

const hospitalTags: Record<string, string[]> = {
  "asan-immune-plus": ["다이어트", "마운자로", "피부", "감기"],
  "suwon-the-cell": ["다이어트", "위고비", "여드름", "탈모"],
  "hangaon-oriental": ["비염", "감기", "여성질환", "피부"],
  "gangnam-bareun": ["탈모", "피부", "남성질환", "여드름"],
  "seoul-slim": ["다이어트", "마운자로", "위고비", "여성질환"],
};

const keywordAnalyticsNames: Record<string, string> = {
  "다이어트": "diet",
  "마운자로": "mounjaro",
  "위고비": "wegovy",
  "탈모": "hair_loss",
  "감기": "cold_rhinitis",
  "비염": "cold_rhinitis",
  "소아과": "pediatrics",
  "약국": "pharmacy",
};

function getKeywordAnalyticsName(keyword: string) {
  return keywordAnalyticsNames[keyword];
}

function BackIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6" fill="none">
      <path
        d="m15 18-6-6 6-6"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-3 w-3" fill="none">
      <path
        d="m7 7 10 10M17 7 7 17"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2"
      />
    </svg>
  );
}

function Chip({
  label,
  keywordType,
  onClick,
  onDelete,
}: {
  label: string;
  keywordType: "popular" | "recent";
  onClick: () => void;
  onDelete?: () => void;
}) {
  return (
    <div className="flex h-9 items-center rounded-[18px] border border-[#e5e7eb] bg-white text-[13px] font-semibold leading-[18px] text-[#21242c]">
      <button
        type="button"
        data-gtm-id={keywordType === "popular" ? "search-popular-keyword" : "search-recent-keyword"}
        aria-label={`${label} 검색어 선택`}
        onClick={onClick}
        className={`h-full ${onDelete ? "pl-4 pr-2" : "px-4"}`}
      >
        {label}
      </button>
      {onDelete ? (
      <button
          type="button"
          aria-label={`${label} 삭제`}
          onClick={onDelete}
          className="mr-3 grid h-4 w-4 place-items-center rounded-full bg-[#eef2f7] text-[#6b7280]"
        >
          <CloseIcon />
        </button>
      ) : null}
    </div>
  );
}

function SearchResultCard({
  item,
  onSelect,
}: {
  item: (typeof hospitalList)[number];
  onSelect: () => void;
}) {
  const tags = hospitalTags[item.id] ?? [];

  return (
    <button
      type="button"
      data-gtm-id="search-result-item"
      aria-label={`${item.name} 검색 결과 보기`}
      onClick={onSelect}
      className="w-full rounded-[14px] border border-[#e5e7eb] bg-white p-4 text-left shadow-soft"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-[16px] font-bold leading-[22px] text-[#111827]">
            {item.name}
          </h3>
          <p className="mt-[6px] text-[12px] font-medium leading-[18px] text-[#6b7280]">
            {tags.slice(0, 3).join(" · ")}
          </p>
        </div>
        <strong className="shrink-0 text-[16px] font-bold leading-[22px] text-[#1268ff]">
          {item.price}
        </strong>
      </div>
      <div className="mt-3 flex items-center gap-2 text-[12px] font-medium leading-[18px] text-[#6b7280]">
        <span>{item.distance.split(" · ")[0].replace(/[()]/g, "")}</span>
        <span className="h-1 w-1 rounded-full bg-[#d1d5db]" />
        <span>{item.distance.split(" · ")[1] ?? item.distance}</span>
        <span className="h-1 w-1 rounded-full bg-[#d1d5db]" />
        <span>{item.wait}</span>
      </div>
    </button>
  );
}

export function ScreenSearch() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState(initialRecentSearches);

  const results = useMemo(() => {
    const keyword = submittedQuery.trim().toLowerCase();

    if (!keyword) {
      return [];
    }

    return hospitalList.filter((item) => {
      const tags = hospitalTags[item.id] ?? [];
      const searchableText = [item.name, item.price, item.distance, item.wait, ...tags]
        .join(" ")
        .toLowerCase();

      return searchableText.includes(keyword);
    });
  }, [submittedQuery]);
  const getResultCount = (value: string) => {
    const keyword = value.trim().toLowerCase();

    if (!keyword) {
      return 0;
    }

    return hospitalList.filter((item) => {
      const tags = hospitalTags[item.id] ?? [];
      const searchableText = [item.name, item.price, item.distance, item.wait, ...tags]
        .join(" ")
        .toLowerCase();

      return searchableText.includes(keyword);
    }).length;
  };

  const submitSearch = (value: string) => {
    const keyword = value.trim();

    if (!keyword) {
      setSubmittedQuery("");
      return;
    }

    setQuery(keyword);
    setSubmittedQuery(keyword);
    setRecentSearches((items) => [keyword, ...items.filter((item) => item !== keyword)].slice(0, 5));
  };

  const isBeforeSearch = submittedQuery.length === 0;
  const hasResults = submittedQuery.length > 0 && results.length > 0;
  const isEmpty = submittedQuery.length > 0 && results.length === 0;

  useEffect(() => {
    trackEvent("search_view", {
      page_name: "search",
      entry_point: "home_search_bar",
    });
  }, []);

  return (
    <main className="mx-auto min-h-screen w-full max-w-[393px] bg-appBg text-[#111827]">
      <IosStatusBar />
      <header className="sticky top-0 z-10 bg-white">
        <div className="flex h-14 items-center gap-2 px-4">
          <button
            type="button"
            aria-label="홈으로 돌아가기"
            data-gtm-id="search-back-button"
            onClick={() => {
              trackEvent("back_click", {
                screen_name: "search",
                destination: "home",
              });
              router.push("/");
            }}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-[20px] text-[#111827]"
          >
            <BackIcon />
          </button>
          <form
            className="flex h-10 flex-1 items-center rounded-[14px] bg-[#f3f4f7] px-3"
            onSubmit={(event) => {
              event.preventDefault();
              trackEvent("search_click", {
                screen_name: "search",
                action: "submit",
                keyword_length: query.trim().length,
                result_count: getResultCount(query),
              });
              submitSearch(query);
            }}
          >
            <SystemIcon
              name="search"
              className="mr-2 h-5 w-5 shrink-0 text-[#6b7280]"
              strokeWidth={2}
            />
            <input
              value={query}
              data-gtm-id="search-input"
              onClick={() =>
                trackEvent("search_click", {
                  screen_name: "search",
                  action: "input_click",
                })
              }
              onChange={(event) => {
                const nextQuery = event.target.value;

                setQuery(nextQuery);
                trackEvent("search_input", {
                  page_name: "search",
                  keyword_length: nextQuery.length,
                  result_count: getResultCount(nextQuery),
                });
              }}
              placeholder="병원, 진료, 약, 증상을 검색해보세요"
              className="w-full bg-transparent text-[14px] font-medium leading-5 text-[#111827] outline-none placeholder:text-[#9ca3af]"
              aria-label="검색어 입력창"
            />
          </form>
        </div>
      </header>

      <div className="px-5 pb-10 pt-5">
        {isBeforeSearch ? (
          <>
            <section>
              <div className="flex h-8 items-center justify-between">
                <h2 className="text-[17px] font-bold leading-6">최근 검색어</h2>
                <button
                  type="button"
                  onClick={() => setRecentSearches([])}
                  className="text-[12px] font-semibold leading-4 text-[#6b7280]"
                >
                  전체 삭제
                </button>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {recentSearches.length > 0 ? (
                  recentSearches.map((item) => (
                    <Chip
                      key={item}
                      label={item}
                      keywordType="recent"
                      onClick={() => {
                        trackEvent("search_click", {
                          screen_name: "search",
                          action: "keyword_chip_click",
                          keyword_type: "recent",
                          keyword_name: getKeywordAnalyticsName(item),
                        });
                        submitSearch(item);
                      }}
                      onDelete={() =>
                        setRecentSearches((items) => items.filter((recent) => recent !== item))
                      }
                    />
                  ))
                ) : (
                  <p className="text-[13px] font-medium leading-5 text-[#9ca3af]">
                    최근 검색어가 없어요
                  </p>
                )}
              </div>
            </section>

            <section className="mt-8">
              <h2 className="text-[17px] font-bold leading-6">추천 검색어</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {recommendedSearches.map((item) => (
                  <Chip
                    key={item}
                    label={item}
                    keywordType="popular"
                    onClick={() => {
                      trackEvent("search_click", {
                        screen_name: "search",
                        action: "keyword_chip_click",
                        keyword_type: "popular",
                        keyword_name: getKeywordAnalyticsName(item),
                      });
                      submitSearch(item);
                    }}
                  />
                ))}
              </div>
            </section>

            <section className="mt-8">
              <h2 className="text-[17px] font-bold leading-6">인기 진료 카테고리</h2>
              <div className="mt-3 grid grid-cols-2 gap-3">
                {popularCategories.map((item) => (
                  <button
                    key={item}
                    type="button"
                    data-gtm-id="search-popular-keyword"
                    aria-label={`${item} 진료 카테고리 검색`}
                    onClick={() => {
                      trackEvent("search_click", {
                        screen_name: "search",
                        action: "category_click",
                        keyword_type: "popular",
                        keyword_name: getKeywordAnalyticsName(item),
                      });
                      submitSearch(item);
                    }}
                    className="h-12 rounded-[14px] bg-white px-4 text-left text-[14px] font-semibold leading-5 text-[#21242c] shadow-soft"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </section>
          </>
        ) : null}

        {hasResults ? (
          <section>
            <div className="mb-4 flex items-end justify-between">
              <h2 className="text-[17px] font-bold leading-6">검색 결과</h2>
              <span className="text-[12px] font-semibold leading-4 text-[#6b7280]">
                {results.length}개
              </span>
            </div>
            <div className="flex flex-col gap-3">
              {results.map((item) => (
                <SearchResultCard
                  key={item.id}
                  item={item}
                  onSelect={() => {
                    const resultTitle = hospitalTags[item.id]?.includes("다이어트")
                      ? "diet"
                      : hospitalTags[item.id]?.includes("탈모")
                        ? "hair_loss"
                        : "cold_rhinitis";

                    trackEvent("search_result_click", {
                      page_name: "search",
                      result_type: "hospital",
                      result_title: resultTitle,
                      destination: "hospital_detail",
                    });
                    router.push(`/hospital-detail?hospital=${item.id}&entry_point=search_result`);
                  }}
                />
              ))}
            </div>
          </section>
        ) : null}

        {isEmpty ? (
          <section className="flex h-[360px] flex-col items-center justify-center text-center">
            <div className="grid h-14 w-14 place-items-center rounded-[28px] bg-white text-[#9ca3af]">
              <SystemIcon name="search" className="h-7 w-7" strokeWidth={2} />
            </div>
            <h2 className="mt-5 text-[17px] font-bold leading-6 text-[#111827]">
              검색 결과가 없어요
            </h2>
            <p className="mt-2 text-[13px] font-medium leading-5 text-[#6b7280]">
              다른 병원, 진료, 약, 증상으로 검색해보세요
            </p>
          </section>
        ) : null}
      </div>
    </main>
  );
}
