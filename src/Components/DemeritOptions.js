const DemeritOptions = () => (
  <select id="article-select" className="select" defaultValue={'DEFAULT'}>
    <option value="DEFAULT" disabled>
      --Please choose an option--
    </option>
    <optgroup label="1조 교복, 머리, 신발, 실내화">
      <option value="미착용 (등교 및 외출시) 2점">
        1조 1항. 미착용 (등교 및 외출시) 2점
      </option>
      <option value="사복, 체육복, 후드집업 2점">
        1조 2항. 사복, 체육복, 후드집업 2점
      </option>
      <option value="양말 미착용 2점">1조 3항. 양말 미착용 2점</option>
      <option value="속바지 길이 2점">1조 4항. 속바지 길이 2점</option>
      <option value="과하게 비치는 티, 속옷 2점">
        1조 5항. 과하게 비치는 티, 속옷 2점
      </option>
      <option value="학생증 미착용, 스티커 붙임 2점">
        1조 6항. 학생증 미착용, 스티커 붙임 2점
      </option>
      <option value="손톱 길이 1점">1조 7항. 손톱 길이 1점</option>
      <option value="머리 길이 2점">1조 8항. 머리 길이 2점</option>
      <option value="염색, 파마, 다운펌, 화장 8점">
        1조 9항. 염색, 파마, 다운펌, 화장 8점
      </option>
      <option value="내빈용 슬리퍼 사용 1점">
        1조 10항. 내빈용 슬리퍼 사용 1점
      </option>
      <option value="교외에서 슬리퍼 사용 1점">
        1조 11항. 교외에서 슬리퍼 사용 1점
      </option>
      <option value="교내에서 실내화 미착용 1점">
        1조 12항. 교내에서 실내화 미착용 1점
      </option>
      <option value="슬리퍼, 크록스 사용 1점">
        1조 13항. 슬리퍼, 크록스 사용 1점
      </option>
      <option value="마스크 미착용 1점">
        1조 14항. 마스크 미착용 (Covid-19) 1점*
      </option>
    </optgroup>
    <optgroup label="2조 정리, 질서">
      <option value="사물함 상태 2점">2조 1항. 사물함 상태 2점</option>
      <option value="책상과 의자 상태 2점">
        2조 2항. 책상과 의자 상태 2점
      </option>
      <option value="식당, 식탁, 뒷정리 안함 2점">
        2조 3항. 식당, 식탁, 뒷정리 안함 2점
      </option>
      <option value="신발장 정리 1점">2조 4항. 신발장 정리 1점</option>
      <option value="복도 식당내에서 뛰는 행동 1점">
        2조 5항. 복도 식당내에서 뛰는 행동 1점
      </option>
      <option value="복도 우측 통행 위반 (5m) 1점">
        2조 6항. 복도 우측 통행 위반 (5m) 1점
      </option>
      <option value="복도 소란 1점">2조 7항. 복도 소란 1점</option>
      <option value="공공장소에서 양치질 1점">
        2조 8항. 공공장소에서 양치질 1점
      </option>
      <option value="청소 (학교, 야자시간) 안함 2점">
        2조 9항. 청소 (학교, 야자시간) 안함 2점
      </option>
      <option value="차량질서 소란 3점">2조 10항. 차량질서 소란 3점</option>
      <option value="아침 기도회 방해 1점">
        2조 11항. 아침 기도회 방해 1점
      </option>
      <option value="교실 문단속, 전등 소등 안될시 반 전체 벌점 1점">
        2조 12항. 교실 문단속, 전등 소등 안될시 반 전체 벌점 1점
      </option>
      <option value="피아노실 창문 열어두고 나가지 않기 1점">
        2조 13항. 피아노실 창문 열어두고 나가지 않기 1점
      </option>
    </optgroup>
    <optgroup label="3조 품행, 품위">
      <option value="폭력행위 징계위원회 징위">
        3조 1항. 폭력행위 징계위원회 징위
      </option>
      <option value="이성교제 징계위원회 징위">
        3조 2항. 이성교제 징계위원회 징위
      </option>
      <option value="기물파손 12점">3조 3항. 기물파손 12점</option>
      <option value="무단외출(일과중) 징계위원회 12점">
        3조 4항. 무단외출(일과중) 징계위원회
      </option>
      <option value="휴대폰 반입 및 사용 12점">
        3조 5항. 휴대폰 반입 및 사용 12점
      </option>
      <option value="도둑질 10점">3조 6항. 도둑질 10점</option>
      <option value="대중가요 듣기, 부르기 5점">
        3조 7항. 대중가요 듣기, 부르기 5점
      </option>
      <option value="욕설, 성적 발언 5점">3조 8항. 욕설, 성적 발언 5점</option>
      <option value="등교 지각 2점">3조 9항. 등교 지각 2점</option>
      <option value="예배, 수업 중 졸기 2점">
        3조 10항. 예배, 수업 중 졸기 2점
      </option>
      <option value="예배 시 복장(체육복, 슬리퍼) 4점">
        3조 11항. 예배 시 복장(체육복, 슬리퍼) 4점
      </option>
      <option value="예배시간에 성경책 미지참 1점">
        3조 12항. 예배시간에 성경책 미지참 1점
      </option>
      <option value="주일새벽예배 불참 5점">
        3조 13항. 주일새벽예배 불참 5점
      </option>
      <option value="이성 선생님과 신체 접촉 3점">
        3조 14항. 이성 선생님과 신체 접촉 3점
      </option>
      <option value="이성간 신체접촉 3점">3조 15항. 이성간 신체접촉 3점</option>
      <option value="흡연, 담배 소지 15점">
        3조 16항. 흡연, 담배 소지 15점
      </option>
      <option value="라이터, 칼날 소지 10점">
        3조 17항. 라이터, 칼날 소지 10점
      </option>
      <option value="연예인, 아이돌 사진 소지 6점">
        3조 18항. 연예인, 아이돌 사진 소지 6점
      </option>
      <option value="등교시 정문 출입위반 5점">
        3조 19항. 등교시 정문 출입위반 5점
      </option>
      <option value="학교 동쪽문, 학교 창문, 기숙사 창문으로 출입 5점">
        3조 20항. 학교 동쪽문, 학교 창문, 기숙사 창문으로 출입 5점
      </option>
      <option value="기록(허가) 없이 기숙사 출입 4점">
        3조 21항. 기록(허가) 없이 기숙사 출입 4점
      </option>
      <option value="교내에서 개인 음식물 섭취 1점">
        3조 22항. 교내에서 개인 음식물 섭취 1점
      </option>
      <option value="MP3, USB 등에 대중가요 5점">
        3조 23항. MP3, USB 등에 대중가요 5점
      </option>
      <option value="학생끼리 매매행위 3점">
        3조 24항. 학생끼리 매매행위 3점
      </option>
      <option value="비속어 사용 3점">3조 25항. 비속어 사용 3점</option>
      <option value="예배시간에 딴짓(낙서 등) 2점">
        3조 26항. 예배시간에 딴짓(낙서 등) 2점
      </option>
      <option value="화장: 정도에 따라 2점 ~ 5점">
        3조 27항. 화장: 정도에 따라 2점 ~ 5점
      </option>
      <option value="드럼, 피아노, 음향시스템 허락 없이 사용 2점">
        3조 28항. 드럼, 피아노, 음향시스템 허락 없이 사용 2점
      </option>
      <option value="수업시간에 무단 이탈시 1점 ~ 5점 (교사만)">
        3조 29항. 수업시간에 무단 이탈시 1점 ~ 5점 (교사만)
      </option>
      <option value="선생님께 예의 없을시 1점 ~ 5점(교사만)">
        3조 30항. 선생님께 예의 없을시 1점 ~ 5점(교사만)
      </option>
      <option
        value="악세사리(팔찌, 반지, 귀걸이, 목걸이, 머리띠) 착용시
                2점"
      >
        3조 31항. 악세사리(팔찌, 반지, 귀걸이, 목걸이, 머리띠) 착용시 2점
      </option>
      <option value="예배시간 중 무단이탈 5점">
        3조 32항. 예배시간 중 무단이탈 5점
      </option>
      <option value="큐티 지각 2점">3조 33항. 큐티 지각 2점</option>
      <option value="싸움(양방 과실비율 적용)">
        3조 34항. 싸움(양방 과실비율 적용)
      </option>
      <option value="남을 헐뜯는 말 퍼뜨리기 3점">
        3조 35항. 남을 헐뜯는 말 퍼뜨리기 3점
      </option>
    </optgroup>
    <optgroup label="4조 품행, 품위">
      <option value="점호 불참, 지각 기상 2점">
        4조 1항. 점호 불참, 지각 기상 2점
      </option>
      <option
        value="야간 자율학습 규정: 지각, 허락없이 나감 음식물, 방해
                2점"
      >
        4조 2항. 야간 자율학습 규정: 지각, 허락없이 나감 음식물, 방해 2점
      </option>
      <option value="무단 외출 징계위원회">
        4조 3항. 무단 외출 징계위원회
      </option>
      <option value="전화 규칙 5점">4조 4항. 전화 규칙 5점</option>
      <option value="밥 안 먹기 5점">4조 5항. 밥 안 먹기 5점</option>
      <option value="간식 규칙" disabled>
        4조 6항. 간식 규칙
      </option>
      <option value="통방 (통방신고자 +3) 3점">
        4조 7항. 통방 (통방신고자 +3) 3점
      </option>
      <option value="주일 새벽 예배 불참 5점">
        4조 8항. 주일 새벽 예배 불참 5점
      </option>
      <option value="금요 예배 후 바로 기숙사로 가지 않음 8점">
        4조 9항. 금요 예배 후 바로 기숙사로 가지 않음 8점
      </option>
      <option value="남의 옷 빌려 입기 3점">
        4조 10항. 남의 옷 빌려 입기 3점
      </option>
      <option value="샤워 시간 규칙 어김 2점">
        4조 11항. 샤워 시간 규칙 어김 2점
      </option>
      <option value="낮에 속옷차림으로 복도 다님 2점">
        4조 12항. 낮에 속옷차림으로 복도 다님 2점
      </option>
      <option value="야간 자율 학습 중 졸음 1점">
        4조 13항. 야간 자율 학습 중 졸음 1점
      </option>
    </optgroup>
    <optgroup label="5조 컴퓨터실">
      <option value="사용 기록표에 기록한 사용목적과 다르게 컴퓨터 사용시 2점 + 7일 금지">
        5조 1항. 사용 기록표에 기록한 사용목적과 다르게 컴퓨터 사용시 2점 + 7일
        금지
      </option>
      <option value="사용기록표를 작성하지 않고 사용시 2점 + 7일 금지">
        5조 2항. 사용기록표를 작성하지 않고 사용시 2점 + 7일 금지
      </option>
      <option value="사용기록표에 하나라도 기록하지 않고 사용시 1점 3일 금지">
        5조 3항. 사용기록표에 하나라도 기록하지 않고 사용시 1점 3일 금지
      </option>
      <option value="유트브, 드라마, 웹툰, 웹드, 웹소설, 불건전한 인터넷 검색, 뉴스, 영어나 학업에 관계 없는 인터넷 사용시 8점 + 14일">
        5조 4항. 유트브, 드라마, 웹툰, 웹드, 웹소설, 불건전한 인터넷 검색, 뉴스,
        영어나 학업에 관계 없는 인터넷 사용시 8점 + 14일
      </option>
      <option
        value="자기 자리가 아닌 다른 자리에서 컴퓨터 사용시 2점 + 7일 금지"
        disabled
      >
        5조 5항. 자기 자리가 아닌 다른 자리에서 컴퓨터 사용시 2점 + 7일 금지
      </option>
      <option value="감독자 없이 컴퓨터 사용시 3점 + 7일 사용금지">
        5조 6항. 감독자 없이 컴퓨터 사용시 3점 + 7일 사용금지
      </option>
      <option value="자리 정돈 안했을 시 1점 + 5일 금지">
        5조 7항. 자리 정돈 안했을 시 1점 + 5일 금지
      </option>
      <option value="컴퓨터 사용 금지 임에도 사용시 7점 + 30일 금지">
        5조 8항. 컴퓨터 사용 금지 임에도 사용시 7점 + 30일 금지
      </option>
      <option value="로그아웃 안했을시 1점 + 7일 금지">
        5조 9항. 로그아웃 안했을시 1점 + 7일 금지
      </option>
      <option value="시끄럽게 떠들면 한번 경고 후 2번째 벌점 2점 + 3일 금지">
        5조 10항. 시끄럽게 떠들면 한번 경고 후 2번째 벌점 2점 + 3일 금지
      </option>
      <option value="기안서 없이 인터넷 사용시 4점 + 7일 금지">
        5조 11항. 기안서 없이 인터넷 사용시 4점 + 7일 금지
      </option>
      <option value="행아웃, 페이스북, 카톡, 등 SNS 5점 + 7일 금지">
        5조 12항. 행아웃, 페이스북, 카톡, 등 SNS 5점 + 7일 금지
      </option>
    </optgroup>
    <optgroup label="6조 노트북, 태블릿 사용">
      <option value="기안서 허가 없이 사용시 10점">
        6조 1항. 기안서 허가 없이 사용시 10점
      </option>
      <option value="허가 받은 사용자 외 다른 사람이 빌려서 사용시 10점">
        6조 2항. 허가 받은 사용자 외 다른 사람이 빌려서 사용시 10점
      </option>
      <option value="학습 외의 목적으로 사용시 5점">
        6조 3항. 학습 외의 목적으로 사용시 5점
      </option>
      <option value="사용후 행정실에 보관 위반 3점">
        6조 4항. 사용후 행정실에 보관 위반 3점
      </option>
    </optgroup>
    <optgroup label="7조 야자 시간 음악실 사용">
      <option value="하루 1교시만 사용 (시험 2주전 기간 제외) 1점">
        7조 1항. 하루 1교시만 사용 (시험 2주전 기간 제외) 1점
      </option>
      <option value="공부에 관련 없는 잡담, 장난 1~3점">
        7조 2항. 공부에 관련 없는 잡담, 장난 1~3점
      </option>
      <option value="야자시간 도중 피아노실 감독자 허락 없을시 2점">
        7조 3항. 야자시간 도중 피아노실 감독자 허락 없을시 2점
      </option>
      <option value="사용 기록표 작성 (감독자 확인 필수) 2점">
        7조 4항. 사용 기록표 작성 (감독자 확인 필수) 2점
      </option>
      <option value="쉬는시간 외 자리 이동시 벌점 (필요시 감독자 허락) 2점">
        7조 5항. 쉬는시간 외 자리 이동시 벌점 (필요시 감독자 허락) 2점
      </option>
      <option value="쓰레기, 자기 물건 놓고 가지 말것 2점">
        7조 6항. 쓰레기, 자기 물건 놓고 가지 말것 2점
      </option>
      <option value="사용후 의자 정리 바르게하지 않을시 1점">
        7조 7항. 사용후 의자 정리 바르게하지 않을시 1점
      </option>
      <option value="음악실 쓰레기통 사용 1점">
        7조 8항. 음악실 쓰레기통 사용 1점
      </option>
    </optgroup>
    <optgroup label="8조 영어일기">
      <option value="하루 안 쓴 경우 1점">8조 1항. 하루 안 쓴 경우 1점</option>
      <option value="2일 ~ 6일 안쓴 경우 (주말) 2점">
        8조 2항. 2일 ~ 6일 안쓴 경우 (주말) 2점
      </option>
      <option value="7일 이상 안쓴 경우 4점">
        8조 3항. 7일 이상 안쓴 경우 4점
      </option>
      <option value="늦게 제출 1점">8조 4항. 늦게 제출 1점</option>
      <option value="찢어서 일기 제출 3점">
        8조 5항. 찢어서 일기 제출 3점
      </option>
    </optgroup>
    <optgroup label="9조 도서관">
      <option value="떠들기 달리기 등 정숙X 1점">
        9조 1항. 떠들기 달리기 등 정숙X 1점
      </option>
      <option value="음식물 반입, 먹지 않기 1점">
        9조 2항. 음식물 반입, 먹지 않기 1점
      </option>
      <option value="자기 자리 정리(지우개 가루, 쓰레기 등)안했을 때 1점">
        9조 3항. 자기 자리 정리(지우개 가루, 쓰레기 등)안했을 때 1점
      </option>
      <option value="타인 이름으로 대출, 다시 빌려줌 2점">
        9조 4항. 타인 이름으로 대출, 다시 빌려줌 2점
      </option>
      <option value="도서 훼손시. 50%이상 훼손할 경우 같은 책으로 배상 1점">
        9조 5항. 도서 훼손시. 50%이상 훼손할 경우 같은 책으로 배상 1점
      </option>
      <option value="도서 분실시 같은 책으로 배상+연체료 2점" disabled>
        9조 6항. 도서 분실시 같은 책으로 배상+연체료 2점
      </option>
      <option value="연체 5~9일 1점">9조 7항. 연체 5~9일 1점</option>
      <option value="연체 10일 이상 2점">9조 8항. 연체 10일 이상 2점</option>
      <option value="도서부 외에 데스크 출입, 물건(컴퓨터 등) 접촉시 2점">
        9조 9항. 도서부 외에 데스크 출입, 물건(컴퓨터 등) 접촉시 2점
      </option>
    </optgroup>
  </select>
);

export default DemeritOptions;
