import { NextRequest, NextResponse } from 'next/server'

const fortunes = [
  {
    element: "목", zodiac: "용띠", personality: "창의적이고 진취적인 성격으로 새로운 것에 도전하기를 좋아합니다. 리더십이 강하며 주변 사람들에게 긍정적인 영향을 줍니다.", strength: "뛰어난 직관력과 창의력으로 어떤 상황에서도 해결책을 찾아냅니다.", year2026: "2026년은 새로운 시작의 해입니다. 오랫동안 준비해온 일들이 빛을 발하는 시기로 적극적으로 도전하세요.", love: "인연이 찾아오는 시기입니다. 마음을 열고 주변을 돌아보세요.", money: "중반기 이후 금전운이 상승합니다. 무리한 투자보다는 안정적인 저축을 권장합니다.", health: "전반적으로 건강한 한 해입니다. 규칙적인 운동으로 체력을 관리하세요.", lucky_color: "초록", lucky_number: 3, advice: "꾸준함이 성공의 열쇠입니다.", love_stars: 4, money_stars: 3, health_stars: 5
  },
  {
    element: "화", zodiac: "말띠", personality: "열정적이고 활동적인 성격으로 무슨 일이든 열심히 합니다. 사교적이며 사람들과 잘 어울립니다.", strength: "강한 의지력과 실행력으로 목표를 반드시 이루어냅니다.", year2026: "2026년은 변화와 성장의 해입니다. 새로운 기회가 많이 찾아오니 준비를 잘 하세요.", love: "감정 표현에 솔직해지면 좋은 관계가 만들어집니다.", money: "노력한 만큼 결실을 맺는 해입니다. 꾸준한 노력이 중요합니다.", health: "과로에 주의하세요. 충분한 휴식이 필요합니다.", lucky_color: "빨강", lucky_number: 7, advice: "열정을 지속하되 균형을 잃지 마세요.", love_stars: 5, money_stars: 4, health_stars: 3
  },
  {
    element: "토", zodiac: "소띠", personality: "성실하고 책임감이 강한 성격입니다. 한번 마음먹은 일은 끝까지 해내는 끈기가 있습니다.", strength: "신뢰감과 안정감으로 주변 사람들에게 든든한 버팀목이 됩니다.", year2026: "2026년은 안정과 결실의 해입니다. 지금까지의 노력이 인정받는 시기입니다.", love: "진실한 마음으로 다가가면 좋은 인연을 만날 수 있습니다.", money: "안정적인 수입이 기대됩니다. 계획적인 재정 관리가 도움이 됩니다.", health: "소화기 건강에 신경 쓰세요. 규칙적인 식사가 중요합니다.", lucky_color: "노랑", lucky_number: 5, advice: "성실함이 최고의 무기입니다.", love_stars: 3, money_stars: 5, health_stars: 4
  },
  {
    element: "금", zodiac: "닭띠", personality: "분석적이고 완벽주의적인 성격으로 꼼꼼하게 일을 처리합니다. 논리적 사고가 뛰어납니다.", strength: "날카로운 분석력과 집중력으로 복잡한 문제도 해결해냅니다.", year2026: "2026년은 도약의 해입니다. 실력을 발휘할 기회가 많이 찾아옵니다.", love: "상대방의 감정에 더 귀를 기울이면 관계가 깊어집니다.", money: "상반기에 좋은 기회가 옵니다. 신중하게 판단하세요.", health: "스트레스 관리가 중요합니다. 취미 활동으로 마음을 달래세요.", lucky_color: "흰색", lucky_number: 1, advice: "완벽함보다 완성이 중요합니다.", love_stars: 3, money_stars: 4, health_stars: 4
  },
  {
    element: "수", zodiac: "쥐띠", personality: "지혜롭고 적응력이 뛰어난 성격입니다. 어떤 환경에서도 유연하게 대처하는 능력이 있습니다.", strength: "뛰어난 기억력과 학습 능력으로 무엇이든 빠르게 습득합니다.", year2026: "2026년은 내면의 성장에 집중하는 해입니다. 자기계발에 투자하세요.", love: "솔직한 대화가 관계를 발전시킵니다. 마음을 표현하세요.", money: "예상치 못한 수입이 생길 수 있습니다. 기회를 놓치지 마세요.", health: "수분 섭취와 충분한 수면이 건강의 열쇠입니다.", lucky_color: "검정", lucky_number: 9, advice: "흐르는 물처럼 유연하게 변화를 받아들이세요.", love_stars: 4, money_stars: 4, health_stars: 3
  }
]

export async function POST(req: NextRequest) {
  try {
    const { day } = await req.json()
    const index = (day || 1) % fortunes.length
    const fortune = fortunes[index]
    return NextResponse.json({ fortune })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: '운세 분석 중 오류가 발생했습니다.' }, { status: 500 })
  }
}