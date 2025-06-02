const admin = require("firebase-admin");
const axios = require("axios");

admin.initializeApp({
  credential: admin.credential.applicationDefault() // 또는 서비스 계정 사용
});

const db = admin.firestore();

const testFirestoreSave = async () => {
  const drawNo = 1112;

  try {
    const response = await axios.get(
      `https://www.dhlottery.co.kr/common.do?method=getLottoNumber&drwNo=${drawNo}`
    );

    const data = response.data;

    if (!data.returnValue || data.returnValue !== "success") {
      console.log(`❌ ${drawNo} 회차는 아직 발표되지 않음`);
      return;
    }

    await db.collection("lotto").doc(String(data.drwNo)).set({
      DrawNumber: data.drwNo,
      Number1: data.drwtNo1,
      Number2: data.drwtNo2,
      Number3: data.drwtNo3,
      Number4: data.drwtNo4,
      Number5: data.drwtNo5,
      Number6: data.drwtNo6,
      Bonus: data.bnusNo,
      FirstPrizeWinners: data.firstPrzwnerCo,
    });

    console.log(`✅ 회차 ${data.drwNo} 저장 완료`);

  } catch (error) {
    console.error("❌ 오류 발생:", error);
  }
};

testFirestoreSave();
