import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/EatBTI.css";
import BottomNav from "../component/BottomNav";

const QUESTIONS = [
  "혼자 식당에 들어갈 때 직원 시선은 신경 쓰이지 않는다.",
  "2인석 밖에 없어도 혼자 앉는 게 괜찮다.",
  "혼자 밥 먹는 시간이 오히려 편하다.",
  '식당에서 "몇 분이세요?" 질문이 민망하지 않다.',
  "맛집 웨이팅이 길어도 혼자 들어갈 수 있다.",
];

const COLORS = [
  {
    border: "#33A474",
    borderDim: "rgba(51,164,116,0.25)",
    fill: "#33A474",
    fillDim: "rgba(51,164,116,0.25)",
  },
  {
    border: "#33A474",
    borderDim: "rgba(51,164,116,0.25)",
    fill: "#33A474",
    fillDim: "rgba(51,164,116,0.25)",
  },
  {
    border: "#898989",
    borderDim: "rgba(137,137,137,0.25)",
    fill: "#898989",
    fillDim: "rgba(137,137,137,0.25)",
  },
  {
    border: "#FAA38A",
    borderDim: "rgba(250,163,138,0.25)",
    fill: "#FAA38A",
    fillDim: "rgba(250,163,138,0.25)",
  },
  {
    border: "#FAA38A",
    borderDim: "rgba(250,163,138,0.25)",
    fill: "#FAA38A",
    fillDim: "rgba(250,163,138,0.25)",
  },
];
const SIZES = [48, 40, 30, 40, 48];

const EatBTI = () => {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState(Array(QUESTIONS.length).fill(null));
  const [activeIdx, setActiveIdx] = useState(0);
  const refs = useRef([]);

  const handleAnswer = (qIdx, val) => {
    setActiveIdx(qIdx);
    const next = [...answers];
    next[qIdx] = val;
    setAnswers(next);
    const nextUnanswered = next.findIndex((a, i) => i > qIdx && a === null);
    if (nextUnanswered !== -1) {
      setTimeout(() => {
        refs.current[nextUnanswered]?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 150);
    }
  };

  const allAnswered = answers.every((a) => a !== null);

  return (
    <div className="bti-page">
      <div className="bti-header">
        <button className="bti-back" onClick={() => navigate(-1)}>
          <img src="/image/backBtn.svg" alt="뒤로가기" />
        </button>
        <img src="/image/eatbti.svg" alt="EATBTI" className="bti-banner-img" />
        <div style={{ width: 32 }} />
      </div>

      {/* 문항 스크롤 해서 다음 단계 나오게 구현함 */}
      <div className="bti-body">
        {QUESTIONS.map((q, qIdx) => {
          const isActive = qIdx === activeIdx;
          return (
            <div
              key={qIdx}
              ref={(el) => (refs.current[qIdx] = el)}
              className="bti-q-row"
            >
              <p className={`bti-q-text ${isActive ? "" : "bti-dim"}`}>{q}</p>
              <div className="bti-circles">
                <span
                  className={`bti-lbl bti-lbl-left ${isActive ? "" : "bti-dim"}`}
                >
                  그렇다
                </span>
                {COLORS.map((c, cIdx) => {
                  const selected = answers[qIdx] === cIdx + 1;
                  const dim = !isActive;
                  const size = SIZES[cIdx];
                  return (
                    <button
                      key={cIdx}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAnswer(qIdx, cIdx + 1);
                      }}
                      style={{
                        width: size,
                        height: size,
                        borderRadius: "50%",
                        border: `2.5px solid ${dim ? c.borderDim : c.border}`,
                        background: selected
                          ? dim
                            ? c.fillDim
                            : c.fill
                          : "transparent",
                        flexShrink: 0,
                        cursor: "pointer",
                        transition: "all 0.18s",
                        padding: 0,
                        outline: "none",
                      }}
                    />
                  );
                })}
                <span
                  className={`bti-lbl bti-lbl-right ${isActive ? "" : "bti-dim"}`}
                >
                  그렇지 않다
                </span>
              </div>
            </div>
          );
        })}

        <div className="bti-btn-wrap">
          <button
            className={`bti-submit ${allAnswered ? "enabled" : ""}`}
            disabled={!allAnswered}
            onClick={() => alert("결과 페이지 준비 중")}
          >
            결과 보기
          </button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default EatBTI;
