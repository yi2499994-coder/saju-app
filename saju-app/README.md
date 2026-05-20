# AI 사주 운세 앱

생년월일로 알아보는 AI 사주 운세 서비스입니다.

## 기술 스택

- Next.js 14 (App Router)
- TypeScript
- Anthropic Claude API

## 배포 방법 (Railway)

### 1단계 - GitHub에 올리기

```bash
git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/본인계정/saju-app.git
git push -u origin main
```

### 2단계 - Railway 배포

1. https://railway.app 접속 후 GitHub 로그인
2. "New Project" → "Deploy from GitHub repo" 선택
3. 이 저장소 선택
4. "Variables" 탭에서 환경변수 추가:
   - `ANTHROPIC_API_KEY` = 본인 API 키
5. 자동으로 빌드 및 배포됩니다

### Anthropic API 키 발급

https://console.anthropic.com 에서 발급

## 로컬 실행

```bash
npm install
cp .env.example .env.local
# .env.local에 실제 API 키 입력
npm run dev
```

http://localhost:3000 에서 확인
