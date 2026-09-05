const accessoryList = document.querySelector("#accessory-list");
const yearFilter = document.querySelector("#year-filter");
const resultCount = document.querySelector("#result-count");
const acquisitionFilter = document.querySelector("#acquisition-filter");
const statFilter =
    document.querySelector("#stat-filter");
const searchInput = document.querySelector(".search-box input");
const searchButton = document.querySelector(".search-box button");
const searchResult = document.querySelector("#search-result");
const detailView = document.querySelector("#detail-view");
const accessorySection = document.querySelector(".accessory-section");

// 검색 버튼 클릭
searchButton.addEventListener("click", function () {
    applyFilters();
});


// Enter 키 검색
searchInput.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {
        applyFilters();
    }

});


// 상세보기
function showDetail(id) {

    const accessory = accessories.find(function (item) {
        return item.id === id;
    });

    if (!accessory) {
        return;
    }


    function formatStat(value) {

        if (value > 0) {
            return "+" + value;
        }

        return value;
    }


    let movesHtml = "";

    if (accessory.moves.length === 0) {

        movesHtml = `
            <tr>
                <td colspan="2" class="checking">
                    ⚠️ 기술 정보 검증 중
                </td>
            </tr>
        `;

    } else {

        accessory.moves.forEach(function (move) {

            movesHtml += `
                <tr>
                    <td class="command">
                        ${move.command}
                    </td>

                    <td>
                        ${move.description}
                    </td>
                </tr>
            `;

        });

    }


    detailView.innerHTML = `
        <div class="detail-page">

            <button
                class="back-button"
                onclick="closeDetail()"
            >
                ← 목록으로 돌아가기
            </button>


            <div class="detail-header">

                <div class="card-badges">

                    <span class="badge">
                        ${accessory.releaseDate.substring(0, 4)}
                    </span>

                    <span class="badge">
                        ${accessory.acquisitionType}
                    </span>

                </div>

                <h1>${accessory.name}</h1>

                <p>${accessory.description}</p>

            </div>


            <h3>능력치 변화</h3>

            <div class="detail-stats">

                <div class="detail-stat">
                    <span>STR</span>
                    <strong>${formatStat(accessory.stats.str)}</strong>
                </div>

                <div class="detail-stat">
                    <span>TEC</span>
                    <strong>${formatStat(accessory.stats.tec)}</strong>
                </div>

                <div class="detail-stat">
                    <span>SPD</span>
                    <strong>${formatStat(accessory.stats.spd)}</strong>
                </div>

                <div class="detail-stat">
                    <span>JMP</span>
                    <strong>${formatStat(accessory.stats.jmp)}</strong>
                </div>

                <div class="detail-stat">
                    <span>DEF</span>
                    <strong>${formatStat(accessory.stats.def)}</strong>
                </div>

            </div>


            <div class="detail-block">

                <h3>기본 정보</h3>

                <p>
                    <strong>분류</strong>
                    ${accessory.category}
                </p>

                <p>
                    <strong>등급</strong>
                    ${accessory.grade}
                </p>

                <p>
                    <strong>출시일</strong>
                    ${accessory.releaseDate}
                </p>

                <p>
                    <strong>획득 분류</strong>
                    ${accessory.acquisitionType}
                </p>

            </div>


            <div class="detail-block">

                <h3>착용 캐릭터</h3>

                <p>
                    ${accessory.characters.join(", ")}
                </p>

            </div>


            <div class="detail-block">

                <h3>특수 효과</h3>

                ${
                    accessory.effects.length > 0
                    ?
                    `
                        <ul>
                            ${accessory.effects.map(function (effect) {
                                return `<li>${effect}</li>`;
                            }).join("")}
                        </ul>
                    `
                    :
                    `
                        <p class="checking">
                            ⚠️ 특수 효과 정보 검증 중
                        </p>
                    `
                }

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
                    ${accessory.acquisition.current}
                </p>


                <h4>과거 획득 이력</h4>

                <ul>
                    ${accessory.acquisition.history.map(function (history) {
                        return `<li>${history}</li>`;
                    }).join("")}
                </ul>

            </div>


            <div class="detail-block">

                <h3>출처</h3>

                <ul>
                    ${accessory.sources.map(function (source) {
                        return `<li>${source}</li>`;
                    }).join("")}
                </ul>

            </div>

        </div>
    `;


    accessorySection.classList.add("hidden");
    detailView.classList.remove("hidden");


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}
function closeDetail() {

    detailView.classList.add("hidden");

    accessorySection.classList.remove("hidden");


    window.scrollTo({
        top: accessorySection.offsetTop - 20,
        behavior: "smooth"
    });

}


