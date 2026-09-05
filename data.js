const accessories = [

    {
        id: 1,

        name: "뇌신 제우스의 심판",
        category: "액세서리",
        grade: "미확인",
        releaseDate: "2025-01-22",
        acquisitionType: "수집북",
        description: "번개와 천둥의 힘을 사용하는 제우스 계열 액세서리.",

        characters: [
            "안드로이드를 제외한 전체 캐릭터"
        ],

        stats: {
            str: 0,
            tec: 0,
            spd: 1,
            jmp: 0,
            def: 0
        },

        effects: [
            "전기 속성 내성과 관련된 특수 효과를 가지고 있습니다.",
            "전투 중 전용 게이지를 축적하여 성능을 강화할 수 있습니다."
        ],

        moves: [],

        acquisition: {
            current: "현재 획득 가능 여부 확인 필요",
            history: [
                "2025년 1월 22일 업데이트 당시 수집북 관련 보상"
            ]
        },

        sources: [
            "겟앰프드 공식 2025년 1월 22일 업데이트"
        ]
    },


    {
        id: 2,

        name: "논 플레임",
        category: "액세서리",
        grade: "미확인",
        releaseDate: "2025-01-22",
        acquisitionType: "보급상자",
        description: "화염 방사 공격을 사용하는 액세서리.",

        characters: [
            "안드로이드를 제외한 전체 캐릭터"
        ],

        stats: {
            str: 0,
            tec: 0,
            spd: 0,
            jmp: 0,
            def: 0
        },

        effects: [
            "무기 아이템을 사용할 수 없습니다.",
            "일부 공격으로 상대에게 지속 화염 피해를 줄 수 있습니다.",
            "화염 효과는 최대 3회까지 중첩될 수 있습니다."
        ],

        moves: [
            {
                command: "C → C",
                description: "연속 공격 후 화염 공격으로 이어집니다."
            },
            {
                command: "X (모으기)",
                description: "전방으로 화염을 방사하는 기술입니다."
            },
            {
                command: "V + X",
                description: "공중에서 아래 방향으로 화염을 방사합니다."
            },
            {
                command: "Z + C (모으기)",
                description: "전방으로 화염 계열 공격을 사용합니다."
            },
            {
                command: "D + XC (모으기)",
                description: "이동하면서 화염을 방사하는 기술입니다."
            }
        ],

        acquisition: {
            current: "현재 획득 가능 여부 확인 필요",
            history: [
                "2025년 1월 판도라의 보급상자 관련 상품"
            ]
        },

        sources: [
            "겟앰프드 공식 2025년 1월 22일 업데이트"
        ]
    },


    {
        id: 3,

        name: "어비스 체인",
        category: "액세서리",
        grade: "미확인",
        releaseDate: "2025-01-22",
        acquisitionType: "챌린지",
        description: "마계의 힘이 깃든 체인을 이용해 상대를 공격하고 속박하는 액세서리.",

        characters: [
            "안드로이드를 제외한 전체 캐릭터"
        ],

        stats: {
            str: 0,
            tec: 0,
            spd: 0,
            jmp: 0,
            def: 0
        },

        effects: [
            "일부 특수 기술 명중 시 MP를 회복할 수 있습니다.",
            "일부 기술로 상대를 속박할 수 있습니다."
        ],

        moves: [
            {
                command: "C → C → C (→ XC)",
                description: "체인을 이용한 연속 공격입니다."
            },
            {
                command: "X → X → X (→ XC)",
                description: "체인 연속 공격과 파생 기술을 사용합니다."
            },
            {
                command: "Z + C",
                description: "체인을 전방으로 뻗어 공격합니다."
            },
            {
                command: "Z + X",
                description: "체인을 이용해 상대를 속박합니다."
            },
            {
                command: "D + XC",
                description: "체인을 이용한 특수 공격입니다."
            },
            {
                command: "V + XC",
                description: "공중에서 체인 계열 공격을 사용합니다."
            },
            {
                command: "Z + XC",
                description: "사용자 주변으로 체인을 방출합니다."
            }
        ],

        acquisition: {
            current: "현재 획득 가능 여부 확인 필요",
            history: [
                "2025년 1월 22일 업데이트 당시 챌린지 관련 보상"
            ]
        },

        sources: [
            "겟앰프드 공식 2025년 1월 22일 업데이트"
        ]
    },


    {
        id: 4,

        name: "어스 링",
        category: "액세서리",
        grade: "미확인",
        releaseDate: "2025-01-22",
        acquisitionType: "패스",
        description: "지구의 힘이 깃들어 있는 링 형태의 액세서리.",

        characters: [
            "안드로이드를 제외한 전체 캐릭터"
        ],

        stats: {
            str: 0,
            tec: 0,
            spd: 0,
            jmp: 0,
            def: 0
        },

        effects: [],

        moves: [],

        acquisition: {
            current: "현재 획득 가능 여부 확인 필요",
            history: [
                "2025년 1월 22일 시작된 겟앰패스 보상"
            ]
        },

        sources: [
            "겟앰프드 공식 2025년 1월 22일 업데이트"
        ]
    },


    {
        id: 5,

        name: "환호두쌍구",
        category: "액세서리",
        grade: "미확인",
        releaseDate: "2025-02-19",
        acquisitionType: "보급상자",
        description: "호랑이의 움직임을 본떠 만든 갈고리 무기.",

        characters: [
            "안드로이드를 제외한 전체 캐릭터"
        ],

        stats: {
            str: 0,
            tec: 0,
            spd: 0,
            jmp: 0,
            def: 0
        },

        effects: [
            "무기 아이템을 사용할 수 없습니다."
        ],

        moves: [],

        acquisition: {
            current: "현재 획득 가능 여부 확인 필요",
            history: [
                "2025년 2월 19일 ~ 3월 5일 액세서리 보급상자 상품"
            ]
        },

        sources: [
            "겟앰프드 공식 2025년 2월 19일 업데이트"
        ]
    },


    {
        id: 6,

        name: "타락의 마도서",
        category: "액세서리",
        grade: "미확인",
        releaseDate: "2025-04-02",
        acquisitionType: "보급상자",

        description: "악마를 소환할 수 있는 마도서 형태의 액세서리.",

        characters: [
            "안드로이드를 제외한 전체 캐릭터"
        ],

        stats: {
            str: 0,
            tec: 0,
            spd: 0,
            jmp: 0,
            def: 0
        },

        effects: [],

        moves: [],

        acquisition: {
            current: "현재 획득 가능 여부 확인 필요",
            history: [
                "2025년 4월 2일 ~ 4월 23일 판도라의 보급상자 상품"
            ]
        },

        sources: [
            "겟앰프드 공식 2025년 4월 2일 업데이트"
        ]
    },


    {
        id: 7,

        name: "니케의 영혼",
        category: "액세서리",
        grade: "미확인",
        releaseDate: "2025-06-18",
        acquisitionType: "이벤트",
        description: "승리의 여신 니케의 힘이 깃든 황금빛 날개.",

        characters: [
            "안드로이드를 제외한 전체 캐릭터"
        ],

        stats: {
            str: 0,
            tec: 0,
            spd: 0,
            jmp: 0,
            def: 0
        },

        effects: [
            "무기 아이템을 사용할 수 없습니다."
        ],

        moves: [],

        acquisition: {
            current: "현재 획득 가능 여부 확인 필요",
            history: [
                "2025년 6월의 선물 JUNEVENT 이벤트 보상"
            ]
        },

        sources: [
            "겟앰프드 공식 2025년 6월 18일 업데이트"
        ]
    },


    {
        id: 8,

        name: "듀얼 엑소시즘",
        category: "액세서리",
        grade: "미확인",
        releaseDate: "2025-06-25",
        acquisitionType: "패키지",
        description: "불과 얼음이라는 상반된 두 원소의 힘을 사용하는 망토.",

        characters: [
            "안드로이드를 제외한 전체 캐릭터"
        ],

        stats: {
            str: 0,
            tec: 0,
            spd: 0,
            jmp: 0,
            def: 0
        },

        effects: [],

        moves: [],

        acquisition: {
            current: "현재 획득 가능 여부 확인 필요",
            history: [
                "2025년 6월 25일 ~ 7월 2일 듀얼 엑소시즘 액세서리 패키지"
            ]
        },

        sources: [
            "겟앰프드 공식 2025년 6월 25일 업데이트"
        ]
    },


    {
        id: 9,

        name: "플러스 크로스",
        category: "액세서리",
        grade: "미확인",
        releaseDate: "2024-12-31",
        acquisitionType: "보급상자",
        description: "사방으로 전기 에너지를 방출하는 무기.",

        characters: [
            "안드로이드를 제외한 전체 캐릭터"
        ],

        stats: {
            str: 0,
            tec: 0,
            spd: 0,
            jmp: 0,
            def: -2
        },

        effects: [
            "받는 대미지를 경감하거나 상대에게 주는 대미지를 증폭시키는 특성을 가지고 있습니다."
        ],

        moves: [],

        acquisition: {
            current: "현재 획득 가능 여부 확인 필요",
            history: [
                "2024년 12월 31일 ~ 2025년 1월 22일 판도라의 보급상자 상품"
            ]
        },

        sources: [
            "겟앰프드 공식 2024년 12월 31일 업데이트"
        ]
    },


    {
        id: 10,

        name: "인파이트 글러브",
        category: "액세서리",
        grade: "미확인",
        releaseDate: "2026-05-20",
        acquisitionType: "패키지",
        description: "위빙과 더킹으로 상대의 품에 파고들어 근거리 공격을 펼치는 복싱 글러브.",

        characters: [
            "안드로이드를 제외한 전체 캐릭터"
        ],

        stats: {
            str: 0,
            tec: 0,
            spd: 0,
            jmp: 0,
            def: 0
        },

        effects: [],

        moves: [],

        acquisition: {
            current: "현재 획득 가능 여부 확인 필요",
            history: [
                "2026년 5월 20일 당시 15,000 RM 판매",
                "챔피언 위버 패키지 구성품"
            ]
        },

        sources: [
            "겟앰프드 공식 2026년 5월 20일 업데이트"
        ]
    }

];