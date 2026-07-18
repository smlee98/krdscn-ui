// KRDS 원본 렌더 하네스 서버 (memory: krds-render-compare-harness 재구축)
// - Z:\krds-uiux 정적 서빙
// - /view/<name> : html/code/<name>.html 조각을 토큰/공통/컴포넌트 CSS + ui-script.js 로 래핑
// - 컴파일 CSS의 /resources/img/img/... 이중 세그먼트 → /resources/img/ 재작성
// - 원본 저장소에는 아무것도 쓰지 않는다.
import http from "node:http"
import { promises as fs } from "node:fs"
import path from "node:path"

const ROOT = "Z:/krds-uiux"
const PORT = 4173

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".gif": "image/gif",
  ".webp": "image/webp",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".ico": "image/x-icon",
  ".json": "application/json",
}

function wrap(name, fragment) {
  return `<!doctype html>
<html lang="ko">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>krds view: ${name}</title>
<link rel="stylesheet" href="/resources/css/token/krds_tokens.css" />
<link rel="stylesheet" href="/resources/css/common/common.css" />
<link rel="stylesheet" href="/resources/css/component/component.css" />
<link rel="stylesheet" href="/resources/css/plugin/swiper-bundle.min.css" />
<style>body{margin:0;padding:24px;background:#fff}</style>
</head>
<body>
${fragment}
<script src="/resources/js/plugin/swiper-bundle.min.js"></script>
<script src="/resources/js/component/ui-script.js"></script>
<script>
  // 캐러셀(carousel.html 등)은 원본 사이트에서 페이지별 인라인 스크립트로 Swiper를
  // 초기화한다(ui-script.js에는 없음) — 하네스는 표준 클래스명 기반 범용 초기화로 근사한다.
  if (window.Swiper) {
    document.querySelectorAll(".swiper").forEach((el) => {
      new Swiper(el, {
        loop: el.querySelectorAll(".swiper-slide").length > 1,
        navigation: { nextEl: el.querySelector(".swiper-button-next"), prevEl: el.querySelector(".swiper-button-prev") },
        pagination: el.querySelector(".swiper-pagination") ? { el: el.querySelector(".swiper-pagination"), clickable: true } : false,
      })
    })
  }
</script>
</body>
</html>`
}

const server = http.createServer(async (req, res) => {
  try {
    let urlPath = decodeURIComponent(new URL(req.url, `http://localhost:${PORT}`).pathname)

    // 컴파일 CSS의 CDN 루트 가정으로 인한 이중 세그먼트 재작성
    urlPath = urlPath.replace("/resources/img/img/", "/resources/img/")

    if (urlPath.startsWith("/view/")) {
      const name = urlPath.slice("/view/".length).replace(/[^a-z0-9_-]/gi, "")
      const fragPath = path.join(ROOT, "html/code", `${name}.html`)
      const fragment = await fs.readFile(fragPath, "utf8")
      res.writeHead(200, { "content-type": "text/html; charset=utf-8" })
      res.end(wrap(name, fragment))
      return
    }

    const filePath = path.join(ROOT, urlPath === "/" ? "index.html" : urlPath.slice(1))
    if (!path.resolve(filePath).startsWith(path.resolve(ROOT))) {
      res.writeHead(403)
      res.end("forbidden")
      return
    }
    const data = await fs.readFile(filePath)
    res.writeHead(200, { "content-type": MIME[path.extname(filePath).toLowerCase()] ?? "application/octet-stream" })
    res.end(data)
  } catch (err) {
    res.writeHead(404, { "content-type": "text/plain; charset=utf-8" })
    res.end(`not found: ${req.url}\n${err.message}`)
  }
})

server.listen(PORT, () => console.log(`[harness] http://localhost:${PORT} serving ${ROOT}`))
