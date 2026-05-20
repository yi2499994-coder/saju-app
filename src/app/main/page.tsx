'use client'

import { useState } from 'react'

interface Fortune {
  element: string
  zodiac: string
  personality: string
  strength: string
  year2026: string
  love: string
  money: string
  health: string
  lucky_color: string
  lucky_number: number
  advice: string
  love_stars: number
  money_stars: number
  health_stars: number
}

function Stars({ count }: { count: number }) {
  return (
    <span>
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} style={{ color: i <= count ? '#EF9F27' : '#ddd', fontSize: 18 }}>★</span>
      ))}
    </span>
  )
}

export default function MainPage() {
  const [name, setName] = useState('')
  const [birthdate, setBirthdate] = useState('')
  const [birthtime, setBirthtime] = useState('모름')
  const [gender, setGender] = useState('여성')
  const [loading, setLoading] = useState(false)
  const [fortune, setFortune] = useState<Fortune | null>(null)
  const [error, setError] = useState('')

  const inputStyle = {
    width: '100%',
    padding: '10px 12px',
    fontSize: 14,
    border: '1px solid #ddd',
    borderRadius: 8,
    background: '#fafafa',
    color: '#222',
    boxSizing: 'border-box' as const,
  }

  const handleSubmit = async () => {
    setError('')
    if (!birthdate) {
      setError('생년월일을 입력해주세요.')
      return
    }
    setLoading(true)
    setFortune(null)

    const dateObj = new Date(birthdate)
    const year = dateObj.getFullYear()
    const month = dateObj.getMonth() + 1
    const day = dateObj.getDate()

    try {
      const res = await fetch('/api/fortune', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name || '사용자', year, month, day, birthtime, gender }),
      })
      const data = await res.json()
      if (data.error) throw new Error(data.error)
      setFortune(data.fortune)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : '오류가 발생했습니다.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f5', padding: '2rem 1rem' }}>
      <div style={{ maxWidth: 420, margin: '0 auto' }}>

        {/* 헤더 */}
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>🔮</div>
          <h1 style={{ fontSize: 24, fontWeight: 600, color: '#222', margin: 0 }}>AI 사주 운세</h1>
          <p style={{ fontSize: 14, color: '#888', marginTop: 6 }}>생년월일로 알아보는 나의 사주와 2026년 운세</p>
        </div>

        {/* 입력 폼 */}
        <div style={{ background: '#fff', borderRadius: 16, padding: '1.5rem', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', marginBottom: '1rem' }}>
          <div style={{ marginBottom: 14 }}>
            <label style={{ display: 'block', fontSize: 13, color: '#666', marginBottom: 6 }}>이름 (선택)</label>
            <input style={inputStyle} type="text" placeholder="이름을 입력하세요" value={name} onChange={e => setName(e.target.value)} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 14 }}>
            <div>
              <label style={{ display: 'block', fontSize: 13, color: '#666', marginBottom: 6 }}>생년월일</label>
              <input style={inputStyle} type="date" value={birthdate} onChange={e => setBirthdate(e.target.value)} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 13, color: '#666', marginBottom: 6 }}>태어난 시</label>
              <select style={inputStyle} value={birthtime} onChange={e => setBirthtime(e.target.value)}>
                <option value="모름">모름</option>
                <option value="자시">자시 (23-01시)</option>
                <option value="축시">축시 (01-03시)</option>
                <option value="인시">인시 (03-05시)</option>
                <option value="묘시">묘시 (05-07시)</option>
                <option value="진시">진시 (07-09시)</option>
                <option value="사시">사시 (09-11시)</option>
                <option value="오시">오시 (11-13시)</option>
                <option value="미시">미시 (13-15시)</option>
                <option value="신시">신시 (15-17시)</option>
                <option value="유시">유시 (17-19시)</option>
                <option value="술시">술시 (19-21시)</option>
                <option value="해시">해시 (21-23시)</option>
              </select>
            </div>
          </div>

          <div style={{ marginBottom: 14 }}>
            <label style={{ display: 'block', fontSize: 13, color: '#666', marginBottom: 6 }}>성별</label>
            <select style={inputStyle} value={gender} onChange={e => setGender(e.target.value)}>
              <option value="여성">여성</option>
              <option value="남성">남성</option>
            </select>
          </div>

          {error && (
            <div style={{ background: '#FEF2F2', color: '#B91C1C', borderRadius: 8, padding: '10px 14px', fontSize: 13, marginBottom: 12 }}>
              {error}
            </div>
          )}

          <button
            onClick={handleSubmit}
            disabled={loading}
            style={{
              width: '100%', padding: '13px', background: loading ? '#aaa' : '#534AB7',
              color: '#fff', border: 'none', borderRadius: 10, fontSize: 15,
              fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer',
            }}
          >
            {loading ? '🌙 분석 중...' : '✨ 운세 보기'}
          </button>
        </div>

        {/* 결과 */}
        {fortune && (
          <div style={{ background: '#fff', borderRadius: 16, padding: '1.5rem', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>

            {/* 기본 정보 */}
            <div style={{ textAlign: 'center', marginBottom: '1.2rem' }}>
              <div style={{ background: '#EEEDFE', color: '#3C3489', borderRadius: 50, padding: '6px 20px', fontSize: 16, fontWeight: 600, display: 'inline-block', marginBottom: 8 }}>
                {name || '사용자'}
              </div>
              <div style={{ display: 'flex', gap: 6, justifyContent: 'center', flexWrap: 'wrap' }}>
                <span style={{ background: '#EEEDFE', color: '#3C3489', borderRadius: 8, padding: '3px 10px', fontSize: 12 }}>{fortune.zodiac}</span>
                <span style={{ background: '#E1F5EE', color: '#085041', borderRadius: 8, padding: '3px 10px', fontSize: 12 }}>오행: {fortune.element}</span>
                <span style={{ background: '#FAEEDA', color: '#633806', borderRadius: 8, padding: '3px 10px', fontSize: 12 }}>행운색: {fortune.lucky_color}</span>
              </div>
            </div>

            <hr style={{ border: 'none', borderTop: '1px solid #f0f0f0', margin: '1rem 0' }} />

            <div style={{ marginBottom: '1rem' }}>
              <div style={{ fontSize: 13, color: '#888', marginBottom: 4 }}>✨ 타고난 성격</div>
              <div style={{ fontSize: 14, color: '#333', lineHeight: 1.7 }}>{fortune.personality}</div>
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <div style={{ fontSize: 13, color: '#888', marginBottom: 4 }}>⭐ 타고난 재능</div>
              <div style={{ fontSize: 14, color: '#333', lineHeight: 1.7 }}>{fortune.strength}</div>
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <div style={{ fontSize: 13, color: '#888', marginBottom: 4 }}>📅 2026년 총운</div>
              <div style={{ fontSize: 14, color: '#333', lineHeight: 1.7 }}>{fortune.year2026}</div>
            </div>

            <hr style={{ border: 'none', borderTop: '1px solid #f0f0f0', margin: '1rem 0' }} />

            {/* 세부 운세 */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, textAlign: 'center', marginBottom: '1rem' }}>
              {[
                { label: '💕 애정운', stars: fortune.love_stars, text: fortune.love },
                { label: '💰 금전운', stars: fortune.money_stars, text: fortune.money },
                { label: '🌿 건강운', stars: fortune.health_stars, text: fortune.health },
              ].map((item) => (
                <div key={item.label} style={{ background: '#fafafa', borderRadius: 10, padding: '10px 6px' }}>
                  <div style={{ fontSize: 12, color: '#888', marginBottom: 4 }}>{item.label}</div>
                  <Stars count={item.stars} />
                  <div style={{ fontSize: 11, color: '#555', marginTop: 6, lineHeight: 1.5 }}>{item.text}</div>
                </div>
              ))}
            </div>

            {/* 핵심 조언 */}
            <div style={{ background: '#EEEDFE', borderRadius: 12, padding: '14px 16px' }}>
              <div style={{ fontSize: 12, color: '#534AB7', fontWeight: 600, marginBottom: 6 }}>✨ 올해의 핵심 조언</div>
              <div style={{ fontSize: 14, color: '#3C3489', lineHeight: 1.6 }}>{fortune.advice}</div>
              <div style={{ fontSize: 12, color: '#534AB7', marginTop: 8 }}>행운의 숫자: {fortune.lucky_number}</div>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
