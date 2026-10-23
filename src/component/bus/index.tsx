import { Map } from "./map"
import BusIcon from "../../icons/bus-icon.svg?react"
import { LazyDiv } from "../lazyDiv"

/**
 * 대절버스 탑승 위치와 정보를 표시하는 컴포넌트입니다.
 *
 * @returns {JSX.Element} 대절버스 안내 섹션
 */
export const Bus = () => {
  return (
    <>
      {/* 지도 및 주소 섹션 */}
      <LazyDiv className="card location">
        <h2 className="english">Charter Bus</h2>
        <div className="addr">
          대절버스 탑승 안내
          {/* 💡 아래 탑승 장소 상세 주소를 수정하세요 💡 */}
          <div className="detail">전북 전주시 덕진구 기린대로 1055
          <br />
          (전주월드컵경기장 P10 주차장)
          </div>
        </div>
        <Map />
      </LazyDiv>

      {/* 대절버스 상세 정보 안내 섹션 */}
      <LazyDiv className="card location">
        <div className="location-info">
          <div className="transportation-icon-wrapper">
            <BusIcon className="transportation-icon" />
          </div>
          <div className="heading"> 💡대절버스💡 <strong>(전주 ↔ 평택)</strong> </div>
          <div />
          <div className="content">
            <b>출발 시간</b>
            <br />
            {/* 💡 아래 출발 시간을 수정하세요 💡 */}
            2027년 1월 23일(토) 오후 1시 30분
            <br />
            <br />
            <b>탑승 장소</b>
            <br />
            {/* 💡 아래 탑승 장소를 수정하세요 💡 */}
            전주월드컵경기장 P10 주차장
          </div>
          <div />
          <div className="content">
            <b>버스 안내</b>
            <br />
            {/* 💡 아래 인솔자 정보를 수정하세요 💡 */}
            김은진 (신부 / 010-2332-9226)
            <br />
            <span style={{ letterSpacing: "-1px", fontSize: "0.85rem" }}>
              📌 탑승하실 분은 신부에게 미리 연락 부탁드립니다.
              <br />
              📌 원활한 이동을 위해 출발 10분 전까지 탑승해 주시기 바랍니다.
            </span>
            <br />
          </div>
        </div>
      </LazyDiv>
    </>
  )
}