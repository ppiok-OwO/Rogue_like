# <font color="#de7802">로그라이크 게임 - Lucky Draw!</font>

## <font color="#00b050">게임 소개</font>

### <font color="#00b0f0">스토리</font></br>

마왕이 부활하고 타락의 기운이 감도는 이 세계. 모두가 영웅의 탄생을 바라고 있다. 우리의 주인공은 알코올 중독에 노름을 즐기는 소매치기범. 과연 영웅이 될 수 있을까?

### <font color="#00b0f0">컨셉</font></br>

몬스터를 무찌르면 카드 보상을 얻을 수 있습니다. 보상으로 얻은 카드들로 덱빌딩을 해봅시다. 궁극적으론 마왕을 무찌르는 게 게임의 목적이니까요! 스테이지가 오를 수록 올라가는 카드와의 유대감! 존버는 승리한다?!

## <font color="#00b050">게임 내 기능</font>

### <font color="#00b0f0">축복</font>

축복을 선택해서 직업마다 특화된 덱을 짤 수 있습니다.</br>

- **가시 수호자** : 기본 가시데미지를 20 얻습니다. 방어도를 얻을 때 현재 가시 데미지 수치의 절반만큼을 방어도로 획득합니다. 방어도를 가지고 있을 때에만 공격자에게 가시 데미지를 줄 수 있습니다.
- **광전사** : 연속으로 공격할 확률을 얻습니다. 이때, 최대 공격 횟수에 따라 여러 번 공격할 수 있습니다. 카드를 쓸 때마다 체력을 5씩 잃지만 연속 공격 확률이 10%p 증가하거나 최대 공격 횟수가 1씩 증가합니다. 가한 피해만큼 흡혈할 수 있습니다.
- **화염 투사** : 카드가 가진 화염 데미지만큼 적에게 점화를 걸 수 있습니다. 화염 데미지는 화염투사만이 적에게 가할 수 있습니다. 그 피해량만큼 적에게 점화를 걸 수 있습니다. 점화 스택은 턴이 끝날 때마다 1씩 감소합니다. 카드를 통해 HP를 회복할 때 직접 가한 화염 데미지만큼 추가로 회복할 수 있으며, 회복한 체력만큼 점화 스택이 증가합니다.
-

### <font color="#00b0f0">엘리트 스테이지와 특별한 보상</font>

3번째, 6번째, 9번째 스테이지에서는 **엘리트 몬스터**와 대결하게 됩니다. 더 강한 적과 마주해서 싸워보세요. 어쩌면 특별한 보상이 있을지도...!

### <font color="#00b0f0">여관에서 만나볼 수 있는 다양한 기능</font>

용사에게도 휴식은 중요하겠죠. 매 스테이지가 종료될 때마다 플레이어는 여관에 방문하게 됩니다. 몬스터를 무찔러 얻은 골드로 **카드를 구매**해보세요! 같은 카드가 세 장 있으시다면 **업그레이드**도 가능해요!😉

# <font color="#de7802">개발 체크리스트</font>

- [x] 새로운 게임 시작 로직 ✅ 2024-11-07
- [x] 단순 행동 패턴 2가지 ✅ 2024-11-08
- [x] 클래스 문법 활용, 플레이어 스탯 관리 ✅ 2024-11-08
- [x] 간단한 전투 로직 ✅ 2024-11-08
- [x] 스테이지 진행에 따른 이벤트 관리 ✅ 2024-11-08
- [x] 확률 로직 적용 ✅ 2024-11-08
- [x] 복잡한 행동 패턴 구현 ✅ 2024-11-09
- [x] 새로운 기능 구현 ✅ 2024-11-08
- [ ] 전체적인 코드 흐름
- [x] TIL에 트러블 슈팅 ✅ 2024-11-11
- [x] 업적 확인하기 로직(특정 조건을 만족하면 업적란을 채워주기?) ✅ 2024-11-11
- [x] 옵션 메뉴 로직(~~난이도~~, 사운드, 상태창 간소화 기능)
- [x] 게임 종료 로직 ✅ 2024-11-11
- [x] 인트로 구간에 게임 시나리오를 넣는 게 좋겠다. setTimeout으로 구현해보기 ✅ 2024-11-08
- [x] 몬스터가 카드를 드랍할 때 카드를 선택할 수 있게끔 만들기 ✅ 2024-11-08
- [x] 카드의 종류를 더 많이 ✅ 2024-11-08
- [x] 인터페이스 및 선택지 비주얼 향상('see+번호'를 입력할 시 카드 상세보기) ✅ 2024-11-09
- [x] cardPower로직을 어디에 넣어야 버그가 안 생길지 고민해보기 ✅ 2024-11-08
- [ ] ~~npm을 이용해서 UI 향상시키기 (blessed, inquirer, Terminal-Kit)~~
- [x] 재시작 선택지 ✅ 2024-11-11

## 만들어야 할 함수/메소드

- [x] 카드 상세보기 메소드(카드 클래스) ✅ 2024-11-09
- [x] 작성한 스크립트가 setTimeout으로 한 문단씩 올라가는 함수 ✅ 2024-11-09
- [ ] ~~esc를 누르면 메뉴 선택지가 나오도록~~
- [x] 선택지를 인터페이스창으로 만들어 볼까… ✅ 2024-11-11
- [x] 몬스터를 더 다양하게. 몬스터의 등급이 카드 등급에 영향을 미치게. ✅ 2024-11-12
- [ ] 사운드 넣기? ← 된다??!!!
- [x] 죽었을 때 다른 화면으로
- [ ] 세이브 기능
- [x] 상점 기능 ✅ 2024-11-13
- [ ] 전투 디스플레이에 현재 난이도
- [ ] 여관에서 hp 회복

## 고쳐야 하는 버그

- [x] 카드 상세보기를 이용하면 몬스터의 체력이 초기화되는 것 같다. ✅ 2024-11-08
