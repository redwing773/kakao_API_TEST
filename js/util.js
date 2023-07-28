// async function karlo_request(){
//     let response = await fetch('http://localhost:3300/karlo').then(response => response.text());
//     response = JSON.parse(response);
//     console.log(response);
//     // debugger;
//     let arr = [];
//     response.images.forEach(i => {
//         arr.push(i.image)
//     })
//     console.log(arr);
//     for (let i = 0; i < arr.length; i++) {
//         let newImg = document.createElement("img");
//         newImg.src = `data:image/;base64,${arr[i]}`;
//         // newImg.alt = `${karlo_data.prompt} - ${i}`;
//         document.querySelector('.karlo_wrap').append(newImg);
//     };
// }

// require('dotenv/config');
// const AWS = require('aws-sdk');


// import dotenv from "../node_modules/dotenv/lib/main"
// import dotenv from 'detenv';
// dotenv.config();
// console.log(process.env._APP_URL);
// console.log(dotenv);


async function test_request() {
    const data = {
        msg: 1,
    };
    let response = await fetch('http://localhost:3300/ttest', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    }).then(response => response.json())
        .then(data => {
            console.log(data);
        })
    console.log(response);
};


// 카카오 공용 api 요청
async function kakaoAPI(url, data, nocors) {
    try {
        const REST_API_KEY = 'ec4598a1a965774fe72c122f72c1d857';
        let response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `KakaoAK ${REST_API_KEY}`,
            },
            // mode: 'no-cors',
            body: JSON.stringify(data),
            ...nocors,
        });

        response = response.json(); // JSON 데이터로 응답을 파싱합니다.
        return response;

    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

function karloInit() {
    const karlo_url = "https://api.kakaobrain.com/v2/inference/karlo/t2i";
    const karlo_data = {
        prompt: "",
        negative_prompt: "",
        return_type: "base64_string",
        samples: 1,//1 ~ 8개 결과
    }

    const tar = document.querySelector('.karlo_wrap');
    if (tar) {
        tar.querySelector('button').addEventListener('click', async () => {
            karlo_data.prompt = tar.querySelector('#inp1').value == "" ? "fire" : tar.querySelector('#inp1').value;
            karlo_data.negative_prompt = tar.querySelector('#inp2').value;
            let response = await kakaoAPI(karlo_url, karlo_data);
            console.log(response);
            let arr = [];

            response.images.forEach(i => {
                arr.push(i.image)
            })

            for (let i = 0; i < arr.length; i++) {
                let newImg = document.createElement("img");
                newImg.src = `data:image/;base64,${arr[i]}`;
                newImg.alt = `${karlo_data.prompt} - ${i}`;
                document.querySelector('.karlo_wrap').append(newImg);
            };
        });
    };
};
// karloInit();

async function karlo_request() {
    const tar = document.querySelector('.karlo_wrap');
    if (tar) {
        tar.querySelector('button').addEventListener('click', async () => {
            const karlo_data = {};
            karlo_data.prompt = tar.querySelector('#inp1').value == "" ? "fire" : tar.querySelector('#inp1').value;
            karlo_data.negative_prompt = tar.querySelector('#inp2').value;
            let response = await fetch('http://localhost:3300/karlo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(karlo_data),
            }).then(response => response.text());
            response = JSON.parse(response);
            console.log(response);
            // debugger;
            let arr = [];
            response.images.forEach(i => {
                arr.push(i.image)
            })
            console.log(arr);
            for (let i = 0; i < arr.length; i++) {
                let newImg = document.createElement("img");
                newImg.src = `data:image/;base64,${arr[i]}`;
                // newImg.alt = `${karlo_data.prompt} - ${i}`;
                document.querySelector('.karlo_wrap').append(newImg);
            };
        });
    }
}
karlo_request()

// 코GPT api
async function kogptInit() {
    const kogpt_url = "https://api.kakaobrain.com/v1/inference/kogpt/generation";
    const kogpt_data = {
        prompt: "",
        max_tokens: 10, // 결과 토큰 수
        // temperature: 1.0, // 0 ~ 1.0(실수) 높을수록 창의적
        // top_p: 1.0, // 0 ~ 1.0(실수) - 높을수록 창의적
        // n: 1 // 결과 수
    }
    // 일단 얘는 no cors로.. 근데 이거 써도 400에러 ㅠㅜ
    const nocors = { mode: 'no-cors', }

    const tar = document.querySelector('.kogpt_wrap');
    if (tar) {
        tar.querySelector('button').addEventListener('click', async () => {
            kogpt_data.prompt = tar.querySelector('#inp3').value == "" ? "오늘 날씨 어때?" : tar.querySelector('#inp3').value;
            kogpt_data.max_tokens = 1;
            // kogpt_data.n = 3;

            let response = await kakaoAPI(kogpt_url, kogpt_data, nocors);
            console.log(response);
            console.log(response.generations[0].text);
            if (response.generations[0].text) {
                tar.querySelector('.answer').innerHTML = response.generations[0].text;
            }
        });
    };
}
kogptInit();