import ragArchImg from '../assets/images/project_rag_architecture_1794835767225.jpg';
import multimodalAgentImg from '../assets/images/project_multimodal_agent_1794835767154.jpg';
import realtimeChatbotImg from '../assets/images/project_realtime_chatbot_1794835768406.jpg';

export type PipelineKey = 'rag' | 'agent' | 'realtime';

export interface PipelinePreset {
  key: PipelineKey;
  label: string;
  endpoint: string;
  clusterLabel: string;
  availability: string;
  latencyP99: string;
  throughput: string;
  gpuMemory: string;
  cacheHit: string;
  httpStatus: string;
  httpLatency: string;
  payload: string;
  nodes: {
    input: string;
    branchTop: string;
    branchBottom: string;
    core: string;
    outTop: string;
    outBottom: string;
  };
}

export interface PillarItem {
  index: string;
  title: string;
  description: string;
  highlights: string[];
  accent: 'primary' | 'secondary' | 'tertiary';
  footerNote?: string;
}

export interface SkillItem {
  name: string;
  level: string;
  detail: string;
}

export interface SkillCategory {
  id: string;
  tag: string;
  title: string;
  subtitle: string;
  footerLabel: string;
  accent: 'primary' | 'secondary' | 'tertiary' | 'neutral';
  items: SkillItem[];
}

export interface ProjectMetric {
  value: string;
  label: string;
  accent: 'primary' | 'secondary' | 'tertiary';
}

export interface ArchitectureStage {
  step: string;
  title: string;
  role: string;
  latency: string;
}

export interface ProjectItem {
  id: string;
  cardNumber: string;
  category: 'RAG' | 'Agentic AI' | 'Realtime LLM';
  status: string;
  subtitle: string;
  title: string;
  imageSrc: string;
  imageAlt: string;
  problem: string;
  solution: string;
  metrics: [ProjectMetric, ProjectMetric];
  stack: string[];
  accent: 'primary' | 'secondary' | 'tertiary';
  architectureSummary: string;
  architectureStages: ArchitectureStage[];
  codeSnippet: string;
  sampleQuery: string;
  sampleOutput: string;
  benchmarks: {
    metric: string;
    baseline: string;
    improved: string;
    delta: string;
  }[];
}

export const PIPELINE_PRESETS: Record<PipelineKey, PipelinePreset> = {
  rag: {
    key: 'rag',
    label: 'Enterprise RAG',
    endpoint: '[POST] /v1/chat/agentic-stream',
    clusterLabel: 'prod-ap-northeast-2 · RAG Cluster',
    availability: '99.98% SLA',
    latencyP99: '28.4ms (p99)',
    throughput: '1,840',
    gpuMemory: '64.2%',
    cacheHit: '94.7%',
    httpStatus: '200 OK',
    httpLatency: '112ms',
    payload: '{"intent": "enterprise_qa", "rerank": "cohere-v3", "citations": true, "safety_pass": true}',
    nodes: {
      input: 'QUERY',
      branchTop: 'BM25',
      branchBottom: 'EMBED',
      core: 'RAG ROUTER',
      outTop: 'RERANK',
      outBottom: 'STREAM',
    },
  },
  agent: {
    key: 'agent',
    label: 'Multimodal Agent',
    endpoint: '[POST] /v1/documents/vision-parse',
    clusterLabel: 'prod-ap-northeast-2 · Vision Queue',
    availability: '99.95% SLA',
    latencyP99: '41.2ms (p99)',
    throughput: '920',
    gpuMemory: '71.8%',
    cacheHit: '89.4%',
    httpStatus: '202 ACCEPTED',
    httpLatency: '84ms',
    payload: '{"doc_type": "financial_pdf", "tables_detected": 14, "celery_workers": 8, "schema": "markdown"}',
    nodes: {
      input: 'PDF',
      branchTop: 'LAYOUT',
      branchBottom: 'VISION',
      core: 'AGENT GRAPH',
      outTop: 'VERIFY',
      outBottom: 'REPORT',
    },
  },
  realtime: {
    key: 'realtime',
    label: 'Realtime Guardrails',
    endpoint: '[WSS] /v1/support/emotion-stream',
    clusterLabel: 'prod-ap-northeast-2 · Edge Inference',
    availability: '99.99% SLA',
    latencyP99: '19.6ms (p99)',
    throughput: '2,410',
    gpuMemory: '58.4%',
    cacheHit: '96.1%',
    httpStatus: '101 STREAM',
    httpLatency: '48ms',
    payload: '{"sentiment": "urgent_frustrated", "guardrail": "pass", "ttft_ms": 298, "tone": "empathetic"}',
    nodes: {
      input: 'AUDIO',
      branchTop: 'SENTIMENT',
      branchBottom: 'GUARD',
      core: 'TONE ADAPTER',
      outTop: 'LLM',
      outBottom: 'WS OUT',
    },
  },
};

