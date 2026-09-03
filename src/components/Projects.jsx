import { useRef, useState, useEffect } from 'react'
import { gsap, ScrollTrigger } from '../lib/gsap'
import { useSectionTitleReveal } from '../hooks/useSectionReveal'

const CATEGORIES = [
  {
    id: 'ai-paint',
    name: 'AI绘画',
    title: '梦境叙事',
    desc: '探索 AI 绘画的无限可能，从概念草图到精细渲染，打造具有艺术感染力的视觉作品。',
    fullDesc: [
      '精通 Stable Diffusion、Midjourney、DALL·E 等主流 AI 绘画工具',
      '建立完整的 AI 绘画工作流：Prompt 工程 → 草图生成 → 细节精修 → 后期合成',
      '作品涵盖概念艺术、角色设计、场景插画、商业海报等多个领域',
    ],
    tags: ['Stable Diffusion', 'ControlNet', 'ComfyUI'],
    year: '2024',
    type: 'AI 绘画',
    gradient: 'linear-gradient(135deg, #1a0533 0%, #2d0a5e 50%, #0a0520 100%)',
    accent: '#8b5cf6',
    bgColor: '#0d0628',
    colors: ['#8b5cf6', '#a78bfa', '#c4b5fd'],
    image: '/works/aipaint/category-cover.webp',
    workCount: 4,
    projects: [
      {
        id: 'paint-shidi',
        title: '师弟们都是大佬，那我躺平了',
        subtitle: 'AI 绘画 · 玄幻角色设计',
        cover: '/works/aipaint/shidi-laoda/cover.png',
        count: 32,
        groups: [
          {
            name: '人物资产',
            characters: [
              {
                name: '大师兄苏珩',
                images: [
                  { src: '/works/aipaint/shidi-laoda/characters/大师兄苏珩/立绘.png', title: '立绘' },
                  { src: '/works/aipaint/shidi-laoda/characters/大师兄苏珩/Q版立绘.png', title: 'Q版立绘' },
                  { src: '/works/aipaint/shidi-laoda/characters/大师兄苏珩/三视图.png', title: '三视图' },
                  { src: '/works/aipaint/shidi-laoda/characters/大师兄苏珩/Q版三视图.png', title: 'Q版三视图' },
                ],
              },
              {
                name: '二师兄萧惊寒',
                images: [
                  { src: '/works/aipaint/shidi-laoda/characters/二师兄萧惊寒/立绘.png', title: '立绘' },
                  { src: '/works/aipaint/shidi-laoda/characters/二师兄萧惊寒/持剑立绘.png', title: '持剑立绘' },
                  { src: '/works/aipaint/shidi-laoda/characters/二师兄萧惊寒/三视图.png', title: '三视图' },
                  { src: '/works/aipaint/shidi-laoda/characters/二师兄萧惊寒/Q版三视图.png', title: 'Q版三视图' },
                ],
              },
              {
                name: '三师兄沈默尘',
                images: [
                  { src: '/works/aipaint/shidi-laoda/characters/三师兄沈默尘/立绘.png', title: '立绘' },
                  { src: '/works/aipaint/shidi-laoda/characters/三师兄沈默尘/三视图.png', title: '三视图' },
                ],
              },
              {
                name: '四师兄云清辞',
                images: [
                  { src: '/works/aipaint/shidi-laoda/characters/四师兄云清辞/立绘.png', title: '立绘' },
                  { src: '/works/aipaint/shidi-laoda/characters/四师兄云清辞/持剑立绘.png', title: '持剑立绘' },
                  { src: '/works/aipaint/shidi-laoda/characters/四师兄云清辞/Q版立绘.png', title: 'Q版立绘' },
                  { src: '/works/aipaint/shidi-laoda/characters/四师兄云清辞/三视图.png', title: '三视图' },
                  { src: '/works/aipaint/shidi-laoda/characters/四师兄云清辞/Q版三视图.png', title: 'Q版三视图' },
                  { src: '/works/aipaint/shidi-laoda/characters/四师兄云清辞/生成佩剑相关图片.png', title: '佩剑设计' },
                ],
              },
              {
                name: '小师妹胡糯糯',
                images: [
                  { src: '/works/aipaint/shidi-laoda/characters/小师妹胡糯糯/立绘.jpg', title: '立绘' },
                  { src: '/works/aipaint/shidi-laoda/characters/小师妹胡糯糯/三视图.png', title: '三视图' },
                ],
              },
              {
                name: '师傅胡云',
                images: [
                  { src: '/works/aipaint/shidi-laoda/characters/师傅胡云/立绘.png', title: '立绘' },
                  { src: '/works/aipaint/shidi-laoda/characters/师傅胡云/三视图.png', title: '三视图' },
                  { src: '/works/aipaint/shidi-laoda/characters/师傅胡云/Q版三视图.png', title: 'Q版三视图' },
                ],
              },
              {
                name: '掌门洞虚子',
                images: [
                  { src: '/works/aipaint/shidi-laoda/characters/掌门洞虚子/立绘.png', title: '立绘' },
                  { src: '/works/aipaint/shidi-laoda/characters/掌门洞虚子/三视图.png', title: '三视图' },
                  { src: '/works/aipaint/shidi-laoda/characters/掌门洞虚子/Q版三视图.png', title: 'Q版三视图' },
                ],
              },
            ],
          },
          {
            name: '场景资产',
            ratio: '16/9',
            images: [
              { src: '/works/aipaint/shidi-laoda/scenes/青云宗后山山路.png', title: '青云宗后山山路' },
              { src: '/works/aipaint/shidi-laoda/scenes/青云宗后山山路2.png', title: '青云宗后山山路 2' },
            ],
          },
          {
            name: '道具资产',
            ratio: '1/1',
            images: [
              { src: '/works/aipaint/shidi-laoda/props/云清辞的剑.png', title: '云清辞的剑' },
              { src: '/works/aipaint/shidi-laoda/props/云清辞的剑鞘.png', title: '云清辞的剑鞘' },
              { src: '/works/aipaint/shidi-laoda/props/神行符.png', title: '神行符' },
              { src: '/works/aipaint/shidi-laoda/props/萧惊寒的佩剑.png', title: '萧惊寒的佩剑' },
            ],
          },
        ],
      },
      {
        id: 'paint-changsheng',
        title: '开局长生，苟在下届吃土飞升',
        subtitle: 'AI 绘画 · 玄幻角色设计',
        cover: '/works/aipaint/changsheng-goutu/cover.png',
        count: 28,
        groups: [
          {
            name: '人物资产',
            characters: [
              {
                name: '云玄策',
                images: [
                  { src: '/works/aipaint/changsheng-goutu/characters/云玄策/立绘.png', title: '立绘' },
                  { src: '/works/aipaint/changsheng-goutu/characters/云玄策/三视图.png', title: '三视图' },
                ],
              },
              {
                name: '叶星云',
                images: [
                  { src: '/works/aipaint/changsheng-goutu/characters/叶星云/立绘.png', title: '立绘' },
                  { src: '/works/aipaint/changsheng-goutu/characters/叶星云/三视图.png', title: '三视图' },
                ],
              },
              {
                name: '李凡',
                images: [
                  { src: '/works/aipaint/changsheng-goutu/characters/李凡/立绘.png', title: '立绘' },
                  { src: '/works/aipaint/changsheng-goutu/characters/李凡/三视图.png', title: '三视图' },
                ],
              },
              {
                name: '李绛眉',
                images: [
                  { src: '/works/aipaint/changsheng-goutu/characters/李绛眉/立绘.png', title: '立绘' },
                  { src: '/works/aipaint/changsheng-goutu/characters/李绛眉/三视图.png', title: '三视图' },
                ],
              },
              {
                name: '玄清子',
                images: [
                  { src: '/works/aipaint/changsheng-goutu/characters/玄清子_长生殿仙官/立绘.png', title: '立绘' },
                  { src: '/works/aipaint/changsheng-goutu/characters/玄清子_长生殿仙官/三视图.png', title: '三视图' },
                ],
              },
              {
                name: '陆英招',
                images: [
                  { src: '/works/aipaint/changsheng-goutu/characters/陆英招/立绘.png', title: '立绘' },
                  { src: '/works/aipaint/changsheng-goutu/characters/陆英招/三视图.png', title: '三视图' },
                ],
              },
              {
                name: '荆雨（前世）',
                images: [
                  { src: '/works/aipaint/changsheng-goutu/characters/荆雨_前世/立绘（长生殿）.png', title: '长生殿立绘' },
                  { src: '/works/aipaint/changsheng-goutu/characters/荆雨_前世/前世健身房立绘.png', title: '健身房立绘' },
                  { src: '/works/aipaint/changsheng-goutu/characters/荆雨_前世/前世工作立绘.png', title: '工作立绘' },
                  { src: '/works/aipaint/changsheng-goutu/characters/荆雨_前世/三视图（长生殿）.png', title: '长生殿三视图' },
                  { src: '/works/aipaint/changsheng-goutu/characters/荆雨_前世/三视图（健身房）.jpeg', title: '健身房三视图' },
                  { src: '/works/aipaint/changsheng-goutu/characters/荆雨_前世/三视图（工作）.png', title: '工作三视图' },
                ],
              },
              {
                name: '路人组',
                images: [
                  { src: '/works/aipaint/changsheng-goutu/characters/四个路人/路人甲立绘.png', title: '路人甲立绘' },
                  { src: '/works/aipaint/changsheng-goutu/characters/四个路人/路人乙立绘.png', title: '路人乙立绘' },
                  { src: '/works/aipaint/changsheng-goutu/characters/四个路人/路人丙立绘.png', title: '路人丙立绘' },
                  { src: '/works/aipaint/changsheng-goutu/characters/四个路人/路人丁立绘.png', title: '路人丁立绘' },
                  { src: '/works/aipaint/changsheng-goutu/characters/四个路人/三视图甲.png', title: '路人甲三视图' },
                  { src: '/works/aipaint/changsheng-goutu/characters/四个路人/乙.png', title: '路人乙三视图' },
                  { src: '/works/aipaint/changsheng-goutu/characters/四个路人/三视图丙.png', title: '路人丙三视图' },
                  { src: '/works/aipaint/changsheng-goutu/characters/四个路人/三视图丁.png', title: '路人丁三视图' },
                ],
              },
            ],
          },
          {
            name: '场景资产',
            ratio: '16/9',
            images: [
              { src: '/works/aipaint/changsheng-goutu/scenes/健身房.png', title: '健身房' },
              { src: '/works/aipaint/changsheng-goutu/scenes/公交车站.jpg', title: '公交车站' },
              { src: '/works/aipaint/changsheng-goutu/scenes/写字楼格子间办公室.png', title: '写字楼格子间' },
              { src: '/works/aipaint/changsheng-goutu/scenes/长生殿殿内.jpg', title: '长生殿殿内' },
              { src: '/works/aipaint/changsheng-goutu/scenes/长生殿殿外.jpg', title: '长生殿殿外' },
            ],
          },
          {
            name: '道具资产',
            ratio: '1/1',
            images: [
              { src: '/works/aipaint/changsheng-goutu/props/玄清子的浮尘.png', title: '玄清子的浮尘' },
              { src: '/works/aipaint/changsheng-goutu/props/知名宝镜.png', title: '知命宝镜' },
            ],
          },
        ],
      },
      {
        id: 'paint-honghuang',
        title: '洪荒，我爹是通天教主',
        subtitle: 'AI 绘画 · 洪荒角色设计',
        cover: '/works/aipaint/honghuang-tongtian/cover.jpeg',
        count: 15,
        groups: [
          {
            name: '人物资产',
            characters: [
              {
                name: '叶辰',
                images: [
                  { src: '/works/aipaint/honghuang-tongtian/characters/叶辰/叶辰立绘.png', title: '立绘' },
                  { src: '/works/aipaint/honghuang-tongtian/characters/叶辰/Q版叶辰.png', title: 'Q版立绘' },
                  { src: '/works/aipaint/honghuang-tongtian/characters/叶辰/三视图.png', title: '三视图' },
                  { src: '/works/aipaint/honghuang-tongtian/characters/叶辰/Q版三视图.png', title: 'Q版三视图' },
                ],
              },
              {
                name: '通天教主',
                images: [
                  { src: '/works/aipaint/honghuang-tongtian/characters/通天教主/通天教主立绘.png', title: '立绘' },
                  { src: '/works/aipaint/honghuang-tongtian/characters/通天教主/Q版立绘.png', title: 'Q版立绘' },
                  { src: '/works/aipaint/honghuang-tongtian/characters/通天教主/立绘三视图.png', title: '三视图' },
                  { src: '/works/aipaint/honghuang-tongtian/characters/通天教主/Q版三视图.png', title: 'Q版三视图' },
                ],
              },
            ],
          },
          {
            name: '场景资产',
            ratio: '16/9',
            images: [
              { src: '/works/aipaint/honghuang-tongtian/scenes/云端.png', title: '云端' },
              { src: '/works/aipaint/honghuang-tongtian/scenes/宫外平台.png', title: '宫外平台' },
              { src: '/works/aipaint/honghuang-tongtian/scenes/宫门外近景.png', title: '宫门外近景' },
              { src: '/works/aipaint/honghuang-tongtian/scenes/黑龙悬停.png', title: '黑龙悬停' },
              { src: '/works/aipaint/honghuang-tongtian/scenes/黑龙参考.png', title: '黑龙参考' },
            ],
          },
          {
            name: '道具资产',
            ratio: '1/1',
            images: [
              { src: '/works/aipaint/honghuang-tongtian/props/系统ui.png', title: '系统 UI' },
            ],
          },
        ],
      },
      {
        id: 'paint-zombie',
        title: '中世纪丧尸围城，地下堡垒',
        subtitle: 'AI 绘画 · 末日丧尸题材',
        cover: '/works/aipaint/zombie-siege/cover.jpeg',
        count: 19,
        groups: [
          {
            name: '人物资产',
            characters: [
              {
                name: '丧尸组',
                images: [
                  { src: '/works/aipaint/zombie-siege/characters/丧尸/普通丧尸.png', title: '普通丧尸' },
                  { src: '/works/aipaint/zombie-siege/characters/丧尸/武装丧尸.png', title: '武装丧尸' },
                  { src: '/works/aipaint/zombie-siege/characters/丧尸/精英丧尸.png', title: '精英丧尸' },
                ],
              },
              {
                name: '幸存者组',
                images: [
                  { src: '/works/aipaint/zombie-siege/characters/侦察兵/侦察兵.png', title: '侦察兵' },
                  { src: '/works/aipaint/zombie-siege/characters/先锋/先锋.png', title: '先锋' },
                  { src: '/works/aipaint/zombie-siege/characters/医疗兵/医疗兵.png', title: '医疗兵' },
                ],
              },
              {
                name: '技术组',
                images: [
                  { src: '/works/aipaint/zombie-siege/characters/机械师/机械师.png', title: '机械师' },
                  { src: '/works/aipaint/zombie-siege/characters/狙击手/狙击手.png', title: '狙击手' },
                  { src: '/works/aipaint/zombie-siege/characters/狙击手/狙击手2.png', title: '狙击手 2' },
                ],
              },
            ],
          },
          {
            name: '场景资产',
            ratio: '16/9',
            images: [
              { src: '/works/aipaint/zombie-siege/scenes/地下堡垒.png', title: '地下堡垒' },
              { src: '/works/aipaint/zombie-siege/scenes/地下矿场.png', title: '地下矿场' },
              { src: '/works/aipaint/zombie-siege/scenes/地表丧尸围城.png', title: '地表丧尸围城' },
              { src: '/works/aipaint/zombie-siege/scenes/堡垒核心大厅.png', title: '堡垒核心大厅' },
              { src: '/works/aipaint/zombie-siege/scenes/楼顶制高点.png', title: '楼顶制高点' },
              { src: '/works/aipaint/zombie-siege/scenes/研发室武器升级台.png', title: '研发室武器升级台' },
              { src: '/works/aipaint/zombie-siege/scenes/能源动力舱.png', title: '能源动力舱' },
            ],
          },
          {
            name: '道具资产',
            ratio: '1/1',
            images: [
              { src: '/works/aipaint/zombie-siege/props/医疗兵专属医疗包.png', title: '医疗兵专属医疗包' },
              { src: '/works/aipaint/zombie-siege/props/狙击枪.png', title: '狙击枪' },
              { src: '/works/aipaint/zombie-siege/props/通用物资背包.png', title: '通用物资背包' },
            ],
          },
        ],
      },
    ],
    singleWorks: [],
  },
  {
    id: 'ad',
    name: '商业广告',
    title: 'AI信息流',
    desc: 'AI 驱动的商业广告创意与制作，从概念到成片，打造具有视觉冲击力的广告作品。',
    fullDesc: [
      '为品牌提供 AI 创意广告全案服务',
      '包含创意概念、视觉设计、动态呈现等完整制作流程',
      '作品覆盖电商广告、品牌宣传片、社交媒体素材等商业场景',
    ],
    tags: ['Midjourney', 'After Effects', 'Runway'],
    year: '2024',
    type: '商业广告',
    gradient: 'linear-gradient(135deg, #2d0a1e 0%, #4a1033 50%, #1a0515 100%)',
    accent: '#ec4899',
    bgColor: '#1a0812',
    colors: ['#ec4899', '#f472b6', '#f9a8d4'],
    image: '/projects/project-03.jpg',
    workCount: 4,
    projects: [
      {
        id: 'cleanser',
        title: '洗面奶 · AI信息流',
        subtitle: '封面 + 立绘 + 三视图 + 产品 + 故事板 + 视频',
        cover: '/works/commercial/cleanser/cover-wide.jpeg',
        count: 6,
        hasVideo: true,
        videoUrl: 'https://www.bilibili.com/video/BV1DUtb6gEVb/',
        videoType: 'bilibili',
        groups: [
          {
            name: '封面',
            aspectRatio: '9 / 16',
            images: [
              { src: '/works/commercial/cleanser/cover.jpg', title: '封面' },
            ],
          },
          {
            name: '素材',
            layout: 'material',
            images: [
              { src: '/works/commercial/cleanser/character.png', title: '人物立绘', aspectRatio: '3 / 4' },
              { src: '/works/commercial/cleanser/three-view.png', title: '人物三视图', aspectRatio: '4 / 3' },
              { src: '/works/commercial/cleanser/product.png', title: '产品图', aspectRatio: '3 / 4' },
            ],
          },
          {
            name: '故事板',
            layout: 'storyboard',
            images: [
              { src: '/works/commercial/cleanser/storyboard.png', title: '分镜故事板' },
            ],
          },
        ],
      },
      {
        id: 'gaming-chair',
        title: '电竞椅 · AI信息流',
        subtitle: '封面 + 立绘 + 三视图 + 产品 + 故事板 + 视频',
        cover: '/works/commercial/gaming-chair/cover-wide.jpeg',
        count: 6,
        hasVideo: true,
        videoUrl: 'https://www.bilibili.com/video/BV1Q2tb6rEuu/',
        groups: [
          {
            name: '封面',
            aspectRatio: '9 / 16',
            images: [
              { src: '/works/commercial/gaming-chair/cover.jpg', title: '封面' },
            ],
          },
          {
            name: '素材',
            layout: 'material',
            images: [
              { src: '/works/commercial/gaming-chair/character.png', title: '人物立绘', aspectRatio: '3 / 4' },
              { src: '/works/commercial/gaming-chair/three-view.png', title: '人物三视图', aspectRatio: '4 / 3' },
              { src: '/works/commercial/gaming-chair/product.png', title: '产品图', aspectRatio: '3 / 4' },
            ],
          },
          {
            name: '故事板',
            layout: 'storyboard',
            images: [
              { src: '/works/commercial/gaming-chair/storyboard.png', title: '分镜故事板' },
            ],
          },
        ],
      },
      {
        id: 'headphone',
        title: '耳机 · AI信息流',
        subtitle: '封面 + 立绘 + 三视图 + 产品 + 故事板 + 视频',
        cover: '/works/commercial/headphone/cover-wide.jpeg',
        count: 6,
        hasVideo: true,
        videoUrl: 'https://www.bilibili.com/video/BV1hUtb6gEhL/',
        groups: [
          {
            name: '封面',
            aspectRatio: '9 / 16',
            images: [
              { src: '/works/commercial/headphone/cover.jpg', title: '封面' },
            ],
          },
          {
            name: '素材',
            layout: 'material',
            images: [
              { src: '/works/commercial/headphone/character.png', title: '人物立绘', aspectRatio: '3 / 4' },
              { src: '/works/commercial/headphone/three-view.png', title: '人物三视图', aspectRatio: '4 / 3' },
              { src: '/works/commercial/headphone/product.png', title: '产品图', aspectRatio: '3 / 4' },
            ],
          },
          {
            name: '故事板',
            layout: 'storyboard',
            images: [
              { src: '/works/commercial/headphone/storyboard.png', title: '分镜故事板' },
            ],
          },
        ],
      },
      {
        id: 'shoes',
        title: '鞋子 · AI信息流',
        subtitle: '封面 + 立绘 + 三视图 + 产品 + 故事板 + 视频',
        cover: '/works/commercial/shoes/cover-wide.jpeg',
        count: 6,
        hasVideo: true,
        videoUrl: 'https://www.bilibili.com/video/BV1tRtb6KEcy/',
        groups: [
          {
            name: '封面',
            aspectRatio: '9 / 16',
            images: [
              { src: '/works/commercial/shoes/cover.jpg', title: '封面' },
            ],
          },
          {
            name: '素材',
            layout: 'material',
            images: [
              { src: '/works/commercial/shoes/character.png', title: '人物立绘', aspectRatio: '3 / 4' },
              { src: '/works/commercial/shoes/three-view.png', title: '人物三视图', aspectRatio: '4 / 3' },
              { src: '/works/commercial/shoes/product.png', title: '产品图', aspectRatio: '3 / 4' },
            ],
          },
          {
            name: '故事板',
            layout: 'storyboard',
            images: [
              { src: '/works/commercial/shoes/storyboard.png', title: '分镜故事板' },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'video',
    name: 'AI视频',
    title: '动态叙事',
    desc: 'AI 视频生成与后期制作，将静态画面转化为动态影像，讲述引人入胜的视觉故事。',
    fullDesc: [
      '熟练使用可灵、即梦、Runway 等 AI 视频生成工具',
      '掌握从静图到视频、视频到视频的多种生成技巧',
      '结合后期剪辑，完成高质量 AI 动态影像作品',
    ],
    tags: ['可灵', '即梦', 'Runway'],
    year: '2024',
    type: 'AI 视频',
    gradient: 'linear-gradient(135deg, #0a2028 0%, #103040 50%, #0a1520 100%)',
    accent: '#06b6d4',
    bgColor: '#061a20',
    colors: ['#06b6d4', '#22d3ee', '#67e8f9'],
    image: '/works/aivideo/drama-shidi-cover.png',
    workCount: 6,
    projects: [
      {
        id: 'drama-shidi',
        title: '师弟们都是大佬，那我躺平了',
        subtitle: 'AI 短剧 · 玄幻',
        cover: '/works/aivideo/drama-shidi-cover.png',
        coverV: '/works/aivideo/drama-shidi-cover-v.png',
        count: 3,
        hasVideo: true,
        videoUrl: 'https://www.bilibili.com/video/BV1mE4f6EE7m/',
        videoType: 'bilibili',
        videos: [
          { title: '第一集', url: 'https://www.bilibili.com/video/BV1mE4f6EE7m/', cover: '/works/aivideo/drama-shidi-cover-v.png' },
          { title: '第二集', url: 'https://www.bilibili.com/video/BV1Uj4f6SEBz/', cover: '/works/aivideo/drama-shidi-cover-v.png' },
        ],
        groups: [
          {
            name: '封面',
            ratio: '9/16',
            images: [
              { src: '/works/aivideo/drama-shidi-cover-v.png', title: '竖版封面' },
            ],
          },
        ],
      },
      {
        id: 'drama-changsheng',
        title: '开局长生，苟在下届吃土飞升',
        subtitle: 'AI 短剧 · 玄幻',
        cover: '/works/aivideo/drama-changsheng-cover.png',
        coverV: '/works/aivideo/drama-changsheng-cover-v.png',
        count: 4,
        hasVideo: true,
        videoUrl: 'https://www.bilibili.com/video/BV143hw6aETZ/',
        videoType: 'bilibili',
        videos: [
          { title: '第一集', url: 'https://www.bilibili.com/video/BV143hw6aETZ/', cover: '/works/aivideo/drama-changsheng-cover-v.png' },
        ],
        groups: [
          {
            name: '封面',
            ratio: '9/16',
            images: [
              { src: '/works/aivideo/drama-changsheng-cover-v.png', title: '竖版封面' },
            ],
          },
        ],
      },
      {
        id: 'drama-honghuang',
        title: '洪荒，我爹是通天教主',
        subtitle: 'AI 短剧 · 洪荒',
        cover: '/works/aivideo/drama-honghuang-cover.jpg',
        coverV: '/works/aivideo/drama-honghuang-cover-v.png',
        count: 1,
        hasVideo: true,
        videoUrl: 'https://www.bilibili.com/video/BV1JStE6fEXw/?spm_id_from=333.1387.homepage.video_card.click',
        groups: [
          {
            name: '封面',
            ratio: '9/16',
            images: [
              { src: '/works/aivideo/drama-honghuang-cover-v.png', title: '竖版封面' },
            ],
          },
        ],
      },
    ],
    singleWorks: [
      { src: '/works/aivideo/op-xiake-cover.png', title: '侠客行 · AI 片头', hasVideo: true, videoUrl: '' },
      { src: '/works/aivideo/op-xuanjie-cover.png', title: '玄界风云录 · AI 片头', hasVideo: true, videoUrl: '' },
      { src: '/works/aivideo/tiktok-game-cover.png', title: 'TikTok 游戏买量视频', hasVideo: true, videoUrl: '' },
    ],
  },
  {
    id: 'avatar',
    name: '数字人',
    title: '虚拟偶像',
    desc: 'AI 数字人创作与应用，从形象设计到动效驱动，打造栩栩如生的虚拟形象。',
    fullDesc: [
      '精通 HeyGen、D-ID 等数字人生成平台',
      '能够完成数字人形象设计、口型同步、动作驱动等全流程制作',
      '应用场景涵盖虚拟主播、品牌代言、教育培训等领域',
    ],
    tags: ['HeyGen', 'D-ID', 'Unreal Engine'],
    year: '2024',
    type: '数字人',
    gradient: 'linear-gradient(135deg, #1a0a30 0%, #2a1a4a 50%, #0f0520 100%)',
    accent: '#a855f7',
    bgColor: '#0d0620',
    colors: ['#a855f7', '#c084fc', '#d8b4fe'],
    image: '/works/digital-human/category-cover.png',
    workCount: 4,
    projects: [
      {
        id: 'dh-kmei',
        title: 'K妹',
        subtitle: '数字人 · 甜美女神',
        cover: '/works/digital-human/kmei/cover.png',
        coverAspect: '3 / 4',
        count: 3,
        hasVideo: true,
        videoUrl: 'https://www.bilibili.com/video/BV1Pgt36VEA8',
        videoType: 'bilibili',
        groups: [
          {
            name: '角色设计',
            characters: [
              {
                name: 'K妹',
                images: [
                  { src: '/works/digital-human/kmei/full-body.png', title: '立绘' },
                  { src: '/works/digital-human/kmei/three-view.png', title: '三视图' },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'dh-lele',
        title: '乐乐',
        subtitle: '数字人 · 元气少女',
        cover: '/works/digital-human/lele/cover.png',
        coverAspect: '3 / 4',
        count: 3,
        hasVideo: true,
        videoUrl: 'https://www.bilibili.com/video/BV1HVt363Ead',
        videoType: 'bilibili',
        groups: [
          {
            name: '角色设计',
            characters: [
              {
                name: '乐乐',
                images: [
                  { src: '/works/digital-human/lele/full-body.png', title: '立绘' },
                  { src: '/works/digital-human/lele/three-view.png', title: '三视图' },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'dh-xiaoke',
        title: '小可',
        subtitle: '数字人 · 可爱萌妹',
        cover: '/works/digital-human/xiaoke/cover.png',
        coverAspect: '3 / 4',
        count: 3,
        hasVideo: true,
        videoUrl: 'https://www.bilibili.com/video/BV1rftV67Ecp',
        videoType: 'bilibili',
        groups: [
          {
            name: '角色设计',
            characters: [
              {
                name: '小可',
                images: [
                  { src: '/works/digital-human/xiaoke/full-body.png', title: '立绘' },
                  { src: '/works/digital-human/xiaoke/three-view.png', title: '三视图' },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'dh-xiaoshuai',
        title: '小帅',
        subtitle: '数字人 · 阳光少年',
        cover: '/works/digital-human/xiaoshuai/cover.png',
        coverAspect: '3 / 4',
        count: 3,
        hasVideo: true,
        videoUrl: 'https://www.bilibili.com/video/BV1Agt36VEkm',
        videoType: 'bilibili',
        groups: [
          {
            name: '角色设计',
            characters: [
              {
                name: '小帅',
                images: [
                  { src: '/works/digital-human/xiaoshuai/half-body.png', title: '半身立绘' },
                  { src: '/works/digital-human/xiaoshuai/three-view.png', title: '三视图' },
                ],
              },
            ],
          },
        ],
      },
    ],
    singleWorks: [],
  },
  {
    id: 'ecommerce',
    name: '电商设计',
    title: '新消费',
    desc: 'AI 赋能的电商视觉设计，提升产品展示效果，驱动品牌销量增长。',
    fullDesc: [
      '为电商品牌提供 AI 驱动的视觉内容解决方案',
      '包含产品图生成、场景渲染、详情页设计、主图优化等',
      '帮助品牌降低拍摄成本，提升视觉品质与转化效率',
    ],
    tags: ['Midjourney', 'Photoshop', 'Figma'],
    year: '2024',
    type: '电商设计',
    gradient: 'linear-gradient(135deg, #0a2520 0%, #10352d 50%, #0a1a18 100%)',
    accent: '#14b8a6',
    bgColor: '#061a18',
    colors: ['#14b8a6', '#2dd4bf', '#5eead4'],
    image: '/works/ecommerce/category-cover.png',
    workCount: 7,
    projects: [
      {
        id: 'mouse-esports',
        title: '罗技鼠标 · 电竞风',
        subtitle: '主图 + SKU + 详情页 全案',
        cover: '/works/ecommerce/mouse-esports/main-1.jpg',
        coverAspect: '1 / 1',
        count: 20,
        groups: [
          {
            name: '主图',
            aspectRatio: '1 / 1',
            images: [
              { src: '/works/ecommerce/mouse-esports/main-1.jpg', title: '主图 1' },
              { src: '/works/ecommerce/mouse-esports/main-2.jpg', title: '主图 2' },
              { src: '/works/ecommerce/mouse-esports/main-3.jpg', title: '主图 3' },
              { src: '/works/ecommerce/mouse-esports/main-4.jpg', title: '主图 4' },
              { src: '/works/ecommerce/mouse-esports/main-5.jpg', title: '主图 5' },
            ],
          },
          {
            name: 'SKU',
            aspectRatio: '3 / 4',
            images: [
              { src: '/works/ecommerce/mouse-esports/sku-1.png', title: 'SKU 1' },
              { src: '/works/ecommerce/mouse-esports/sku-2.png', title: 'SKU 2' },
              { src: '/works/ecommerce/mouse-esports/sku-3.png', title: 'SKU 3' },
              { src: '/works/ecommerce/mouse-esports/sku-4.png', title: 'SKU 4' },
              { src: '/works/ecommerce/mouse-esports/sku-5.png', title: 'SKU 5' },
            ],
          },
          {
            name: '详情页',
            aspectRatio: '3 / 4',
            images: [
              { src: '/works/ecommerce/mouse-esports/detail-1.png', title: '详情页 1' },
              { src: '/works/ecommerce/mouse-esports/detail-2.png', title: '详情页 2' },
              { src: '/works/ecommerce/mouse-esports/detail-3.png', title: '详情页 3' },
              { src: '/works/ecommerce/mouse-esports/detail-4.png', title: '详情页 4' },
              { src: '/works/ecommerce/mouse-esports/detail-5.png', title: '详情页 5' },
              { src: '/works/ecommerce/mouse-esports/detail-6.png', title: '详情页 6' },
              { src: '/works/ecommerce/mouse-esports/detail-7.png', title: '详情页 7' },
              { src: '/works/ecommerce/mouse-esports/detail-8.png', title: '详情页 8' },
              { src: '/works/ecommerce/mouse-esports/detail-9.png', title: '详情页 9' },
              { src: '/works/ecommerce/mouse-esports/detail-10.png', title: '详情页 10' },
            ],
          },
        ],
      },
      {
        id: 'mouse-minimal',
        title: '罗技鼠标 · 简约风',
        subtitle: '主图 + SKU + 详情页 全案',
        cover: '/works/ecommerce/mouse-minimal/main-1.png',
        coverAspect: '1 / 1',
        count: 18,
        groups: [
          {
            name: '主图',
            aspectRatio: '1 / 1',
            images: [
              { src: '/works/ecommerce/mouse-minimal/main-1.png', title: '主图 1' },
              { src: '/works/ecommerce/mouse-minimal/main-2.png', title: '主图 2' },
              { src: '/works/ecommerce/mouse-minimal/main-3.png', title: '主图 3' },
              { src: '/works/ecommerce/mouse-minimal/main-4.png', title: '主图 4' },
              { src: '/works/ecommerce/mouse-minimal/main-5.png', title: '主图 5' },
            ],
          },
          {
            name: 'SKU',
            aspectRatio: '3 / 4',
            images: [
              { src: '/works/ecommerce/mouse-minimal/sku-1.png', title: 'SKU 1' },
              { src: '/works/ecommerce/mouse-minimal/sku-2.png', title: 'SKU 2' },
              { src: '/works/ecommerce/mouse-minimal/sku-3.png', title: 'SKU 3' },
              { src: '/works/ecommerce/mouse-minimal/sku-4.png', title: 'SKU 4' },
              { src: '/works/ecommerce/mouse-minimal/sku-5.png', title: 'SKU 5' },
            ],
          },
          {
            name: '详情页',
            aspectRatio: '3 / 4',
            images: [
              { src: '/works/ecommerce/mouse-minimal/detail-1.png', title: '详情页 1' },
              { src: '/works/ecommerce/mouse-minimal/detail-2.png', title: '详情页 2' },
              { src: '/works/ecommerce/mouse-minimal/detail-3.png', title: '详情页 3' },
              { src: '/works/ecommerce/mouse-minimal/detail-4.png', title: '详情页 4' },
              { src: '/works/ecommerce/mouse-minimal/detail-5.png', title: '详情页 5' },
              { src: '/works/ecommerce/mouse-minimal/detail-6.png', title: '详情页 6' },
              { src: '/works/ecommerce/mouse-minimal/detail-7.png', title: '详情页 7' },
              { src: '/works/ecommerce/mouse-minimal/detail-8.png', title: '详情页 8' },
            ],
          },
        ],
      },
    ],
    singleWorks: [
      { src: '/works/ecommerce/3.png', title: '冲锋衣 电商套图' },
      { src: '/works/ecommerce/4.png', title: '吹风机 电商主图' },
      { src: '/works/ecommerce/5.png', title: '鞋子 电商套图' },
      { src: '/works/ecommerce/6.png', title: '音响 电商主图' },
      { src: '/works/ecommerce/7.jpg', title: 'AI融图 产品场景' },
      { src: '/works/ecommerce/9.png', title: 'AI融图 创意合成' },
    ],
  },
]

export default function Projects() {
  const sectionRef = useRef(null)
  const displayRef = useRef(null)
  const galleryRef = useRef(null)
  const [view, setView] = useState('overview') // 'overview' | 'gallery' | 'projectDetail'
  const [activeIndex, setActiveIndex] = useState(0)
  const [activeProjectId, setActiveProjectId] = useState(null)
  const [lightboxSrc, setLightboxSrc] = useState(null)
  const [lightboxTitle, setLightboxTitle] = useState('')
  const active = CATEGORIES[activeIndex]
  const activeProject = active.projects?.find(p => p.id === activeProjectId)

  useSectionTitleReveal({ sectionRef, labelSelector: '.section-label', titleSelector: '.section-title', subtitleSelector: '.section-subtitle' })

  // Display area animation on scroll
  useEffect(() => {
    if (view !== 'overview') return
    const display = displayRef.current
    if (!display) return

    const ctx = gsap.context(() => {
      gsap.set(display, { y: 80, opacity: 0 })

      gsap.to(display, {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: display,
          start: 'top 80%',
          once: true,
        },
      })
    }, display)

    return () => ctx.revert()
  }, [view])

  // Gallery animation
  useEffect(() => {
    if (view !== 'gallery') return
    const gallery = galleryRef.current
    if (!gallery) return

    const ctx = gsap.context(() => {
      const cards = gallery.querySelectorAll('.work-card')
      gsap.set(cards, { y: 40, opacity: 0 })
      gsap.to(cards, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.08,
        delay: 0.1,
      })
    }, gallery)

    return () => ctx.revert()
  }, [view, activeIndex])

  // Image fade transition when switching tabs (overview mode)
  useEffect(() => {
    if (view !== 'overview') return
    const img = displayRef.current?.querySelector('.project-display-img')
    if (!img) return
    gsap.fromTo(img,
      { opacity: 0, scale: 1.05 },
      { opacity: 1, scale: 1, duration: 0.6, ease: 'power2.out' }
    )
  }, [activeIndex, view])

  const handleTabClick = (idx) => {
    setActiveIndex(idx)
  }

  const handleViewWorks = (idx) => {
    setActiveIndex(idx)
    setView('gallery')
  }

  const handleBack = () => {
    if (view === 'projectDetail') {
      setView('gallery')
      setActiveProjectId(null)
    } else {
      setView('overview')
    }
  }

  const handleOpenProject = (projectId) => {
    setActiveProjectId(projectId)
    setView('projectDetail')
  }

  return (
    <section id="projects" className="projects-section" ref={sectionRef}>
      <div className="container">
        <div className="section-header">
          <div>
            <span className="section-label">Projects</span>
            <h2 className="section-title">作品展示</h2>
          </div>
          <p className="section-subtitle">
            精选五大领域作品，展示 AIGC 驱动的视觉创意能力
          </p>
        </div>

        {view === 'overview' && (
          <>
            {/* 上方大图展示区 */}
            <div className="project-display" ref={displayRef}>
              <div className="project-display-left">
                <span className="project-display-category" style={{ color: active.accent }}>
                  {active.name}
                </span>
                <h3 className="project-display-title">《{active.title}》</h3>
                <ul className="project-display-list">
                  {active.fullDesc.map((item, i) => (
                    <li key={i} className="project-display-list-item">
                      <span className="project-display-list-num" style={{ background: active.accent }}>{i + 1}</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div
                className="project-display-right"
                style={{ background: active.gradient }}
              >
                <img
                  src={active.image}
                  alt={active.title}
                  className="project-display-img"
                  key={active.id}
                />
                <div className="project-display-glow" style={{ background: `radial-gradient(circle at 30% 40%, ${active.accent}40 0%, transparent 60%)` }} />
              </div>
            </div>

            {/* 下方分类卡片 */}
            <div className="project-cards">
              {CATEGORIES.map((cat, idx) => (
                <div
                  key={cat.id}
                  className={`project-card-item ${activeIndex === idx ? 'active' : ''}`}
                  style={{
                    '--card-accent': cat.accent,
                  }}
                >
                  <div
                    className="project-card-item-inner"
                    onClick={() => handleTabClick(idx)}
                  >
                    <div className="project-card-item-header">
                      <span className="project-card-item-index">0{idx + 1}</span>
                    </div>
                    <h4 className="project-card-item-title">{cat.name}</h4>
                    <p className="project-card-item-desc">{cat.desc}</p>
                  </div>
                  <button
                    className="project-card-item-btn"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleViewWorks(idx)
                    }}
                  >
                    查看作品
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </>
        )}

        {view === 'gallery' && (
          <div className="project-gallery" ref={galleryRef}>
            {/* 返回按钮 */}
            <button className="gallery-back" onClick={handleBack}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
              返回作品展示
            </button>

            {/* 分类标题 */}
            <div className="gallery-header">
              <span className="gallery-category" style={{ color: active.accent }}>
                {active.name}
              </span>
              <h3 className="gallery-title">《{active.title}》</h3>
              <p className="gallery-subtitle">精选作品合集</p>
            </div>

            {/* 项目专辑 */}
            {active.projects && active.projects.length > 0 && (
              <div className="gallery-section">
                <h4 className="gallery-section-title">
                  <span className="gallery-section-line" style={{ background: active.accent }} />
                  项目专辑
                </h4>
                <div className="project-album-grid">
                  {active.projects.map((proj) => (
                    <div
                      key={proj.id}
                      className="project-album-card"
                      onClick={() => handleOpenProject(proj.id)}
                      style={{ '--album-accent': active.accent }}
                    >
                      <div className="project-album-cover" style={proj.coverAspect ? { aspectRatio: proj.coverAspect } : undefined}>
                        <img src={proj.cover} alt={proj.title} className="project-album-cover-img" />
                        <div className="project-album-cover-overlay" />
                        <div className="project-album-count">
                          <span>{proj.count}</span>
                          <span className="project-album-count-label">张</span>
                        </div>
                      </div>
                      <div className="project-album-info">
                        <h5 className="project-album-title">{proj.title}</h5>
                        <p className="project-album-subtitle">{proj.subtitle}</p>
                        <div className="project-album-action">
                          查看全部
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12" />
                            <polyline points="12 5 19 12 12 19" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 单图作品 */}
            {active.singleWorks && active.singleWorks.length > 0 && (
              <div className="gallery-section">
                <h4 className="gallery-section-title">
                  <span className="gallery-section-line" style={{ background: active.accent }} />
                  精选作品
                </h4>
                <div className="work-grid">
                  {active.singleWorks.map((work, i) => (
                    work.hasVideo && work.videoUrl ? (
                      <a
                        key={i}
                        href={work.videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="work-card work-card-video"
                        style={{ '--work-accent': active.accent }}
                      >
                        <img src={work.src} alt={work.title} className="work-card-img" />
                        <div className="work-card-overlay">
                          <div className="work-card-play-btn">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                              <polygon points="6 4 20 12 6 20 6 4" />
                            </svg>
                          </div>
                          <span className="work-card-title">{work.title}</span>
                        </div>
                      </a>
                    ) : (
                      <div
                        key={i}
                        className="work-card"
                        style={{ '--work-accent': active.accent }}
                        onClick={() => {
                          setLightboxSrc(work.src)
                          setLightboxTitle(work.title)
                        }}
                      >
                        <img src={work.src} alt={work.title} className="work-card-img" />
                        <div className="work-card-overlay">
                          <span className="work-card-title">{work.title}</span>
                        </div>
                      </div>
                    )
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {view === 'projectDetail' && activeProject && (
          <div className="project-gallery" ref={galleryRef}>
            {/* 返回按钮 */}
            <button className="gallery-back" onClick={handleBack}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
              返回 {active.name}
            </button>

            {/* 项目标题 */}
            <div className="gallery-header">
              <span className="gallery-category" style={{ color: active.accent }}>
                {active.name} · 项目专辑
              </span>
              <h3 className="gallery-title">{activeProject.title}</h3>
              <p className="gallery-subtitle">{activeProject.subtitle}</p>
            </div>

            {/* 顶部：左封面 + 右视频 */}
            <div className="project-detail-top">
              {/* 封面 */}
              {activeProject.groups[0]?.name === '封面' && activeProject.groups[0].images[0] && (
                <div className="project-detail-cover-wrap">
                  <h4 className="gallery-section-title" style={{ marginBottom: '16px' }}>
                    <span className="gallery-section-line" style={{ background: active.accent }} />
                    封面
                  </h4>
                  <div
                    className="project-detail-cover"
                    onClick={() => {
                      setLightboxSrc(activeProject.groups[0].images[0].src)
                      setLightboxTitle('封面')
                    }}
                  >
                    <img
                      src={activeProject.groups[0].images[0].src}
                      alt={activeProject.title}
                      className="project-detail-cover-img"
                    />
                    <div className="project-detail-cover-hint">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="15 3 21 3 21 9" />
                        <polyline points="9 21 3 21 3 15" />
                        <line x1="21" y1="3" x2="14" y2="10" />
                        <line x1="3" y1="21" x2="10" y2="14" />
                      </svg>
                      点击放大
                    </div>
                  </div>
                </div>
              )}

              {/* 视频 */}
              {activeProject.hasVideo && (
                <div className="project-detail-video">
                  <h4 className="gallery-section-title" style={{ marginBottom: '16px' }}>
                    <span className="gallery-section-line" style={{ background: active.accent }} />
                    成片视频
                  </h4>
                  {activeProject.videos && activeProject.videos.length > 0 ? (
                    <div className="project-videos-grid">
                      {activeProject.videos.map((v, i) => (
                        <a
                          key={i}
                          href={v.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="project-video-link"
                          style={{ '--video-accent': active.accent }}
                        >
                          <img src={v.cover} alt={v.title} className="project-video-link-cover" />
                          <div className="project-video-link-overlay">
                            <div className="project-video-link-play">
                              <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                                <polygon points="6 4 20 12 6 20 6 4" />
                              </svg>
                            </div>
                            <span className="project-video-link-text">{v.title}</span>
                            <span className="project-video-link-arrow">
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M7 17L17 7" />
                                <path d="M7 7h10v10" />
                              </svg>
                            </span>
                          </div>
                        </a>
                      ))}
                    </div>
                  ) : activeProject.videoUrl ? (
                    <a
                      href={activeProject.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-video-link"
                      style={{ '--video-accent': active.accent }}
                    >
                      <img src={activeProject.cover} alt="视频封面" className="project-video-link-cover" />
                      <div className="project-video-link-overlay">
                        <div className="project-video-link-play">
                          <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                            <polygon points="6 4 20 12 6 20 6 4" />
                          </svg>
                        </div>
                        <span className="project-video-link-text">点击观看完整视频</span>
                        <span className="project-video-link-arrow">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M7 17L17 7" />
                            <path d="M7 7h10v10" />
                          </svg>
                        </span>
                      </div>
                    </a>
                  ) : (
                    <div className="project-video-placeholder">
                      <div className="project-video-placeholder-icon">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <polygon points="23 7 16 12 23 17 23 7" />
                          <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                        </svg>
                      </div>
                      <p className="project-video-placeholder-text">视频链接待添加</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* 设计素材 */}
            {activeProject.groups.filter(g => g.name !== '封面').length > 0 && (
              <div className="gallery-section">
                <h4 className="gallery-section-title">
                  <span className="gallery-section-line" style={{ background: active.accent }} />
                  设计素材
                </h4>
                {activeProject.groups
                  .filter(g => g.name !== '封面')
                  .map((group, gi) => (
                    <div key={gi} className="design-group">
                      <h5 className="design-group-title">{group.name}</h5>
                      {group.characters ? (
                        <div className="character-list">
                          {group.characters.map((char, ci) => (
                            <div key={ci} className="character-block">
                              <div className="character-name">{char.name}</div>
                              <div className="character-images">
                                {char.images.map((img, ii) => (
                                  <div
                                    key={ii}
                                    className="work-card character-card"
                                    style={{
                                      '--work-accent': active.accent,
                                      aspectRatio: img.aspectRatio || '3 / 4',
                                    }}
                                    onClick={() => {
                                      setLightboxSrc(img.src)
                                      setLightboxTitle(img.title)
                                    }}
                                  >
                                    <img src={img.src} alt={img.title} className="work-card-img" />
                                    <div className="work-card-overlay">
                                      <span className="work-card-title">{img.title}</span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className={`work-grid ${group.layout === 'material' ? 'material-grid' : ''} ${group.layout === 'storyboard' ? 'storyboard-grid' : ''} ${group.name === '道具资产' ? 'prop-grid' : ''}`}>
                          {group.images.map((img, i) => (
                            <div
                              key={i}
                              className={`work-card ${group.layout === 'material' ? 'material-card' : ''} ${group.layout === 'storyboard' ? 'storyboard-card' : ''} ${group.name === '道具资产' ? 'prop-card' : ''}`}
                              style={{
                                '--work-accent': active.accent,
                                aspectRatio: img.aspectRatio || group.aspectRatio || group.ratio || '3 / 4',
                              }}
                              onClick={() => {
                                setLightboxSrc(img.src)
                                setLightboxTitle(img.title)
                              }}
                            >
                              <img src={img.src} alt={img.title} className="work-card-img" />
                              <div className="work-card-overlay">
                                <span className="work-card-title">{img.title}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* 图片灯箱 */}
      {lightboxSrc && (
        <div className="lightbox" onClick={() => setLightboxSrc(null)}>
          <button className="lightbox-close" onClick={(e) => { e.stopPropagation(); setLightboxSrc(null) }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
          <img src={lightboxSrc} alt={lightboxTitle} className="lightbox-img" onClick={(e) => e.stopPropagation()} />
          <div className="lightbox-caption">{lightboxTitle}</div>
        </div>
      )}
    </section>
  )
}
