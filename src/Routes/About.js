/* eslint-disable import/no-anonymous-default-export */
/*global kakao*/
import React, { useEffect } from "react";
import styled from "styled-components";
import Button from "../Components/Button";

const Container = styled.div`
  padding-top: 2.5rem;
`;

const Title = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  padding: 0px 1rem;
  @media (max-width: 770px) {
    justify-content: center;
  }
`;

const SmallText = styled.p``;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  margin: 0px 1rem;
`;

const HelloContainer = styled.div`
  display: flex;
  margin-bottom: 8rem;
  @media (max-width: 770px) {
    justify-content: center;
  }
`;

const HistoryContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  margin-bottom: 4rem;
  grid-gap: 30px;
  @media (min-width: 1024px) {
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: repeat(2, 40vh);
  }
`;

const HistoryBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Year = styled.span`
  text-align: center;
  font-size: 1.6rem;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: 1rem;
  ::after {
    content: "";
    display: block;
    width: 50%;
    border-bottom: 1.5px solid #0095f6;
    margin-top: 5px;
  }
`;

const Text = styled.h1`
  font-size: 1rem;
  font-weight: 500;
  width: 100%;
  margin-bottom: 1rem;
  text-align: center;
`;

const MapContainer = styled.div`
  width: 100%;
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 5rem;
  position: relative;
`;

const Map = styled.div`
  width: 100%;
  height: 90%;
  border-radius: 5px;
`;

const MapLink = styled.a`
  font-size: 0.5rem;
  font-weight: 600;
  width: 6rem;
  :not(:last-child) {
    margin-right: 0.7rem;
  }
  :focus {
    outline: none;
  }
`;

const LinkContainer = styled.div`
  width: fit-content;
  display: flex;
  align-items: center;
  position: absolute;
  padding: 0.7rem;
  border-radius: 5px;
  bottom: 1.9rem;
  right: 0;
  z-index: 99;
  backdrop-filter: saturate(200%) blur(5px);
  background-color: rgba(255, 255, 255, 0.8);
`;

const BossImg = styled.img`
  display: none;
  height: 80%;
  @media (min-width: 770px) {
    display: block;
  }
