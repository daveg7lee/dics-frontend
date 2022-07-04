const DemeritOptions = () => (
  <select id="article-select" className="select" defaultValue={"DEFAULT"}>
    <option value="DEFAULT" disabled>
      --Please choose an option--
    </option>
    <optgroup label="1조 교복, 머리, 신발, 실내화">
      <option value="1조 1항. 복장 불량 2점">1조 1항. 복장 불량 2점</option>
      <option value="1조 2항. 손톱 길이 규정 위반 1점">
        1조 2항. 손톱 길이 규정 위반 1점
      </option>
      <option value="1조 3항. 머리 길이 규정 위반 2점">
        1조 3항. 머리 길이 규정 위반 2점
      </option>
      <option value="1조 4항. 두발 규정(파마 또는 염색) 위반 8점">
        1조 4항. 두발 규정(파마 또는 염색) 위반 8점
      </option>
      <option value="1조 5항. 화장 규칙 위반 (소지 3점 사용 4점)">
        1조 5항. 화장 규칙 위반 (소지 3점 사용 4점)
      </option>
      <option value="1조 6항. 허락과 기안서 없이 내빈용 슬리퍼 착용 1점">
        1조 6항. 허락과 기안서 없이 내빈용 슬리퍼 착용 1점
      </option>
      <option value="1조 7항. 실내화 규정 위반 1점">
        1조 7항. 실내화 규정 위반 1점
      </option>
      <option value="1조 8항. 실내화 착용 제한 7점">
        1조 8항. 실내화 착용 제한 2점
      </option>
      <option value="1조 9항. 일과 중 슬리퍼, 크록스 착용 1점">
        1조 9항. 일과 중 슬리퍼, 크록스 착용 1점
      </option>
      <option value="1조 10항. 마스크 미착용 5점">
        1조 10항. 마스크 미착용 5점
      </option>
    </optgroup>
    <optgroup label="2조 정리, 질서">
      <option value="2조 1항. 사물함 정리정돈 불량 2점">
        2조 1항. 사물함 정리정돈 불량 2점
      </option>
      <option value="2조 2항. 본인 자리 주변 정리 불량 2점">
        2조 2항. 본인 자리 주변 정리 불량 2점
      </option>
      <option value="2조 3항. 식당 뒷정리 불량 1점">
        2조 3항. 식당 뒷정리 불량 2점
      </option>
      <option value="2조 4항. 신발장 정리 불량 1점">
        2조 4항. 신발장 정리 불량 1점
      </option>
      <option value="2조 5항. 실내 규칙 위반 1점">
        2조 5항. 실내 규칙 위반 1점
      </option>
      <option value="2조 6항. 복도에서 양치 행위 1점">
        2조 6항. 복도에서 양치 행위 1점
      </option>
      <option value="2조 7항. 청소(학교&야자) 불참 2점">
        2조 7항. 청소(학교&야자) 불참 2점
      </option>
      <option value="2조 8항. 차량 질서 위반 및 소란 3점">
        2조 8항. 차량 질서 위반 및 소란 3점
      </option>
      <option value="2조 9항. 아침 기도회 방해 2점">
        2조 9항. 아침 기도회 방해 2점
      </option>
      <option value="2조 10항. 빈 교실 문단속 불량, 미소등, 에어컨 가동 등 환경미화 미흡 시(반 전체) 2점">
        2조 10항. 빈 교실 문단속 불량, 미소등, 에어컨 가동 등 환경미화 미흡
        시(반 전체) 2점
      </option>
      <option value="2조 10항. 쓰레기 무단 투기 2점">
        2조 11항. 쓰레기 무단 투기 2점
      </option>
    </optgroup>
    <optgroup label="3조 품행, 품위">
      <option value="3조 1항 폭력 행위 징위">3조 1항 폭력 행위 징위</option>
      <option value="3조 2항 이성 교제 징위">3조 2항 이성 교제 징위</option>
      <option value="3조 3항 무단 외출 징위">3조 3항 무단 외출 징위</option>
      <option value="3조 4항 무단으로 휴대폰 반입 혹은 사용 징위">
        3조 4항 무단으로 휴대폰 반입 혹은 사용 징위
      </option>
      <option value="3조 5항 도둑질 징위">3조 5항 도둑질 징위</option>
      <option value="3조 6항 흡연 또는 음주 징위">
        3조 6항 흡연 또는 음주 징위
      </option>
      <option value="3조 7항 담배 혹은 라이터 소지 징위">
        3조 7항 담배 혹은 라이터 소지 징위
      </option>
      <option value="3조 8항. 기물 파손 또는 훼손 최대 12점">
        3조 8항. 기물 파손 또는 훼손 최대 12점
      </option>
      <option value="3조 9항. 언어 사용 불량 5점">
        3조 9항. 언어 사용 불량 5점
      </option>
      <option value="3조 10항. 등교 및 예배 지각 2점">
        3조 10항. 등교 및 예배 지각 2점
      </option>
      <option value="3조 11항. 예배 또는 수업 중 졸음 1점">
        3조 11항. 예배 또는 수업 중 졸음 1점
      </option>
      <option value="3조 12항. 예배 시 복장 불량(체육복, 슬리퍼 착용) 3점">
        3조 12항. 예배 시 복장 불량(체육복, 슬리퍼 착용) 3점
      </option>
      <option value="3조 13항. 예배시간 성경책 미지참 5점">
        3조 13항. 예배시간 성경책 미지참 5점
      </option>
      <option value="3조 14항. 예배시간 중 무단이탈 5점">
        3조 14항. 예배시간 중 무단이탈 5점
      </option>
      <option value="3조 15항. 예배시간 태도 불량 2점">
        3조 15항. 예배시간 태도 불량 2점
      </option>
      <option value="3조 16항. 이성 선생님과 신체 접촉 5점">
        3조 16항. 이성 선생님 및 이성간 신체 접촉 5점
      </option>
      <option value="3조 17항. 연예인 사진 소지 6점">
        3조 17항. 연예인 사진 소지 6점
      </option>
      <option value="3조 18항. 교내 출입 규칙 위반 최소 5점">
        3조 18항. 교내 출입 규칙 위반 최소 5점
      </option>
      <option value="3조 19항. 일과시간 중 점심시간 외 카페 사용 2점">
        3조 19항. 일과시간 중 점심시간 외 카페 사용 2점
      </option>
      <option value="3조 20항. 담당 선생님 허락과 기록 없이 기숙사 출입 4점">
        3조 20항. 담당 선생님 허락과 기록 없이 기숙사 출입 4점
      </option>
      <option value="3조 21항. 교내에서 개인 음식물 섭취 2점">
        3조 21항. 교내에서 개인 음식물 섭취 2점
      </option>
      <option value="3조 22항. 대중가요 소지 또는 부름 소지 10점 기타 7점">
        3조 22항. 대중가요 소지 또는 부름 소지 10점 기타 7점
      </option>
      <option value="3조 23항. 학생 간 매매행위 3점">
        3조 23항. 학생 간 매매행위 3점
      </option>
      <option value="3조 24항. 악기 및 음향시스템 담당자 허락 없이 사용 5점">
        3조 24항. 악기 및 음향시스템 담당자 허락 없이 사용 5점
      </option>
      <option value="3조 25항. 수업 태도 불량 교사한정 최대 5점">
        3조 25항. 수업 태도 불량 교사한정 최대 5점
      </option>
      <option value="3조 26항. 수업시간 및 야간자율학습시간 무단이탈 3점">
        3조 26항. 수업시간 및 야간자율학습시간 무단이탈 3점
      </option>
      <option value="3조 27항. 액세서리(팔찌, 반지, 귀걸이, 목걸이, 머리띠) 착용 시 3점 소지시 2점">
        3조 27항. 액세서리(팔찌, 반지, 귀걸이, 목걸이, 머리띠) 착용 시 3점
        소지시 2점
      </option>
      <option value="3조 28항. 큐티 지각 2점">3조 28항. 큐티 지각 2점</option>
      <option value="3조 29항. 반찬 남기는 행위 1점">
        3조 29항. 반찬 남기는 행위 1점
      </option>
      <option value="3조 30항. 편식, 반찬 안 받는 행위 1점">
        3조 30항. 편식, 반찬 안 받는 행위 1점
      </option>
      <option value="3조 31항. 잔반 검사 안 하고 가기 3점">
        3조 31항. 잔반 검사 안 하고 가기 3점
      </option>
      <option value="3조 32항. 통반 10점">3조 32항. 통반 10점</option>
      <option value="3조 33항. 남녀가 협소 또는 밀폐된 공간(ex:피아노실 방)에 단둘이 있는 행위 15점">
        3조 33항. 남녀가 협소 또는 밀폐된 공간(ex:피아노실 방)에 단둘이 있는
        행위 15점
      </option>
      <option value="3조 34항. 방관 및 방조 최대 8점">
        3조 34항. 방관 및 방조 최대 8점
      </option>
    </optgroup>
    <optgroup label="4조 기숙사 생활">
      <option value="4조 1항. 점호 불참 또는 지각 2점">
        4조 1항. 점호 불참 또는 지각 2점
      </option>
      <option value="4조 2항. 기상&취침시간 위반 2점">
        4조 2항. 기상&취침시간 위반 2점
      </option>
      <option value="4조 3항. 야간자율학습 또는 심야 자율학습 규정 위반">
        4조 3항. 야간자율학습 또는 심야 자율학습 규정 위반
      </option>
      <option value="4조 4항. 전화 규칙 5점">4조 4항. 전화 규칙 3점</option>
      <option value="4조 5항. 무단 전화 5점">4조 5항. 무단 전화 5점</option>
      <option value="4조 6항. 무단 결식 3점" disabled>
        4조 6항. 무단 결식 3점
      </option>
      <option value="4조 7항. 결식 시 해당일자 동안 간식 및 외부음식 취식 금지 3점">
        4조 7항. 결식 시 해당일자 동안 간식 및 외부음식 취식 금지 3점
      </option>
      <option value="4조 8항. 라면 취식은 식사 1시간 전후 모두 금지 3점">
        4조 8항. 라면 취식은 식사 1시간 전후 모두 금지 3점
      </option>
      <option value="4조 9항. 무단으로 배달음식 주문 10점">
        4조 9항. 무단으로 배달음식 주문 10점
      </option>
      <option value="4조 10항. 외부음식 관련 규정 위반 2점">
        4조 10항. 외부음식 관련 규정 위반 2점
      </option>
      <option value="4조 11항. 통방 3점">4조 11항. 통방 3점</option>
      <option value="4조 12항. 주일 새벽예배 불참 5점">
        4조 12항. 주일 새벽예배 불참 5점
      </option>
      <option value="4조 14항. 타인 옷 또는 신발 빌려 착용 3점">
        4조 14항. 타인 옷 또는 신발 빌려 착용 3점
      </option>
      <option value="4조 15항. 사워시간 규칙 위반 2점">
        4조 15항. 사워시간 규칙 위반 2점
      </option>
      <option value="4조 16항. 기숙사 내 속옷 차림으로 복도통행 2점">
        4조 16항. 기숙사 내 속옷 차림으로 복도통행 2점
      </option>
      <option value="4조 17항. 미인가 도서 소지 3점">
        4조 17항. 미인가 도서 소지 3점
      </option>
      <option value="4조 18항. 사생회원 외 기숙사 내 에어컨 및 난방 가동 4점">
        4조 18항. 사생회원 외 기숙사 내 에어컨 및 난방 가동 4점
      </option>
      <option value="4조 19항. 기숙사 내 위험물건 소지 5점">
        4조 19항. 기숙사 내 위험물건 소지 5점
      </option>
    </optgroup>
    <optgroup label="5조 컴퓨터실">
      <option value="5조 1항. 사용 기록표에 기록한 사용목적과 다르게 컴퓨터 사용시 2점 + 5일 금지">
        5조 1항. 사용 기록표에 기록한 사용목적과 다르게 컴퓨터 사용시 2점 + 5일
        금지
      </option>
      <option value="5조 2항. 사용기록표를 작성하지 않고 사용시 2점 + 2일 금지">
        5조 2항. 사용기록표를 작성하지 않고 사용시 2점 + 2일 금지
      </option>
      <option value="5조 3항. 사용기록표에 하나라도 기록하지 않고 사용시 1점">
        5조 3항. 사용기록표에 하나라도 기록하지 않고 사용시 1점
      </option>
      <option value="5조 4항. 유트브, 드라마, 웹툰, 웹드, 웹소설, 불건전한 인터넷 검색, 뉴스, 영어나 학업에 관계 없는 인터넷 사용시 8점 + 14일">
        5조 4항. 유트브, 드라마, 웹툰, 웹드, 웹소설, 불건전한 인터넷 검색, 뉴스,
        영어나 학업에 관계 없는 인터넷 사용시 8점 + 14일
      </option>
      <option value="5조 5항. 감독자 컴퓨터 허락 없이 사용 3점">
        5조 5항. 감독자 컴퓨터 허락 없이 사용 3점
      </option>
      <option value="5조 6항. 감독자 없이 컴퓨터 사용시 3점 + 7일 사용금지">
        5조 6항. 감독자 없이 컴퓨터 사용시 5점 + 7일 사용금지
      </option>
      <option value="5조 7항. 자리 정돈 미흡 2점">
        5조 7항. 자리 정돈 미흡 2점
      </option>
      <option value="5조 8항. 소란 피울 시(1차 경고) 2점">
        5조 8항. 소란 피울 시(1차 경고) 2점
      </option>
      <option value="5조 9항. 기안서 없이 인터넷 사용 5점 + 7일 금지">
        5조 9항. 기안서 없이 인터넷 사용 5점 + 7일 금지
      </option>
      <option value="5조 10항. 외부인과 메일 및 행아웃 했을 시 7점 + 7일 금지">
        5조 10항. 외부인과 메일 및 행아웃 했을 시 7점 + 7일 금지
      </option>
      <option value="5조 11항. 물 외의 음식물(음료, 과자 등) 섭취 2점">
        5조 11항. 물 외의 음식물(음료, 과자 등) 섭취 2점
      </option>
      <option value="5조 12항. 사용기록표 글씨 알아보지 못하게 작성 1점">
        5조 12항. 사용기록표 글씨 알아보지 못하게 작성 1점
      </option>
      <option value="5조 13항. 교실 내 교사 컴퓨터 무단 사용">
        5조 13항. 교실 내 교사 컴퓨터 무단 사용
      </option>
    </optgroup>
    <optgroup label="6조 노트북 사용">
      <option value="6조 1항. 기안서 허가 없이 사용시 10점">
        6조 1항. 기안서 허가 없이 사용시 10점
      </option>
      <option value="6조 2항. 허가받은 사용자 외 타인이 빌려 사용 10점">
        6조 2항. 허가받은 사용자 외 타인이 빌려 사용 10점
      </option>
      <option value="학습 외의 목적으로 사용시 8점">
        6조 3항. 학습 외의 목적으로 사용시 8점
      </option>
      <option value="6조 4항. 사용 시간 미준수 4점">
        6조 4항. 사용 시간 미준수 4점
      </option>
      <option value="6조 5항. 사용 후 교장실에 미반납 4점">
        6조 5항. 사용 후 교장실에 미반납 4점
      </option>
      <option value="6조 6항. 지정된 장소 외의 공간에서 노트북 사용 4점">
        6조 6항. 지정된 장소 외의 공간에서 노트북 사용 4점
      </option>
    </optgroup>
    <optgroup label="7조 야자시간 피아노실 사용">
      <option value="하루 1개 교시만 사용 1점">
        7조 1항. 하루 1개 교시만 사용 1점
      </option>
      <option value="공부에 관련 없는 잡담, 장난 3점">
        7조 2항. 공부에 관련 없는 잡담, 장난 3점
      </option>
      <option value="사용기록표 미작성 (감독자 확인 필수) 2점 + 7일 금지">
        7조 3항. 사용기록표 미작성 (감독자 확인 필수) 2점 + 7일 금지
      </option>
      <option value="7조 4항. 쉬는 시간 외 자리 이동 시 (필요하면 감독자 허락) 2점">
        7조 4항. 쉬는 시간 외 자리 이동 시 (필요하면 감독자 허락) 2점
      </option>
      <option value="7조 5항. 사용 후 정리정돈 불량 2점">
        7조 5항. 사용 후 정리정돈 불량 2점
      </option>
    </optgroup>
    <optgroup label="8조 영어일기">
      <option value="8조 1항. 미작성 1점">8조 1항. 미작성 1점</option>
      <option value="8조 2항. 늦게 제출 1점">8조 2항. 늦게 제출 1점</option>
      <option value="8조 3항. 찢어 붙이기 3점">8조 3항. 찢어 붙이기 3점</option>
    </optgroup>
    <optgroup label="9조 도서관">
      <option value="9조 1항. 떠들기, 달리기 등 정숙 위반 1점">
        9조 1항. 떠들기, 달리기 등 정숙 위반 1점
      </option>
      <option value="9조 2항. 음식물 반입, 먹지 않기 1점">
        9조 2항. 음식물 반입, 먹지 않기 1점
      </option>
      <option value="9조 3항. 자기 자리 정리(지우개 가루, 쓰레기 등) 미흡 1점">
        9조 3항. 자기 자리 정리(지우개 가루, 쓰레기 등) 미흡 1점
      </option>
      <option value="9조 4항. 소파에 눕거나 자지 않기 1점">
        9조 4항. 소파에 눕거나 자지 않기 1점
      </option>
      <option value="9조 5항. 타인 이름으로 대출, 다시 빌려줌 2점">
        9조 5항. 타인 이름으로 대출, 다시 빌려줌 2점
      </option>
      <option value="9조 6항. 도서 훼손 시 50% 이상 훼손할 경우 같은 책으로 배상 4점">
        9조 6항. 도서 훼손 시 50% 이상 훼손할 경우 같은 책으로 배상 4점
      </option>
      <option value="9조 7항. 도서 분실 시 같은 책으로 배상+연체료 2점">
        9조 7항. 도서 분실 시 같은 책으로 배상+연체료 2점
      </option>
      <option value="9조 8항. 연체 4일차 / 7일차 / 10일차 ... 3일 간격으로 벌점 1점씩 추가 (4일 1점 7일 2점 10일 3점)">
        9조 8항. 연체 4일차 / 7일차 / 10일차 ... 3일 간격으로 벌점 1점씩 추가
        (4일 1점 7일 2점 10일 3점)
      </option>
      <option value="9조 9항. 도서부 외에 데스크 출입, 물건(컴퓨터 등) 접촉 시 2점">
        9조 9항. 도서부 외에 데스크 출입, 물건(컴퓨터 등) 접촉 시 2점
      </option>
    </optgroup>
    <optgroup label="10조 방송실">
      <option value="10조 1항. 방송부 외 방송실 출입 시 2점">
        10조 1항. 방송부 외 방송실 출입 시 2점
      </option>
      <option value="10조 2항. 방송실 물품 무단 사용 5점">
        10조 2항. 방송실 물품 무단 사용 5점
      </option>
      <option value="10조 3항. 방송실 컴퓨터 사용 2점">
        10조 3항. 방송실 컴퓨터 사용 2점
      </option>
      <option value="10조 4항. 방송실 사용 시간 위반 6점">
        10조 4항. 방송실 사용 시간 위반 6점
      </option>
      <option value="10조 5항. 방송실 내 불필요 물품 휴대 또는 반입 2점">
        10조 5항. 방송실 내 불필요 물품 휴대 또는 반입 2점
      </option>
    </optgroup>
    <optgroup label="11조 부정행위">
      <option value="11조 1항. 표절 10점">11조 1항. 표절 10점</option>
      <option value="11조 2항. 커닝 10점 + 재시험">
        10조 2항. 커닝 10점 + 재시험
      </option>
    </optgroup>
    <optgroup label="14조 기타">
      <option value="14조 1항. 기안서 미작성 및 미결제 시 각 3점">
        14조 1항. 기안서 미작성 및 미결제 시 각 3점
      </option>
    </optgroup>
  </select>
);

export default DemeritOptions;