export const HERO_TECH_STACK = [
  'LLMOps',
  'Agentic AI',
  'Enterprise RAG',
  'PyTorch',
  'FastAPI',
  'Triton Inference',
];

export const ENGINEERING_PILLARS: PillarItem[] = [
  {
    index: '01',
    title: 'Problem Solver',
    description:
      '추상적인 비즈니스 과제를 구체적인 AI 솔루션 아키텍처로 분해합니다. 도메인 맞춤형 검색 증강 생성(RAG)부터 Agentic Workflows까지 적재적소의 기술 조합을 설계합니다.',
    highlights: ['Workflow Mapping', 'Cost Optimization', 'ROI Analysis'],
    accent: 'primary',
  },
  {
    index: '02',
    title: 'Production-Ready',
    description:
      '대규모 트래픽을 고려한 모델 양자화(Quantization), 캐싱 레이어, Triton/FastAPI 기반 무중단 비동기 서빙 파이프라인을 구축합니다.',
    highlights: ['Triton & FastAPI', 'Quantization'],
    footerNote: '99.9% High Availability',
    accent: 'secondary',
  },
  {
    index: '03',
    title: 'Fast PoC & Iteration',
    description:
      '가장 빠른 프로토타입으로 프로덕트 시장 적합성을 확인하고, 정량적 LLM Eval(Ragas, TruLens) 지표에 기반해 기민하게 고도화합니다.',
    highlights: ['Ragas Eval', 'Continuous Benchmark'],
    footerNote: 'Metric-Driven Iteration',
    accent: 'tertiary',
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'core-ai',
    tag: 'Core AI',
    title: 'AI & ML Foundations',
    subtitle: '대규모 언어 모델 튜닝 및 RAG 오케스트레이션',
    footerLabel: 'Context Management & Evals',
    accent: 'primary',
    items: [
      {
        name: 'LLMs (GPT-4o, Claude)',
        level: 'Advanced',
        detail: 'Structured Output, Function Calling 및 프롬프트 캐싱 최적화',
      },
      {
        name: 'RAG Architecture',
        level: 'Enterprise',
        detail: 'Hybrid Retrieval(BM25+Dense) + Cross-Encoder Re-ranking 설계',
      },
      {
        name: 'LangChain / LlamaIndex',
        level: 'Framework',
        detail: 'LangGraph 기반 멀티 에이전트 상태 머신 및 도구 호출 파이프라인',
      },
      {
        name: 'PyTorch & Hugging Face',
        level: 'Fine-tuning',
        detail: 'LoRA/QLoRA 도메인 어댑터 학습 및 ONNX/TensorRT 경량화',
      },
    ],
  },
  {
    id: 'backend-serving',
    tag: 'Serving',
    title: 'Backend & Serving',
    subtitle: '고성능 서빙 프레임워크 및 벡터 저장소',
    footerLabel: 'Sub-second Response SLA',
    accent: 'secondary',
    items: [
      {
        name: 'Python & FastAPI',
        level: 'Async IO',
        detail: '비동기 SSE/WebSocket 스트리밍 API 및 동시성 제어 아키텍처',
      },
      {
        name: 'Vector DB (Milvus, Pinecone)',
        level: 'Hybrid',
        detail: 'HNSW 인덱스 튜닝, 메타데이터 프리필터링 및 멀티테넌시 파티셔닝',
      },
      {
        name: 'Ray Serve / Triton',
        level: 'Distributed',
        detail: 'Dynamic Batching 및 멀티 GPU 모델 병렬 서빙 오케스트레이션',
      },
      {
        name: 'PostgreSQL & Redis',
        level: 'Caching',
        detail: 'Semantic Cache 레이어 및 pgvector 기반 하이브리드 메타 저장소',
      },
    ],
  },
  {
    id: 'mlops-cloud',
    tag: 'Ops & Cloud',
    title: 'MLOps & Cloud',
    subtitle: '확장 가능한 모델 서빙 인프라 자동화',
    footerLabel: 'Observability & Rollback',
    accent: 'tertiary',
    items: [
      {
        name: 'AWS & GCP',
        level: 'Multi-Cloud',
        detail: 'EKS/GKE GPU 노드 오토스케일링 및 VPC 보안 네트워킹 구성',
      },
      {
        name: 'Docker & Kubernetes',
        level: 'Container',
        detail: '경량 CUDA 멀티스테이지 빌드 및 Helm 차트 기반 무중단 배포',
      },
      {
        name: 'MLflow / W&B',
        level: 'Tracking',
        detail: '실험 재현성 관리, 모델 레지스트리 및 Ragas 회귀 평가 자동화',
      },
      {
        name: 'GitHub Actions CI/CD',
        level: 'Automated',
        detail: '프롬프트/모델 단위 평가 게이트 통과 시 카나리 배포 자동 실행',
      },
    ],
  },
  {
    id: 'workflow-tools',
    tag: 'Collab',
    title: 'Workflow & Tools',
    subtitle: '제품 팀과의 매끄러운 소통과 기술 문서화',
    footerLabel: 'Cross-functional Team',
    accent: 'neutral',
    items: [
      {
        name: 'Git & GitHub Flow',
        level: 'Standard',
        detail: '코드 리뷰 표준화 및 ADR(Architecture Decision Record) 관리',
      },
      {
        name: 'Jira & Confluence',
        level: 'Agile',
        detail: '데이터/모델 스프린트 산정 및 장애 대응 포스트모템 문서화',
      },
      {
        name: 'Notion Docs',
        level: 'Architecture',
        detail: 'API 명세, 데이터 계보 및 프롬프트 변경 이력 아카이빙',
      },
      {
        name: 'Figma Prototype',
        level: 'UX Alignment',
        detail: '스트리밍 UX, 인용 하이라이트 등 AI 인터랙션 프로토타이핑',
      },
    ],
  },
];

