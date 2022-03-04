# 실행방법

# 1. repository clone 
# 2. yarn install
# 3. yarn start:staging


# 혹은 아래 사이트에서 기능을 확인할 수 있습니다.
http://datagridprac.s3-website.ap-northeast-2.amazonaws.com/

# 테이블 라이브러리와 차트 라이브러리를 사용해 만든 데이터 시각화 프로젝트 입니다.

![image](https://user-images.githubusercontent.com/76252074/155842578-6161ac8b-4c35-4630-9650-6963e372f16c.png)

# 필터 클릭 시 차트에 선택한 필터의 데이터가 수치화돼 보입니다.
![image](https://user-images.githubusercontent.com/76252074/155842619-77c85467-7b42-428c-9bc7-9f8db0c7e13c.png)
![image](https://user-images.githubusercontent.com/76252074/155842651-039437d2-d0d7-4d2b-8846-99f6c046ba93.png)


# 데이터 그리드는 페이징 처리, 컬럼 솔팅 기능 등이 있습니다.
![image](https://user-images.githubusercontent.com/76252074/155842665-1d86975c-3247-479c-a0ca-de867bb52f33.png)

# 돋보기 아이콘 클릭 시 해당 환자의 상세 데이터를 볼 수 있는 모달이 생성됩니다.
![image](https://user-images.githubusercontent.com/76252074/155842750-80f73148-ea3b-44e2-bc56-9afc042e8f9d.png)

# 추후 모달대신 데이터 row아래 공간이 확장되어 상세 데이터를 볼 수 있는 기능을 추가 할 예정입니다. (MUI DataGrid 라이브러리 공부 필요)
![image](https://user-images.githubusercontent.com/76252074/155842681-26f9b1e7-5c00-49b0-a095-63d82d0b07e7.png)


# 우선으로 두었던 것
실무에서 급하게 관리 페이지가 필요하다는 상황이라고 가정하고 구동가능한 툴은 만든다는 것에 초점을 두었습니다.

# 아쉬운 점
1. 한정된 시간안에 동작하는 페이지를 만들다 보니 코드의 질이 좋지 못했습니다. 
앞으로 두고두고 보일러플레이트로 사용해도 괜찮은 프로젝트라고 생각하며 추후 리팩토링을 할 예정입니다.

2. 좀 더 미관상으로 예쁘고 가독성이 좋은 차트 라이브러리를 사용하지 못한점 
가장 구현이 간단해 보이는 차트라이브를 사용했으므로 차트부분이 아쉽습니다.

# 개선할 점
- 그래프의 처리가 과제의 의도와 다르고, 그래프가 필터의 변화를 감지하지 못했습니다.
- 테이블의 Row 를 클릭 시 상세 정보 fetch 는 수행하지만 모달은 활성화되지 않았습니다.
- 의존성이 없는 함수 및 상수 값들은 파일을 따로 작성하여 코드 가독성을 높이면 더 좋을 것 같습니다.
