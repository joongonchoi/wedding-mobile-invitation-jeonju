import { useState, useEffect } from "react"

export const AttendancePopup = () => {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    // 자연스러움을 위해 청첩장 접속 0.5초 뒤에 팝업이 뜨도록 설정
    const timer = setTimeout(() => {
      setIsOpen(true)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  // 닫기 버튼을 누르면 화면에서 사라짐
  if (!isOpen) return null

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.6)", // 반투명 검은색 배경
        zIndex: 9999, // 화면 맨 앞으로 가져오기
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        boxSizing: "border-box"
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          padding: "30px 20px",
          borderRadius: "12px",
          width: "100%",
          maxWidth: "340px",
          textAlign: "center",
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
        }}
      >
        <h3 style={{ margin: "0 0 10px 0", color: "#333" }}>참석 여부 알림</h3>
        <p style={{ fontSize: "0.85rem", color: "#666", marginBottom: "20px", wordBreak: "keep-all", lineHeight: "1.4" }}>
          참석 여부를 미리 알려주시면<br />예식 준비에 큰 도움이 됩니다 ☺️
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {/* 신랑에게 알리기 버튼 */}
          <a
            href="sms:01091008360?body=[참석 여부 전달]%0A- 이름 : %0A- 참석 인원 : 명%0A- 식사 여부 (O/X) : %0A%0A전달해주셔서 감사합니다 ☺️"
            style={{
              width: "100%",
              padding: "12px 0",
              backgroundColor: "#f5f5f5",
              border: "1px solid #e0e0e0",
              color: "#333",
              textDecoration: "none",
              borderRadius: "8px",
              fontSize: "0.9rem",
              fontWeight: "bold"
            }}
          >
            🤵 신랑 측 참석 알림 메시지 보내기
          </a>

          {/* 신부에게 알리기 버튼 */}
          <a
            href="sms:01023329226?body=[참석 여부 전달]%0A- 이름 : %0A- 참석 인원 : 명%0A- 식사 여부 (O/X) : %0A%0A전달해주셔서 감사합니다 ☺️"
            style={{
              width: "100%",
              padding: "12px 0",
              backgroundColor: "#f5f5f5",
              border: "1px solid #e0e0e0",
              color: "#333",
              textDecoration: "none",
              borderRadius: "8px",
              fontSize: "0.9rem",
              fontWeight: "bold"
            }}
          >
            👰 신부 측 참석 알림 메시지 보내기
          </a>
        </div>

        {/* 팝업 닫기 버튼 */}
        <button
          onClick={() => setIsOpen(false)}
          style={{
            marginTop: "20px",
            padding: "10px",
            width: "100%",
            border: "none",
            backgroundColor: "transparent",
            color: "#888",
            fontSize: "0.9rem",
            textDecoration: "underline",
            cursor: "pointer"
          }}
        >
          닫기
        </button>
      </div>
    </div>
  )
}