const axios = require("axios");

const testLottoApiCall = async () => {
  const drawNo = 1112; // 존재하는 회차로 테스트

  try {
    const response = await axios.get(
      `https://www.dhlottery.co.kr/common.do?method=getLottoNumber&drwNo=${drawNo}`
    );

    const data = response.data;
    console.log("API 응답:", data);

    if (!data.returnValue || data.returnValue !== "success") {
      console.log(`❌ ${drawNo} 회차는 아직 발표되지 않음`);
    } else {
      console.log("✅ 데이터 정상 수신");
    }

  } catch (error) {
    console.error("❌ API 호출 실패:", error);
  }
};

testLottoApiCall();
