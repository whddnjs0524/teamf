const sections = document.querySelectorAll('.section');
let currentIndex = 0;
let randomSections = [];

sections.forEach((section) =>
  section.addEventListener('click', () => {
    if (section.classList.contains('open')) {
      // 이미 열려있는 섹션을 클릭한 경우, 해당 섹션만 닫습니다.
      section.classList.remove('open');
    } else {
      // 다른 섹션을 클릭한 경우, 모든 섹션을 닫고 클릭한 섹션만 엽니다.
      sections.forEach((s) => s.classList.remove('open'));
      section.classList.add('open');
    }
  })
);

// forEach를 통해서 각각의 section에 접근해서 클릭이벤트
// 두번째 forEach를 통해서 toggle활용해서 클래스 변경
// toggle은 뒤의 조건이 true일경우 open class 추가, false일경우 제거가능.
// 여기서  저장한 index는 지금당장은 필요없지만 추후에 필요해서 저장.

// const random = (array) => {
//   for (let i = array.length - 1; i > 0; i--) {
//     const j = Math.trunc(Math.random() * (i + 1));
//     [array[i], array[j]] = [array[j], array[i]];
//   }
//   return array;
// };
/* 


random으로 배열의 요소를 랜덤으로 섞기위해서 만든 코드
첫번쨰 반복문에서 i값을 배열의 마지막부터 시작해서 --로 감소
왜 i=0이 아니고 i>0 이냐고 의아할 수 있는데, 어차피 남은 하나는 의미없기 때문

그 이후 j는 Math.random() * n 을 이해
Math.random() * 4의 경우 0~3까지의 숫자가 random으로 나오게 됨. 그래서 n+1 해서 값을 맞춤.

Math.trunc는 소수점제거임. 인덱스로 쓸거니까 소수점 제거한거.

그 이후는 구조배열할당을 사용한건데
let x= 10 , let = y 20; 일때 값을 바꾸는 구조배열할당은 [x,y] = [y,x]임 
응용.
*/

const displaySections = () => {
  const sectionContainer = document.querySelector('.sections');
  randomSections = random([...sections]);
  randomSections.forEach((section) => sectionContainer.appendChild(section));
};

/* 
그다음은 랜덤으로 섞은걸 출력하기 위한 함수
랜덤으로 섞었던 것들을 저장함.
저장했던걸 appendChild를 통해서 추가 배열이기때문에 forEach씀. 
forEach 대신 map써도 같음.
*/

displaySections();

document.addEventListener('keydown', (e) => {
  switch (e.key) {
    case 'ArrowRight':
      currentIndex = (currentIndex + 1) % randomSections.length;
      break;
    case 'ArrowLeft':
      currentIndex =
        (currentIndex - 1 + randomSections.length) % randomSections.length;
      break;
    default:
      return;
  }
  randomSections[currentIndex].click();
});

/* 
오른쪽 방향키, 왼쪽방향키에 맞춰서 사용하려고 짠 코드
currentIndex는 여기서 사용됨. currentIndex를 사용하지 않으면, 랜덤으로 출력됐기때문에
방향에 맞지않게 작동했음.

keydown 이벤트는 키를 눌렀을떄 발생하는 것. (e) 구조로 사용하면 e.key값으로 받아서 
사용할 수 있음.

currentIndex = (currentIndex + 1) % randomSections.length; 이 값인 이유는
오른쪽방향키를 눌렀기떄문에 먼저 +1 씩 증가해야 했음.
근데 이게 무한히 증가할수있기때문에 배열의 length값을 나눈 나머지로 사용.
이런구조로 짜야 0 1 2 3 / 0 1 2 3이 유지됨. 

반대로 왼쪽방향키는 줄어들어야 했음 .
그렇기때문에 -1 로 짯지만 그게 음수가 되면 안되기때문에 length를 더하고 똑같이 나눈 나머지를 사용함
length를 더한건 음수의 인덱스 어차피 4개요소기때문에 +5로 사용해도 괜찮지만
그냥 length 사용해서 쓰는게 적합함.
마찬가지로 3 2 1 0 3 2 1 0 유지됨.

ex) 
*/
