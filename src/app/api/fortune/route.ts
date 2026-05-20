import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

export async function POST(req: NextRequest) {
  try {
    const { name, year, month, day, birthtime, gender } = await req.json()

    const prompt = `당신은 한국 전통 사주명리학 전문가입니다. 다음 정보를 바탕으로 사주 운세를 분석해주세요.

이름: ${name}
생년월일: ${year}년 ${month}월 ${day}일
태어난 시: ${birthtime}
성별: ${gender}
분석 연도: 2026년

반드시 아래 JSON 형식으로만 응답하세요. 마크다운 코드블록 없이 순수 JSON만:
{"element":"오행(목/화/토/금/수)","zodiac":"띠(예:용띠)","personality":"타고난 성격과 기질 2-3문장","strength":"타고난 재능과 강점 1-2문장","year2026":"2026년 전체 운세 2-3문장","love":"2026년 애정운 1-2문장","money":"2026년 금전운 1-2문장","health":"2026년 건강운 1-2문장","lucky_color":"행운의 색","lucky_number":7,"advice":"올해의 핵심 조언 한 문장","love_stars":4,"money_stars":3,"health_stars":5}`

    const message = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      messages: [{ role: 'user', content: prompt }],
    })

    const text = message.content
      .filter((b) => b.type === 'text')
      .map((b) => (b as { type: 'text'; text: string }).text)
      .join('')
      .replace(/```json|```/g, '')
      .trim()

    const fortune = JSON.parse(text)
    return NextResponse.json({ fortune })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: '운세 분석 중 오류가 발생했습니다.' }, { status: 500 })
  }
}