export const PROJECTS: ProjectItem[] = [
  {
    id: 'enterprise-rag',
    cardNumber: '01',
    category: 'RAG',
    status: 'Production',
    subtitle: 'Enterprise Knowledge Assistant',
    title: '지능형 사내 지식 검색 RAG 서비스',
    imageSrc: ragArchImg,
    imageAlt: '엔터프라이즈 사내 지식 검색 RAG 파이프라인 아이소메트릭 아키텍처 시각화',
    problem:
      '방대한 20만+ 비정형 사내 위키 및 기술 문서에서 사내 직원의 정보 탐색 시간이 일 평균 40분 이상 소요되고 오답(환각) 리스크 존재.',
    solution:
      'Hybrid Search(BM25 + Dense Vector), Re-ranker(Cohere) 계층화 도입 및 메타데이터 필터링을 결합한 다단계 RAG 파이프라인 구축.',
    metrics: [
      { value: '+68%', label: '응답 정확도 (Hit@3)', accent: 'tertiary' },
      { value: '1.4s', label: '평균 E2E 검색 지연', accent: 'primary' },
    ],
    stack: ['LangChain', 'Milvus', 'FastAPI', 'React'],
    accent: 'primary',
    architectureSummary:
      '사용자 질의를 의도 분류기(Query Router)로 분석한 뒤, 권한 메타데이터 기반의 BM25 + BGE-M3 하이브리드 검색을 수행하고 Cross-Encoder Reranker를 거쳐 출처가 검증된 스트리밍 응답을 생성합니다.',
    architectureStages: [
      { step: '01', title: 'Query Rewrite & RBAC Filter', role: '권한/부서 메타데이터 필터링 및 질의 확장', latency: '45ms' },
      { step: '02', title: 'Hybrid Retriever (BM25 + Dense)', role: 'Milvus HNSW + Sparse 키워드 병렬 검색 (Top-50)', latency: '110ms' },
      { step: '03', title: 'Cross-Encoder Reranker', role: 'Cohere Rerank v3 기반 상위 5개 컨텍스트 정밀 정렬', latency: '190ms' },
      { step: '04', title: 'Citation-Grounded Generator', role: '인라인 문서 출처 검증 및 SSE 스트리밍 응답', latency: '1.05s' },
    ],
    codeSnippet: `# Hybrid Search + Cross-Encoder Rerank Pipeline
async def retrieve_and_rerank(query: str, dept_id: str) -> list[Chunk]:
    bm25_task = sparse_client.search(query, filter={"dept": dept_id}, top_k=30)
    dense_task = milvus_client.search(
        embed(query), expr=f'dept == "{dept_id}"', limit=30
    )
    sparse_hits, dense_hits = await asyncio.gather(bm25_task, dense_task)
    fused = reciprocal_rank_fusion(sparse_hits, dense_hits, k=60)
    return await reranker.rerank(query=query, docs=fused[:25], top_n=5)`,
    sampleQuery: '2026년 3분기 클라우드 GPU 예산 집행 승인 기준과 품의서 양식은 어디에 있나요?',
    sampleOutput:
      '사내 재무·인프라 규정 v2.4(제12조)에 따라 월 500만 원 초과 GPU 증설은 인프라팀 리드와 CFO 2차 승인이 필요합니다. [출처: Confluence > Cloud_FinOps_Policy_2026.md §3.2]',
    benchmarks: [
      { metric: 'Hit@3 검색 재현율', baseline: '51.2%', improved: '86.0%', delta: '+68.0%' },
      { metric: '환각(Hallucination) 발생률', baseline: '18.4%', improved: '2.1%', delta: '-88.6%' },
      { metric: 'P95 E2E 응답 시간', baseline: '3.8s', improved: '1.4s', delta: '-63.2%' },
    ],
  },
  {
    id: 'multimodal-agent',
    cardNumber: '02',
    category: 'Agentic AI',
    status: 'Deployed',
    subtitle: 'Automated Document Intelligence',
    title: '멀티모달 Agent 문서 분석 솔루션',
    imageSrc: multimodalAgentImg,
    imageAlt: '멀티모달 비전 LLM 기반 재무 보고서 및 복합 차트 문서 분석 시스템',
    problem:
      '표, 도표, 복합 차트가 포함된 재무 보고서 및 기술 도면을 기존 OCR로 처리 시 데이터 왜곡 및 오판독 문제 빈번.',
    solution:
      '비전 LLM 기반 시각 파싱 + Celery 비동기 큐 분산 워크플로우를 통해 구조화된 Markdown 및 실시간 인사이트 보고서 자동 생성.',
    metrics: [
      { value: '-85%', label: '보고서 작성 수작업 시간', accent: 'secondary' },
      { value: '98.2%', label: '테이블 구조 보존 정확도', accent: 'primary' },
    ],
    stack: ['GPT-4o', 'PyTorch', 'Celery', 'Docker'],
    accent: 'secondary',
    architectureSummary:
      '문서 레이아웃 탐지 모델로 표·차트·본문 영역을 정밀 크롭(Crop)한 뒤, Vision LLM 워커 풀과 수치 교차 검증 에이전트가 병합·검증하여 JSON/Markdown 보고서를 생성합니다.',
    architectureStages: [
      { step: '01', title: 'Layout & Table Segmentation', role: 'DocLayout 모델 기반 페이지 영역 분할 및 고해상도 크롭', latency: '240ms' },
      { step: '02', title: 'Celery Distributed Vision Pool', role: '페이지/차트 단위 비동기 병렬 Vision LLM 파싱', latency: '1.8s' },
      { step: '03', title: 'Numeric Cross-Verifier Agent', role: '표 합계/비율 산술 일치 여부 자동 검증 및 재질의', latency: '420ms' },
      { step: '04', title: 'Structured Executive Synthesis', role: 'Markdown 테이블 및 핵심 이상치 요약 보고서 출력', latency: '680ms' },
    ],
    codeSnippet: `@celery_app.task(bind=True, max_retries=2)
def parse_visual_region(self, page_img_uri: str, region_bbox: list[int]):
    cropped = crop_high_dpi(page_img_uri, region_bbox)
    parsed_md = vision_llm.extract_table_markdown(cropped)
    if not verify_column_totals(parsed_md):
        return self.retry(countdown=1)
    return {"status": "verified", "markdown": parsed_md}`,
    sampleQuery: 'Q3_Consolidated_Financials.pdf (48p 복합 손익계산서 및 세그먼트 차트 분석)',
    sampleOutput:
      '총 14개 재무 테이블과 6개 세그먼트 막대 차트 추출 완료. 합계 검산 오차 0건 확인: 영업이익률 YoY +3.4%p 개선(클라우드 사업부 기여도 62.1%).',
    benchmarks: [
      { metric: '테이블 셀 구조 보존 정확도', baseline: '71.5%', improved: '98.2%', delta: '+26.7%p' },
      { metric: '문서당 분석 소요 시간', baseline: '45분 (수작업)', improved: '6.5분 (검수 포함)', delta: '-85.5%' },
      { metric: '수치 오판독률', baseline: '11.8%', improved: '0.6%', delta: '-94.9%' },
    ],
  },
  {
    id: 'realtime-chatbot',
    cardNumber: '03',
    category: 'Realtime LLM',
    status: 'Production',
    subtitle: 'Conversational AI Engine',
    title: '실시간 감정 분석 대화형 AI 챗봇',
    imageSrc: realtimeChatbotImg,
    imageAlt: '실시간 감정 분석 및 가드레일 필터가 결합된 대화형 AI 스트리밍 엔진',
    problem:
      '고객 지원 상담 채널의 피크 타임 대기 시간 증가 및 부정 감정 고객에 대한 늦은 대응으로 인한 이탈 발생.',
    solution:
      'WebSocket 기반 실시간 감정 분류기 탑재 + Guardrails AI를 이용한 탈옥(Jailbreak) 및 편향 방지 실시간 필터 적용.',
    metrics: [
      { value: '< 350ms', label: 'TTFT (첫 토큰 생성 지연)', accent: 'tertiary' },
      { value: '94.6%', label: 'CSAT 긍정 응대 평가', accent: 'secondary' },
    ],
    stack: ['OpenAI API', 'Guardrails AI', 'Redis', 'WebSocket'],
    accent: 'tertiary',
    architectureSummary:
      'WebSocket으로 유입되는 발화를 50ms 이내 경량 감정 분류기로 태깅하고, Guardrails 정책 검사 통과 후 감정에 적응형 어조 프롬프트를 주입해 토큰 단위로 스트리밍합니다.',
    architectureStages: [
      { step: '01', title: 'Fast Emotion Classifier', role: '경량 KoELECTRA 모델 기반 실시간 5종 감정 스코어링', latency: '38ms' },
      { step: '02', title: 'Guardrails & PII Filter', role: '프롬프트 인젝션/탈옥 및 민감정보 마스킹 병렬 검사', latency: '42ms' },
      { step: '03', title: 'Adaptive Tone Prompting', role: '감정 상태별 공감/긴급 에스컬레이션 정책 동적 주입', latency: '12ms' },
      { step: '04', title: 'Token Streaming Gateway', role: 'Redis 세션 컨텍스트 동기화 및 WebSocket 저지연 송출', latency: '215ms' },
    ],
    codeSnippet: `async def handle_ws_message(ws: WebSocket, session_id: str, text: str):
    emotion, guard = await asyncio.gather(
        emotion_classifier.predict(text),
        guardrails.validate_input(text),
    )
    if not guard.passed:
        return await ws.send_json({"type": "safe_refusal", "reason": guard.tag})
    system_prompt = build_adaptive_prompt(emotion.label, emotion.score)
    async for token in llm_stream(session_id, system_prompt, text):
        await ws.send_text(token)`,
    sampleQuery: '결제가 두 번이나 중복 승인됐는데 고객센터 연결도 안 되고 너무 답답합니다.',
    sampleOutput:
      '[감지: 긴급/불만 0.92 · Guardrail: Pass] 불편을 드려 진심으로 죄송합니다. 중복 승인 건은 즉시 자동 취소 큐에 우선 등록했으며, 환불 예정 내역을 지금 바로 확인해 드리겠습니다.',
    benchmarks: [
      { metric: '첫 토큰 응답 지연 (TTFT)', baseline: '1,120ms', improved: '307ms', delta: '-72.6%' },
      { metric: '고객 만족도 (CSAT)', baseline: '78.4%', improved: '94.6%', delta: '+16.2%p' },
      { metric: '유해·탈옥 프롬프트 차단율', baseline: '82.0%', improved: '99.4%', delta: '+17.4%p' },
    ],
  },
];

