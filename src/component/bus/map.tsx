import { useEffect, useState, useRef } from "react"
import { useKakao, useNaver } from "../store"
import nmapIcon from "../../icons/nmap-icon.png"
import knaviIcon from "../../icons/knavi-icon.png"
import tmapIcon from "../../icons/tmap-icon.png"
import LockIcon from "../../icons/lock-icon.svg?react"
import UnlockIcon from "../../icons/unlock-icon.svg?react"
import { NAVER_MAP_CLIENT_ID } from "../../env"

// ==========================================
// 💡 대절버스 탑승 장소 좌표 및 ID (수정 필수) 💡
// ==========================================
const BUS_LOCATION_NAME = "전주월드컵경기장" 
const BUS_POSITION = [127.064436, 35.868228] // [경도(lng), 위도(lat)]
const BUS_NMAP_PLACE_ID = "1189713430" // 네이버 지도 장소 ID (URL 끝 숫자)
const BUS_KMAP_PLACE_ID = "18119347" // 카카오맵 장소 ID (URL 끝 숫자)
// ==========================================

/**
 * 대절버스 탑승용 지도를 표시하는 컴포넌트입니다.
 */
export const Map = () => {
  return NAVER_MAP_CLIENT_ID ? <NaverMap /> : <div>Map is not available</div>
}

const NaverMap = () => {
  const naver = useNaver()
  const kakao = useKakao()
  const ref = useRef<HTMLDivElement>(null)

  const [locked, setLocked] = useState(true)
  const [showLockMessage, setShowLockMessage] = useState(false)
  const lockMessageTimeout = useRef<number | null>(null)

  const checkDevice = () => {
    const userAgent = window.navigator.userAgent
    if (userAgent.match(/(iPhone|iPod|iPad)/)) {
      return "ios"
    } else if (userAgent.match(/(Android)/)) {
      return "android"
    } else {
      return "other"
    }
  }

  useEffect(() => {
    if (naver) {
      const map = new naver.maps.Map(ref.current, {
        center: new naver.maps.LatLng(BUS_POSITION[1], BUS_POSITION[0]),
        zoom: 17,
      })

      new naver.maps.Marker({
        position: new naver.maps.LatLng(BUS_POSITION[1], BUS_POSITION[0]),
        map,
      })

      return () => {
        map.destroy()
      }
    }
  }, [naver])

  return (
    <>
      <div className="map-wrapper">
        {locked && (
          <div
            className="lock"
            onTouchStart={() => {
              setShowLockMessage(true)
              if (lockMessageTimeout.current !== null) {
                clearTimeout(lockMessageTimeout.current)
              }
              lockMessageTimeout.current = window.setTimeout(
                () => setShowLockMessage(false),
                3000,
              )
            }}
            onMouseDown={() => {
              setShowLockMessage(true)
              if (lockMessageTimeout.current !== null) {
                clearTimeout(lockMessageTimeout.current)
              }
              lockMessageTimeout.current = window.setTimeout(
                () => setShowLockMessage(false),
                3000,
              )
            }}
          >
            {showLockMessage && (
              <div className="lock-message">
                <LockIcon /> 자물쇠 버튼을 눌러
                <br />
                터치 잠금 해제 후 확대 및 이동해 주세요.
              </div>
            )}
          </div>
        )}

        <button
          className={"lock-button" + (locked ? "" : " unlocked")}
          onClick={() => {
            if (lockMessageTimeout.current !== null) {
              clearTimeout(lockMessageTimeout.current)
            }
            setShowLockMessage(false)
            setLocked((locked) => !locked)
          }}
        >
          {locked ? <LockIcon /> : <UnlockIcon />}
        </button>

        <div className="map-inner" ref={ref}></div>
      </div>

      <div className="navigation">
        <button
          onClick={() => {
            switch (checkDevice()) {
              case "ios":
              case "android":
                window.open(`nmap://place?id=${BUS_NMAP_PLACE_ID}`, "_self")
                break
              default:
                window.open(
                  `https://map.naver.com/p/entry/place/${BUS_NMAP_PLACE_ID}`,
                  "_blank",
                )
                break
            }
          }}
        >
          <img src={nmapIcon} alt="naver-map-icon" />
          네이버 지도
        </button>

        <button
          onClick={() => {
            window.open(
              `https://map.kakao.com/link/map/${BUS_KMAP_PLACE_ID}`,
              "_blank",
            )
          }}
        >
          <img src={knaviIcon} alt="kakao-navi-icon" />
          카카오 지도
        </button>

        <button
          onClick={() => {
            switch (checkDevice()) {
              case "ios":
              case "android": {
                const params = new URLSearchParams({
                  goalx: BUS_POSITION[0].toString(),
                  goaly: BUS_POSITION[1].toString(),
                  goalName: BUS_LOCATION_NAME,
                })
                window.open(`tmap://route?${params.toString()}`, "_self")
                break
              }
              default: {
                alert("모바일에서 확인하실 수 있습니다.")
                break
              }
            }
          }}
        >
          <img src={tmapIcon} alt="t-map-icon" />
          티맵
        </button>
      </div>
    </>
  )
}