`;

export default () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    const appKey = process.env.REACT_APP_APP_KEY;
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${appKey}&autoload=false`;
    document.head.appendChild(script);
    script.onload = () => {
      kakao.maps.load(() => {
        let container = document.getElementById("map");
        let options = {
          center: new kakao.maps.LatLng(35.81014688148885, 128.78587925522461),
          level: 4,
        };
        const map = new window.kakao.maps.Map(container, options);
        const markerPosition = new kakao.maps.LatLng(
          35.81014688148885,
          128.78587925522461
        );
        const marker = new kakao.maps.Marker({
          position: markerPosition,
        });
        marker.setMap(map);
      });
    };
  });
  return (
    <Container>
      <Title style={{ marginTop: "3rem" }}>학교장 인사말</Title>
      <HelloContainer>
        <TextContainer>
          <SmallText>
            본교는 학생들이 세계를 무대로 활동하는 지도자들로 세워질 수 있도록
            지도하며, 하나님의 말씀을 기준한 가치관 교육과 창의적이고 자기
            주도적인 학습을 통해 실력을 겸비한 지도자가 되도록 도전하고
            있습니다.
          </SmallText>
          <br />
          <SmallText>
            {" "}
            하나님은 과거 선교사들에 의해 세워진 기독교학교들이 은둔의 나라였던
            이 나라에 교육문예부흥을 일으키고 절망 가운데 있던 민족의 희망이 된
            전통을 이어, 이 민족과 세계의 희망은 다음 세대를 철저한 크리스천
            리더로 세워가는 것뿐이라는 응답과 확신을 주셨습니다.
          </SmallText>
          <br />
          <SmallText>
            {" "}
            우리 학교는 그 동안 국제학교로서의 모든 교육체계와 행정체계를 바로
            세웠고 무엇보다 신앙과 영성에 있어서 탁월한 크리스천 리더로 세우는
            시스템을 갖추었습니다. 이제 제자국제크리스천스쿨은 다음과 같은 세
            가지 과제를 실현해 가고자 합니다.
          </SmallText>
          <br />
          <SmallText>
            1. 철저한 제자훈련을 통해 다니엘과 같은 탁월한 영성을 갖춘 크리스천
            리더로 세우겠습니다.
          </SmallText>
          <br />
          <SmallText>
            2. 쉐마교육을 통해 경건한 자손으로 거룩한 야성을 회복하여 세상을
            변화시키는 크리스천 리더로 세우겠습니다.
          </SmallText>
          <br />
          <SmallText>
            3. 국제학교로서 글로벌 인재로 세워 전세계를 무대로 뛰는 크리스천
            리더로 세우겠습니다.
          </SmallText>
          <br />
          <SmallText>
            “사람이 마음으로 자기의 길을 계획할지라도 그의 걸음을 인도하는 이는
            여호와시니라”(잠언 16:9)는 말씀에 의지하여 이 일을 하나님께서 인도해
            주실 것을 믿습니다.
          </SmallText>
          <br />
          <SmallText>제자국제크리스천스쿨(DICS)</SmallText>
          <SmallText>교장 전희경 교장</SmallText>
        </TextContainer>
        <BossImg src={process.env.PUBLIC_URL + "학교장.png"} alt="Sorry" />
      </HelloContainer>
      <Title>이사장 인사말</Title>
      <HelloContainer>
        <BossImg src={process.env.PUBLIC_URL + "이사장.png"} alt="Sorry" />
        <TextContainer>
          <SmallText>
            아이들을 책임질 수 없는 현실적인 한계에 부딪쳐 있는데도 속에
            하나님이 우리에게 열어주신 것이 바로 제자국제크리스천스쿨
            (DICS)이었습니다. 교회 개척 후 아이들을 하나님 말씀으로 바로
            세워보려는 노력을 기울여보았지만 결코 만만치 않은 현실과 마주하게
            되었습니다. 학교의 교육환경, 학교를 마치자마자 가게 되는 학원교육,
            부모들의 성적지상주의사고, 그리고 일주일에 한 번 뿐인 교회 예배.
          </SmallText>
          <br />{" "}
          <SmallText>
            국가, 사회, 가정, 교회 모두 아이들을 책임질 수 없는 현실적인 한계에
            부딪쳐 있지만 아무 대안 없이 지쳐 있습니다. 하지만 세상은 지금도
            너무나 빠르고 무섭게 변하고 있습니다. 이런 현실 속에서 하나님이
            열어주신 것 바로 제자국제크리스천스쿨 (DICS)입니다. DICS는 현 학교
            교육환경의 한계를 극복하고, 학원으로 이어지는 문제를 차단하며, 성적
            지상주의 사고의 부모들을 신앙으로 세워주며, 하나님 중심의 가치관을
            가진 제자의 삶을 살게 하는 것입니다.
          </SmallText>
          <br />{" "}
          <SmallText>
            DICS을 통해 언어의 한계를 뛰어넘어 세계로 도약하는 아이들을
            길러내며, 다음 세대를 향한 소망의 길이 분명히 있음을 보여주고
            싶습니다.
          </SmallText>
          <br />{" "}
          <SmallText>
            제자국제크리스천스쿨(DICS)은 우리들의 소중한 아이들을 예수님의
            제자로 바로 세워, 세계적인 인재로 준비시켜 민족과 세계 위에 하나님의
            뜻을 이루는 실력 있는 일꾼으로 세우는 곳입니다.
          </SmallText>
          <br />{" "}
          <SmallText>
            본 제자국제크리스천스쿨(DICS) 이 세대와 다음 세대를 위한 하나님의
            응답입니다. 검증된 여러 원어민 선생님 및 국내외의 우수한 선생님들이
            함께 최선을 다하고 있습니다. 이 거룩하고 복 있는 일에 함께 하시길
            바랍니다. 하나님이 당신과 당신의 자녀와 함께 하십니다.
          </SmallText>
          <br />
          <SmallText>제자국제크리스천스쿨 설립자</SmallText>
          <br /> <SmallText>황정환 목사</SmallText>
        </TextContainer>
      </HelloContainer>
      <Title style={{ marginBottom: "5rem" }}>학교 연혁</Title>
      <HistoryContainer>
        <HistoryBox>
          <Year>2007</Year>
          <Text>- GBS공부방 입학식</Text>
          <Text>- 교회 교육관 매입</Text>
        </HistoryBox>
        <HistoryBox>
          <Year>2008</Year>
          <Text>- 예실아미리더스쿨 입학식</Text>
          <Text>- 예실아미유아창의스쿨 입학식</Text>
        </HistoryBox>
        <HistoryBox>
          <Year>2010</Year>
          <Text>- 경산평생교육원 설립</Text>
          <Text>- 교회 및 학교 부지 매입</Text>
          <Text>- 중국 북경로주중학교 자매결연 및 협약 체결</Text>
        </HistoryBox>
        <HistoryBox>
          <Year>2012</Year>
          <Text>- 제 1대 학교장 전희경 사모 취임</Text>
          <Text>- 제자국제크리스천학교 개교</Text>
          <Text>- 중국 뉴브릿지외국어학교 자매 결연</Text>
          <Text>- 제자국제크리스천학교 이전</Text>
        </HistoryBox>
        <HistoryBox>
          <Year>2013</Year>
          <Text>- 미국 Open Door Christian Academy 자매결연</Text>
          <Text>- 제 2대 학교장 이노일 목사 부임</Text>
        </HistoryBox>
        <HistoryBox>
          <Year>2014</Year>
          <Text>- Faith Outreach Academy - MOU 체결</Text>
        </HistoryBox>
        <HistoryBox>
          <Year>2015</Year>
          <Text>- 미국 대학과 협력관계 구축</Text>
          <Text>
            - 제자국제크리스천학교 주관 전국 기독학교 교장단 세미나 개최
          </Text>
          <Text>- 이원령 1대 교감 퇴임식</Text>
        </HistoryBox>
        <HistoryBox>
          <Year>2016</Year>
          <Text>- 제 2대 김기운 교감 부임</Text>
          <Text>- 미국 Central Michigan University - MOU체결</Text>
          <Text>- 미국 Truman State University- MOU 체결</Text>
          <Text>- 제 1회 졸업식</Text>
        </HistoryBox>
        <HistoryBox>
          <Year>2017</Year>
          <Text>- 제 5주년 기념일</Text>
          <Text>- 미국 Dallas Beptist University 유학 설명회</Text>
        </HistoryBox>
        <HistoryBox>
          <Year>2018</Year>
          <Text>- 개교 6주년 기념일 </Text>
          <Text>- 제 3대 전희경 교장 취임</Text>
          <Text>- 제 2회 졸업식</Text>
        </HistoryBox>
      </HistoryContainer>
      <Title style={{ margin: 0 }}>오시는 길</Title>
      <MapContainer>
        <Map id="map"></Map>
        <LinkContainer>
          <MapLink
            href="https://map.kakao.com/link/map/제자국제크리스천스쿨,35.81014688148885,128.78587925522461"
            target="_blank"
            rel="noreferrer"
          >
            <Button text="크게보기" />
          </MapLink>
          <MapLink
            href="https://map.kakao.com/link/to/제자국제크리스천스쿨,35.81014688148885,128.78587925522461"
            target="_blank"
            rel="noreferrer"
          >
            <Button text="길찾기" />
          </MapLink>
          <MapLink
            href="https://map.kakao.com/link/roadview/35.80989213728689,128.78468612959645"
            target="_blank"
            rel="noreferrer"
          >
            <Button text="로드뷰" />
          </MapLink>
        </LinkContainer>
      </MapContainer>
    </Container>
  );
};
