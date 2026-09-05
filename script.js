const accessoryList = document.querySelector("#accessory-list");
const yearFilter = document.querySelector("#year-filter");
const acquisitionFilter = document.querySelector("#acquisition-filter");
const statFilter = document.querySelector("#stat-filter");
const sortFilter = document.querySelector("#sort-filter");
const resultCount = document.querySelector("#result-count");
const searchResult = document.querySelector("#search-result");

const searchInput = document.querySelector("#search-input");
const searchButton = document.querySelector("#search-button");
const resetButton = document.querySelector("#reset-button");
const homeButton = document.querySelector("#home-button");

const detailView = document.querySelector("#detail-view");
const accessorySection = document.querySelector(".accessory-section");
const heroSection = document.querySelector("#hero-section");

function formatStat(value) {
    return value > 0 ? `+${value}` : String(value);
}

function escapeHtml(value) {
    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

function sourceToHtml(source) {
    const safeSource = escapeHtml(source);

    if (/^https?:\/\//i.test(source)) {
        return `
            <a
                class="source-link"
                href="${safeSource}"
                target="_blank"
                rel="noopener noreferrer"
            >
                공식/참고 출처 열기 ↗
            </a>
        `;
    }

    return safeSource;
}

function setListVisible() {
    detailView.classList.add("hidden");
    accessorySection.classList.remove("hidden");
    heroSection.classList.remove("hidden");
}

function setDetailVisible() {
    accessorySection.classList.add("hidden");
    heroSection.classList.add("hidden");
    detailView.classList.remove("hidden");
}

function getFilteredAccessories() {
    const keyword = searchInput.value.trim().toLowerCase();
    const selectedYear = yearFilter.value;
    const selectedAcquisition = acquisitionFilter.value;
    const selectedStat = statFilter.value;
    const selectedSort = sortFilter.value;

    let list = accessories.filter(function (accessory) {
        const matchesKeyword =
            keyword === "" ||
            accessory.name.toLowerCase().includes(keyword) ||
            accessory.description.toLowerCase().includes(keyword);

        const matchesYear =
            selectedYear === "all" ||
            accessory.releaseDate.startsWith(selectedYear);

        const matchesAcquisition =
            selectedAcquisition === "all" ||
            accessory.acquisitionType === selectedAcquisition;

        let matchesStat = true;

        if (selectedStat === "str-up") {
            matchesStat = accessory.stats.str > 0;
        } else if (selectedStat === "tec-up") {
            matchesStat = accessory.stats.tec > 0;
        } else if (selectedStat === "spd-up") {
            matchesStat = accessory.stats.spd > 0;
        } else if (selectedStat === "jmp-up") {
            matchesStat = accessory.stats.jmp > 0;
        } else if (selectedStat === "def-up") {
            matchesStat = accessory.stats.def > 0;
        } else if (selectedStat === "stat-down") {
            matchesStat = Object.values(accessory.stats).some(function (value) {
                return value < 0;
            });
        } else if (selectedStat === "no-change") {
            matchesStat = Object.values(accessory.stats).every(function (value) {
                return value === 0;
            });
        }

        return (
            matchesKeyword &&
            matchesYear &&
            matchesAcquisition &&
            matchesStat
        );
    });

    list = [...list].sort(function (a, b) {
        if (selectedSort === "oldest") {
            return a.releaseDate.localeCompare(b.releaseDate);
        }

        if (selectedSort === "name") {
            return a.name.localeCompare(b.name, "ko");
        }

        return b.releaseDate.localeCompare(a.releaseDate);
    });

    return list;
}

function applyFilters() {
    const list = getFilteredAccessories();
    showAccessoryList(list);

    const keyword = searchInput.value.trim();

    searchResult.textContent =
        keyword === ""
            ? ""
            : `"${keyword}" 검색 결과`;
}

function resetFilters() {
    searchInput.value = "";
    yearFilter.value = "all";
    acquisitionFilter.value = "all";
    statFilter.value = "all";
    sortFilter.value = "latest";
    searchResult.textContent = "";

    showAccessoryList(getFilteredAccessories());
}

function showAccessoryList(list = accessories) {
    accessoryList.innerHTML = "";

    if (list.length === 0) {
        accessoryList.innerHTML = `
            <div class="no-result">
                <strong>검색 결과가 없습니다.</strong>
                <p>다른 검색어나 필터를 선택해보세요.</p>
            </div>
        `;

        resultCount.textContent = "총 0개의 액세서리";
        return;
    }

    list.forEach(function (accessory) {
        const releaseYear = accessory.releaseDate.substring(0, 4);

        accessoryList.insertAdjacentHTML(
            "beforeend",
            `
                <article class="accessory-card">

                    <div class="card-badges">
                        <span class="badge">${escapeHtml(releaseYear)}</span>
                        <span class="badge">${escapeHtml(accessory.acquisitionType)}</span>
                    </div>

                    <h3>${escapeHtml(accessory.name)}</h3>

                    <p class="card-description">
                        ${escapeHtml(accessory.description)}
                    </p>

                    <div class="card-stats">
                        ${["str", "tec", "spd", "jmp", "def"].map(function (stat) {
                            return `
                                <div class="card-stat">
                                    <span>${stat.toUpperCase()}</span>
                                    <strong>${formatStat(accessory.stats[stat])}</strong>
                                </div>
                            `;
                        }).join("")}
                    </div>

                    <div class="card-footer">
                        <span class="release-date">
                            ${escapeHtml(accessory.releaseDate)}
                        </span>

                        <button
                            type="button"
                            class="detail-button"
                            data-accessory-id="${accessory.id}"
                        >
                            상세보기 →
                        </button>
                    </div>

                </article>
            `
        );
    });

    resultCount.textContent = `총 ${list.length}개의 액세서리`;
}

function renderDetail(id) {
    const accessory = accessories.find(function (item) {
        return item.id === id;
    });

    if (!accessory) {
        return false;
    }

    const movesHtml =
        accessory.moves && accessory.moves.length > 0
            ? accessory.moves.map(function (move) {
                return `
                    <tr>
                        <td class="command">${escapeHtml(move.command)}</td>
                        <td>${escapeHtml(move.description)}</td>
                    </tr>
                `;
            }).join("")
            : `
                <tr>
                    <td colspan="2">
                        <div class="checking">⚠️ 기술 정보 검증 중</div>
                    </td>
                </tr>
            `;

    const effectsHtml =
        accessory.effects && accessory.effects.length > 0
            ? `
                <ul>
                    ${accessory.effects.map(function (effect) {
                        return `<li>${escapeHtml(effect)}</li>`;
                    }).join("")}
                </ul>
            `
            : `<p class="checking">⚠️ 특수 효과 정보 검증 중</p>`;

    const histories =
        accessory.acquisition &&
        Array.isArray(accessory.acquisition.history)
            ? accessory.acquisition.history
            : [];

    const historyHtml =
        histories.length > 0
            ? `
                <ul>
                    ${histories.map(function (history) {
                        return `<li>${escapeHtml(history)}</li>`;
                    }).join("")}
                </ul>
            `
            : `<p class="checking">과거 획득 정보 미확인</p>`;

    const sources = Array.isArray(accessory.sources)
        ? accessory.sources
        : [];

    const sourcesHtml =
        sources.length > 0
            ? `
                <ul>
                    ${sources.map(function (source) {
                        return `<li>${sourceToHtml(source)}</li>`;
                    }).join("")}
                </ul>
            `
            : `<p class="checking">출처 확인 중</p>`;

    const characters =
        accessory.characters && accessory.characters.length > 0
            ? accessory.characters.join(", ")
            : "미확인";

    detailView.innerHTML = `
        <div class="detail-page">

            <div class="detail-topbar">
                <button type="button" class="back-button" id="back-button">
                    ← 목록으로
                </button>

                <button type="button" class="share-button" id="share-button">
                    링크 공유
                </button>
            </div>

            <div class="detail-header">

                <div class="card-badges">
                    <span class="badge">
                        ${escapeHtml(accessory.releaseDate.substring(0, 4))}
                    </span>
                    <span class="badge">
                        ${escapeHtml(accessory.acquisitionType)}
                    </span>
                </div>

                <h1>${escapeHtml(accessory.name)}</h1>
                <p>${escapeHtml(accessory.description)}</p>

            </div>

            <h3>능력치 변화</h3>

            <div class="detail-stats">
                ${["str", "tec", "spd", "jmp", "def"].map(function (stat) {
                    return `
                        <div class="detail-stat">
                            <span>${stat.toUpperCase()}</span>
                            <strong>${formatStat(accessory.stats[stat])}</strong>
                        </div>
                    `;
                }).join("")}
            </div>

            <div class="detail-block">
                <h3>기본 정보</h3>
                <p><strong>분류</strong> ${escapeHtml(accessory.category)}</p>
                <p><strong>등급</strong> ${escapeHtml(accessory.grade)}</p>
                <p><strong>출시일</strong> ${escapeHtml(accessory.releaseDate)}</p>
                <p><strong>획득 분류</strong> ${escapeHtml(accessory.acquisitionType)}</p>
            </div>

            <div class="detail-block">
                <h3>착용 캐릭터</h3>
                <p>${escapeHtml(characters)}</p>
            </div>

            <div class="detail-block">
                <h3>특수 효과</h3>
                ${effectsHtml}
            </div>

            <div class="detail-block">
                <h3>기술표</h3>

                <div class="table-wrapper">
                    <table>
                        <thead>
                            <tr>
                                <th>커맨드</th>
                                <th>설명</th>
                            </tr>
                        </thead>

                        <tbody>
                            ${movesHtml}
                        </tbody>
                    </table>
                </div>
            </div>

            <div class="detail-block">
                <h3>획득 정보</h3>

                <p>
                    <strong>현재 획득</strong><br>
                    ${
                        accessory.acquisition
                            ? escapeHtml(accessory.acquisition.current)
                            : "미확인"
                    }
                </p>

                <h4>과거 획득 이력</h4>
                ${historyHtml}
            </div>

            <div class="detail-block">
                <h3>출처</h3>
                ${sourcesHtml}
            </div>

        </div>
    `;

    setDetailVisible();
    document.title = `${accessory.name} | GetAmped DB`;

    return true;
}

function openDetail(id) {
    const exists = accessories.some(function (item) {
        return item.id === id;
    });

    if (!exists) {
        return;
    }

    const url = new URL(window.location.href);
    url.search = "";
    url.searchParams.set("id", String(id));

    window.history.pushState(
        { page: "detail", id: id },
        "",
        url.pathname + url.search
    );

    renderDetail(id);

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

function renderListPage(options = {}) {
    const shouldScroll = options.scroll !== false;

    setListVisible();
    document.title = "GetAmped DB";
    showAccessoryList(getFilteredAccessories());

    if (shouldScroll) {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }
}

function goToList() {
    /*
      상세 페이지는 항상 '목록 → 상세' 순서의 history를 갖도록 만들기 때문에
      뒤로가기 버튼은 history.back()을 사용합니다.
      만약 예외적으로 현재 state가 detail이 아니면 URL을 목록으로 교체합니다.
    */
    if (window.history.state && window.history.state.page === "detail") {
        window.history.back();
        return;
    }

    window.history.replaceState(
        { page: "list" },
        "",
        window.location.pathname
    );

    renderListPage();
}

async function shareCurrentAccessory() {
    const url = window.location.href;

    try {
        if (navigator.share) {
            await navigator.share({
                title: document.title,
                url: url
            });
            return;
        }

        await navigator.clipboard.writeText(url);
        showToast("링크를 복사했습니다.");
    } catch (error) {
        if (error && error.name === "AbortError") {
            return;
        }

        showToast("주소창의 링크를 복사해 공유해주세요.");
    }
}

function showToast(message) {
    const oldToast = document.querySelector(".toast");

    if (oldToast) {
        oldToast.remove();
    }

    const toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = message;

    document.body.appendChild(toast);

    window.setTimeout(function () {
        toast.remove();
    }, 1800);
}

function routeFromUrl() {
    const params = new URLSearchParams(window.location.search);
    const idParam = params.get("id");

    if (!idParam) {
        renderListPage({ scroll: false });
        return;
    }

    const id = Number(idParam);

    if (!Number.isInteger(id) || id <= 0 || !renderDetail(id)) {
        window.history.replaceState(
            { page: "list" },
            "",
            window.location.pathname
        );

        renderListPage({ scroll: false });
    }
}

function initializeRouter() {
    const params = new URLSearchParams(window.location.search);
    const idParam = params.get("id");
    const id = Number(idParam);

    const validDirectDetail =
        idParam !== null &&
        Number.isInteger(id) &&
        id > 0 &&
        accessories.some(function (item) {
            return item.id === id;
        });

    /*
      공유 링크(?id=3)로 사이트에 처음 들어와도
      뒤로가기를 눌렀을 때 외부 사이트가 아니라 GetAmped DB 목록으로 가게 합니다.

      현재 history 항목을 목록으로 바꾸고,
      그 위에 상세 항목을 하나 새로 쌓습니다.
    */
    if (validDirectDetail) {
        const detailUrl =
            window.location.pathname +
            "?id=" +
            encodeURIComponent(id);

        window.history.replaceState(
            { page: "list" },
            "",
            window.location.pathname
        );

        window.history.pushState(
            { page: "detail", id: id },
            "",
            detailUrl
        );

        renderDetail(id);
        return;
    }

    window.history.replaceState(
        { page: "list" },
        "",
        window.location.pathname
    );

    renderListPage({ scroll: false });
}

searchButton.addEventListener("click", applyFilters);

searchInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        applyFilters();
    }
});

yearFilter.addEventListener("change", applyFilters);
acquisitionFilter.addEventListener("change", applyFilters);
statFilter.addEventListener("change", applyFilters);
sortFilter.addEventListener("change", applyFilters);

resetButton.addEventListener("click", resetFilters);

homeButton.addEventListener("click", function () {
    if (window.history.state && window.history.state.page === "detail") {
        goToList();
        return;
    }

    renderListPage();
});

accessoryList.addEventListener("click", function (event) {
    const button = event.target.closest("[data-accessory-id]");

    if (!button) {
        return;
    }

    openDetail(Number(button.dataset.accessoryId));
});

detailView.addEventListener("click", function (event) {
    if (event.target.closest("#back-button")) {
        goToList();
        return;
    }

    if (event.target.closest("#share-button")) {
        shareCurrentAccessory();
    }
});

window.addEventListener("popstate", function () {
    routeFromUrl();
});

initializeRouter();
