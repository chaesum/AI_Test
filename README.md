# AI Engineer Portfolio — GitHub Pages 배포 가이드

이 프로젝트는 **GitHub Actions + GitHub Pages**를 통해 별도 서버 없이 정적 호스팅으로 자동 배포되도록 구성되어 있습니다.

## 1. GitHub 저장소 생성 및 푸시

```bash
git init
git add .
git commit -m "Initial portfolio release"
git branch -M main
git remote add origin https://github.com/<USERNAME>/<REPO_NAME>.git
git push -u origin main
```

- **유저 기본 도메인(`https://<USERNAME>.github.io/`)**으로 배포하려면 저장소 이름을 `<USERNAME>.github.io`로 생성하세요.
- **프로젝트 경로(`https://<USERNAME>.github.io/<REPO_NAME>/`)**로 배포해도 `.github/workflows/deploy.yml`이 자동으로 `VITE_BASE_PATH`를 계산해 모든 이미지와 스크립트 경로를 맞춥니다.

## 2. GitHub Pages 활성화

1. GitHub 저장소의 **Settings** → **Pages** 메뉴로 이동합니다.
2. **Build and deployment** → **Source** 항목을 **GitHub Actions**로 변경합니다.
3. `main` 브랜치에 푸시할 때마다 `.github/workflows/deploy.yml` 워크플로우가 실행되어 약 1~2분 내로 배포가 완료됩니다.

## 3. 로컬 빌드 확인

```bash
npm install
npm run build
npm run preview
```
