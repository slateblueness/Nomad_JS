const print = document.querySelector(".print");

function xmasDday() {

    // 현재 날짜와 시간 구하기
    const now = new Date();

    // 2023년 12월 25일 자정으로 시간 지정
    const xmas = new Date("2023-12-25T00:00:00");

    // 현재 날짜와 크리스마스 사이의 차이 구하기
    // 날짜 차이 계산: getTime() 함수 사용 -> 차이를 밀리초로 표시하는 함수
    const msResult = xmas.getTime() - now.getTime();

    // 현재의 차이를 계산해 일, 시, 분, 초로 표시하기
    // 12/25까지 남은 일, 시, 분, 초 계산
    const printDay = Math.floor(msResult / (1000 * 60 * 60 * 24));

    // 시, 분, 초는 두 자리 숫자로 표시되도록 처리
    const hourResult = Math.floor((msResult % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minuteResult = Math.floor((msResult % (1000 * 60 * 60)) / (1000 * 60));
    const secondResult = Math.floor((msResult % (1000 * 60)) / 1000);

    const printHour = String(hourResult).padStart(2, "0");
    const printMinute = String(minuteResult).padStart(2, "0");
    const printSecond = String(secondResult).padStart(2, "0");

    // 계산한 결과를 html 이용하여 화면에 출력
    print.innerHTML = `${printDay}d ${printHour}h ${printMinute}m ${printSecond}s`
}

// 함수 1번 먼저 실행한 뒤 1초에 한 번씩 재실행
xmasDday()
setInterval(xmasDday, 1000);