export const CONTACT_INFO = {
  email: 'ai.engineer.service@domain.com',
  githubHandle: '@ai-engineer',
  githubUrl: 'https://github.com',
  linkedinHandle: 'in/ai-service',
  linkedinUrl: 'https://www.linkedin.com',
  location: '대한민국 서울특별시 (Seoul, South Korea) · Remote 협업 가능',
};

export const RESUME_MARKDOWN = `# AI Service & MLOps Engineer Portfolio Summary

## Profile
- Role: AI Service & MLOps Engineer
- Email: ${CONTACT_INFO.email}
- Location: ${CONTACT_INFO.location}
- Core Focus: Bridging LLM/ML Models to Production Services (RAG, Agentic AI, Distributed Serving)

## Engineering Philosophy
1. Problem Solver: 추상적인 비즈니스 과제를 구체적인 AI 솔루션 아키텍처로 분해하고 ROI 중심의 기술 조합을 설계합니다.
2. Production-Ready: 모델 양자화, Semantic Caching, Triton/FastAPI 기반 고가용성(99.9%) 무중단 비동기 서빙 파이프라인을 구축합니다.
3. Fast PoC & Iteration: 빠른 프로토타입 검증 후 Ragas/TruLens 기반 정량적 평가 지표를 통해 지속적으로 고도화합니다.

## Core Technical Stack
- AI & ML Foundations: LLMs (GPT-4o, Claude), Enterprise RAG, LangChain/LlamaIndex, PyTorch & Hugging Face
- Backend & Serving: Python & FastAPI, Vector DB (Milvus, Pinecone), Ray Serve / Triton, PostgreSQL & Redis
- MLOps & Cloud: AWS & GCP, Docker & Kubernetes, MLflow / W&B, GitHub Actions CI/CD

## Featured Production Projects
1. 지능형 사내 지식 검색 RAG 서비스 (Enterprise Knowledge Assistant)
   - Outcome: 응답 정확도(Hit@3) +68% 향상, 평균 E2E 검색 지연 1.4s 달성
   - Stack: LangChain, Milvus, FastAPI, React
2. 멀티모달 Agent 문서 분석 솔루션 (Automated Document Intelligence)
   - Outcome: 보고서 작성 수작업 시간 -85% 단축, 테이블 구조 보존 정확도 98.2%
   - Stack: GPT-4o, PyTorch, Celery, Docker
3. 실시간 감정 분석 대화형 AI 챗봇 (Conversational AI Engine)
   - Outcome: TTFT < 350ms 달성, CSAT 긍정 응대 평가 94.6%
   - Stack: OpenAI API, Guardrails AI, Redis, WebSocket
`;