// 검색 + 출시연도 + 획득처 필터
function applyFilters() {

    const keyword = searchInput.value.trim();
    const selectedYear = yearFilter.value;
    const selectedAcquisition = acquisitionFilter.value;
    const selectedStat = statFilter.value;


    const filteredAccessories = accessories.filter(function (accessory) {

        const matchesKeyword =
            keyword === "" ||
            accessory.name.includes(keyword);

        const matchesYear =
            selectedYear === "all" ||
            accessory.releaseDate.startsWith(selectedYear);

        const matchesAcquisition =
            selectedAcquisition === "all" ||
            accessory.acquisitionType === selectedAcquisition;


        let matchesStat = true;


        if (selectedStat === "str-up") {
            matchesStat = accessory.stats.str > 0;
        }

        else if (selectedStat === "tec-up") {
            matchesStat = accessory.stats.tec > 0;
        }

        else if (selectedStat === "spd-up") {
            matchesStat = accessory.stats.spd > 0;
        }

        else if (selectedStat === "jmp-up") {
            matchesStat = accessory.stats.jmp > 0;
        }

        else if (selectedStat === "def-up") {
            matchesStat = accessory.stats.def > 0;
        }

        else if (selectedStat === "stat-down") {

            matchesStat =
                accessory.stats.str < 0 ||
                accessory.stats.tec < 0 ||
                accessory.stats.spd < 0 ||
                accessory.stats.jmp < 0 ||
                accessory.stats.def < 0;

        }

        else if (selectedStat === "no-change") {

            matchesStat =
                accessory.stats.str === 0 &&
                accessory.stats.tec === 0 &&
                accessory.stats.spd === 0 &&
                accessory.stats.jmp === 0 &&
                accessory.stats.def === 0;

        }


        return (
            matchesKeyword &&
            matchesYear &&
            matchesAcquisition &&
            matchesStat
        );

    });


    showAccessoryList(filteredAccessories);

}


    showAccessoryList(filteredAccessories);




// 액세서리 목록 출력
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

        // 출시연도만 가져오기
        const releaseYear = accessory.releaseDate.substring(0, 4);


        // 능력치 숫자 표시 함수
        function formatStat(value) {

            if (value > 0) {
                return "+" + value;
            }

            return value;
        }


        accessoryList.innerHTML += `
            <div class="accessory-card">

                <div class="card-badges">
                    <span class="badge">
                        ${releaseYear}
                    </span>

                    <span class="badge">
                        ${accessory.acquisitionType}
                    </span>
                </div>


                <h3>${accessory.name}</h3>

                <p class="card-description">
                    ${accessory.description}
                </p>


                <div class="card-stats">

                    <div class="card-stat">
                        <span>STR</span>
                        <strong>
                            ${formatStat(accessory.stats.str)}
                        </strong>
                    </div>

                    <div class="card-stat">
                        <span>TEC</span>
                        <strong>
                            ${formatStat(accessory.stats.tec)}
                        </strong>
                    </div>

                    <div class="card-stat">
                        <span>SPD</span>
                        <strong>
                            ${formatStat(accessory.stats.spd)}
                        </strong>
                    </div>

                    <div class="card-stat">
                        <span>JMP</span>
                        <strong>
                            ${formatStat(accessory.stats.jmp)}
                        </strong>
                    </div>

                    <div class="card-stat">
                        <span>DEF</span>
                        <strong>
                            ${formatStat(accessory.stats.def)}
                        </strong>
                    </div>

                </div>


                <div class="card-footer">

                    <span class="release-date">
                        ${accessory.releaseDate}
                    </span>

                    <button
                        class="detail-button"
                        onclick="showDetail(${accessory.id})"
                    >
                        상세보기 →
                    </button>

                </div>

            </div>
        `;

    });


    resultCount.textContent =
        "총 " + list.length + "개의 액세서리";

}


// 출시연도 변경
yearFilter.addEventListener("change", function () {
    applyFilters();
});


// 획득처 변경
acquisitionFilter.addEventListener("change", function () {
    applyFilters();
});
statFilter.addEventListener("change", function () {
    applyFilters();
});

// 처음 페이지를 열었을 때 전체 목록 출력
showAccessoryList();