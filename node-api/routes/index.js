var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/ttest', function (req, res, next) {
    res.setHeader('Access-Control-Allow-origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true'); // 쿠키 주고받기 허용
    const data = {
        msg : 'hi',
    }
    res.status(200).json(data);
    // res.json(data);
});

router.get('/karlo', async (req, res, next) => {
    res.setHeader('Access-Control-Allow-origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true'); // 쿠키 주고받기 허용

    console.log(req);
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

    // // A kitty with black fur
    // // sleeping cat, dog, human, ugly face, cropped
    async function karloInit() {
        const karlo_url = "https://api.kakaobrain.com/v2/inference/karlo/t2i";
        const karlo_data = {
            prompt: "",
            negative_prompt: "",
            return_type: "base64_string",
            samples: 1,//1 ~ 8개 결과
        }
        karlo_data.prompt = "fire";
        let response = await kakaoAPI(karlo_url, karlo_data);
        // console.log(response);
        // let arr = [];

        // response.images.forEach(i => {
        //     arr.push(i.image)
        // })
        return response;
    };
    karloInit().then(response => {
        res.status(200).json(response);

    })
    
    // console.log(ress);

    // // 코GPT api
    // async function kogptInit() {
    //     const kogpt_url = "https://api.kakaobrain.com/v1/inference/kogpt/generation";
    //     const kogpt_data = {
    //         prompt: "",
    //         max_tokens: 10, // 결과 토큰 수
    //         // temperature: 1.0, // 0 ~ 1.0(실수) 높을수록 창의적
    //         // top_p: 1.0, // 0 ~ 1.0(실수) - 높을수록 창의적
    //         // n: 1 // 결과 수
    //     }
    //     // 일단 얘는 no cors로.. 근데 이거 써도 400에러 ㅠㅜ
    //     const nocors = {mode: 'no-cors',}

    //     const tar = document.querySelector('.kogpt_wrap');
    //     if (tar) {
    //         tar.querySelector('button').addEventListener('click', async () => {
    //             kogpt_data.prompt = tar.querySelector('#inp3').value == "" ? "오늘 날씨 어때?" : tar.querySelector('#inp3').value;
    //             kogpt_data.max_tokens = 1;
    //             // kogpt_data.n = 3;

    //             let response = await kakaoAPI(kogpt_url, kogpt_data, nocors);
    //             console.log(response);
    //             console.log(response.generations[0].text);
    //             if(response.generations[0].text){
    //                 tar.querySelector('.answer').innerHTML = response.generations[0].text;
    //             }


    //         });
    //     };
    // }
    // kogptInit();

    
});

module.exports = router;
