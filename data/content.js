export const SITE_DATA = {
  profile: {
    nameEn: "Qirui Liu",
    nameZh: "刘骐瑞",
    role: "Master’s Student in Computer Science",
    institution: "Zhejiang University",
    institutionUrl: "https://www.zju.edu.cn/english/",
    department: "College of Computer Science and Technology",
    departmentUrl: "https://www.cs.zju.edu.cn/",
    advisor: {
      name: "Dr. Zhixuan Chu",
      url: "https://scholar.google.com/citations?hl=zh-CN&user=a4IuTngAAAAJ"
    },
    prevAdvisor: {
      name: "Changming Xu",
      url: "https://scholar.google.com/citations?hl=zh-CN&user=8FMUXwgAAAAJ&view_op=list_works&sortby=pubdate"
    },
    email: "zjulqr@gmail.com",
    portrait: "assets/portrait.png",
    tagline: "Advancing safe, efficient reasoning and agentic intelligence.",
    summary:
      "I am a Master’s student at Zhejiang University advised by Dr. Zhixuan Chu. My research focuses on safety alignment of large reasoning models, efficient on-policy self-distillation, and reinforcement learning for language agents—exploring how models learn from their own experience to reason, interact, and align reliably.",
    socials: [
      {
        label: "Google Scholar",
        href: "https://scholar.google.com/citations?user=St1xlXQAAAAJ&hl=zh-CN",
        icon: "scholar"
      },
      {
        label: "GitHub",
        href: "https://github.com/neuqrui",
        icon: "github"
      },
      {
        label: "Hugging Face",
        href: "https://huggingface.co/neuqrui",
        icon: "hf"
      },
      {
        label: "Email",
        href: "mailto:zjulqr@gmail.com",
        icon: "mail"
      }
    ]
  },

  news: [
    {
      date: "2026.11",
      emoji: "🚀",
      html: 'We released <a href="https://modelscope.cn/models/neu67r/Saferl-DeepSeek-R1-671B" target="_blank" rel="noopener noreferrer">Saferl-DeepSeek-R1-671B</a>, a safety-aligned DeepSeek-R1-671B model, as part of our <strong>SAVeR²</strong> results, demonstrating safety alignment at the <strong>671B scale</strong>.'
    },
    {
      date: "2026.09",
      emoji: "🎉",
      html: 'Our work <a href="https://www.alphaxiv.org/abs/2611.07482" target="_blank" rel="noopener noreferrer">SAVeR²</a> was accepted by <strong>NeurIPS 2026 (Poster)</strong>!'
    }
  ],

  pillars: [
    {
      eyebrow: "01 · SAFETY ALIGNMENT",
      title: "Reasoning-Preserving Safety",
      description:
        "Scaling verifiable safety rewards and decoupling spurious shortcuts so large reasoning models stay safe without sacrificing reasoning depth or suffering over-refusal.",
      papers: ["SAVeR²", "DeShortcut-Align"],
      accent: "blue"
    },
    {
      eyebrow: "02 · SELF-DISTILLATION",
      title: "Selective On-Policy Learning",
      description:
        "Pinpointing safety-critical tokens and critical decision steps to halve rollout compute and concentrate updates on the highest-leverage ~2% of tokens.",
      papers: ["EOPSA", "SCOPE"],
      accent: "teal"
    },
    {
      eyebrow: "03 · AGENTIC & OMNIMODAL",
      title: "Agents, Environments & Modalities",
      description:
        "Building self-correcting agentic RL pipelines, verifiable coding sandboxes, and training-free modality routing fixes for reliable multimodal reasoning.",
      papers: ["SCOPE", "CaRe"],
      accent: "indigo"
    }
  ],

  papers: [
    {
      id: "saver",
      shortTitle: "SAVeR²",
      title: "SAVeR²: Reasoning-based Safety Alignment for Large Reasoning Models via Verifiable Rewards",
      venue: "NeurIPS 2026 · Poster",
      year: 2026,
      type: "publication",
      featured: true,
      topics: ["Safety Alignment", "Reasoning Models"],
      authors: [
        { name: "Yichen Sun*", me: false },
        { name: "Qirui Liu*", me: true },
        { name: "Yan Wang", me: false },
        { name: "Jianan Lin", me: false },
        { name: "Linbo Jiang", me: false },
        { name: "Shiyu Wang", me: false },
        { name: "Zhibo Wang", me: false },
        { name: "Zhixuan Chu", me: false }
      ],
      summary:
        "Combines verifiable safety rewards, difficulty-aware data selection, and reasoning-preserving gradient projection for safer reasoning models—scaling all the way to DeepSeek-R1 at 671B parameters with an open model release.",
      metricHighlight: "671B Open Safety-Aligned Model",
      image: "assets/saver-method.png",
      imageAlt:
        "SAVeR² method: safety reasoning warm-up, difficulty-aware data selection, and reasoning-preserving safety alignment",
      links: [
        { label: "Paper", href: "https://www.alphaxiv.org/abs/2611.07482", primary: true },
        { label: "671B Model", href: "https://modelscope.cn/models/neu67r/Saferl-DeepSeek-R1-671B" }
      ],
      bibtex: `@inproceedings{sun2026saver2,
  title     = {SAVeR^2: Reasoning-based Safety Alignment for Large Reasoning Models via Verifiable Rewards},
  author    = {Sun, Yichen and Liu, Qirui and Wang, Yan and Lin, Jianan and Jiang, Linbo and Wang, Shiyu and Wang, Zhibo and Chu, Zhixuan},
  booktitle = {Advances in Neural Information Processing Systems (NeurIPS)},
  year      = {2026},
  url       = {https://www.alphaxiv.org/abs/2611.07482}
}`
    },
    {
      id: "eopsa",
      shortTitle: "EOPSA",
      title: "EOPSA: Efficient On-Policy Self-Distilled Safety Alignment",
      venue: "Preprint · 2026",
      year: 2026,
      type: "preprint",
      featured: false,
      topics: ["Safety Alignment", "Self-Distillation"],
      authors: [
        { name: "Qirui Liu", me: true },
        { name: "Yichen Sun", me: false },
        { name: "Yan Wang", me: false },
        { name: "Yu Mi", me: false },
        { name: "Wei Cao", me: false },
        { name: "Yue Shen", me: false },
        { name: "Zhixuan Chu", me: false },
        { name: "Kui Ren", me: false }
      ],
      summary:
        "Efficient on-policy safety distillation that halves rollout compute through adaptive scheduling and selectively updates only ~2% of safety-critical tokens while preserving general reasoning.",
      metricHighlight: "2× Faster Rollout · ~2% Token Updates",
      image: "assets/eopsa-method.svg",
      imageAlt:
        "EOPSA method: Adaptive Rollout Scheduling and Selective Distillation of safety-critical tokens",
      githubRepo: "neuqrui/EOPSA",
      githubStarsSnapshot: 24,
      links: [
        { label: "Paper", href: "https://arxiv.org/abs/2609.34519", primary: true },
        { label: "Code", href: "https://github.com/neuqrui/EOPSA", repo: "neuqrui/EOPSA", stars: 24 },
        { label: "Project", href: "https://neuqrui.github.io/EOPSA-page/" },
        { label: "Models", href: "https://huggingface.co/collections/neuqrui/eopsa" }
      ],
      bibtex: `@article{liu2026eopsa,
  title   = {EOPSA: Efficient On-Policy Self-Distilled Safety Alignment},
  author  = {Liu, Qirui and Sun, Yichen and Wang, Yan and Mi, Yu and Cao, Wei and Shen, Yue and Chu, Zhixuan and Ren, Kui},
  journal = {arXiv preprint arXiv:2609.34519},
  year    = {2026}
}`
    },
    {
      id: "scope",
      shortTitle: "SCOPE",
      title: "SCOPE: Selective Critical-Step On-Policy Self-Distillation for Agentic Reinforcement Learning",
      venue: "Preprint · 2026",
      year: 2026,
      type: "preprint",
      featured: false,
      topics: ["Agentic RL", "Self-Distillation"],
      authors: [
        { name: "Qirui Liu*", me: true },
        { name: "Wei Cao*", me: false },
        { name: "Yu Mi", me: false },
        { name: "Yichen Sun", me: false },
        { name: "Xuekun Zhang", me: false },
        { name: "Lei Liu", me: false },
        { name: "Yue Shen", me: false },
        { name: "Zhixuan Chu", me: false }
      ],
      summary:
        "Learns from self-generated, step-specific corrective skills with efficiency-aware GRPO to boost multi-turn agent success rates and cut redundant environment interactions.",
      metricHighlight: "Critical-Step Self-Distillation for Agents",
      image: "assets/scope-overview.png",
      imageAlt:
        "SCOPE overview: motivation, selective self-distillation and efficiency-aware GRPO, training dynamics, and task performance",
      githubRepo: "neuqrui/SCOPE",
      githubStarsSnapshot: 9,
      links: [
        { label: "Paper", href: "https://arxiv.org/abs/2610.38391", primary: true },
        { label: "Code", href: "https://github.com/neuqrui/SCOPE", repo: "neuqrui/SCOPE", stars: 9 },
        { label: "Project", href: "https://neuqrui.github.io/SCOPE-page/" },
        { label: "Models & Data", href: "https://huggingface.co/collections/neuqrui/scope" },
        { label: "Training Curves", href: "https://swanlab.cn/@67r/scope-exp/v1/vy74zd/overview" }
      ],
      bibtex: `@article{liu2026scope,
  title   = {SCOPE: Selective Critical-Step On-Policy Self-Distillation for Agentic Reinforcement Learning},
  author  = {Liu, Qirui and Cao, Wei and Mi, Yu and Sun, Yichen and Zhang, Xuekun and Liu, Lei and Shen, Yue and Chu, Zhixuan},
  journal = {arXiv preprint arXiv:2610.38391},
  year    = {2026}
}`
    },
    {
      id: "deshortcut",
      shortTitle: "DeShortcut-Align",
      title: "DeShortcut-Align: Decoupling Spurious Shortcuts for Robust Safety Alignment in Large Reasoning Models",
      venue: "Preprint · 2026",
      year: 2026,
      type: "preprint",
      featured: false,
      topics: ["Safety Alignment", "Reasoning Models"],
      authors: [
        { name: "Qirui Liu", me: true },
        { name: "Yichen Sun", me: false },
        { name: "Yan Wang", me: false },
        { name: "Zhixuan Chu", me: false },
        { name: "Linbo Jiang", me: false },
        { name: "Jianan Lin", me: false },
        { name: "Kui Ren", me: false }
      ],
      summary:
        "Uses sensitivity attribution, contrastive augmentation, and counterfactual consistency to decouple formatting and lexical shortcuts—improving safety robustness while sharply reducing over-refusal.",
      metricHighlight: "Robust Safety · Lower Over-Refusal",
      image: "assets/deshortcut-method.svg",
      imageAlt:
        "DeShortcut-Align method: sensitivity attribution, contrastive augmentation, and counterfactual consistency",
      githubRepo: "neuqrui/DeShortcut-Align",
      githubStarsSnapshot: 3,
      links: [
        { label: "Paper", href: "https://arxiv.org/abs/2609.34896", primary: true },
        { label: "Code", href: "https://github.com/neuqrui/DeShortcut-Align", repo: "neuqrui/DeShortcut-Align", stars: 3 },
        { label: "Project", href: "https://neuqrui.github.io/DeShortcut-Align-page/" },
        { label: "PDF", href: "https://arxiv.org/pdf/2609.34896" }
      ],
      bibtex: `@article{liu2026deshortcut,
  title   = {DeShortcut-Align: Decoupling Spurious Shortcuts for Robust Safety Alignment in Large Reasoning Models},
  author  = {Liu, Qirui and Sun, Yichen and Wang, Yan and Chu, Zhixuan and Jiang, Linbo and Lin, Jianan and Ren, Kui},
  journal = {arXiv preprint arXiv:2609.34896},
  year    = {2026}
}`
    },
    {
      id: "care",
      shortTitle: "CaRe",
      title: "Mitigating Cross-Modal Hallucinations by Correcting Modality Misrouting in Omnimodal LLMs",
      venue: "Preprint · 2026",
      year: 2026,
      type: "preprint",
      featured: false,
      topics: ["Omnimodal", "Reasoning Models"],
      authors: [
        { name: "Yu Mi", me: false },
        { name: "Licheng Pan", me: false },
        { name: "Jiayi Zhu", me: false },
        { name: "Qirui Liu", me: true },
        { name: "Yitong Qiao", me: false },
        { name: "Changtong Xu", me: false },
        { name: "Tao Wei", me: false },
        { name: "Fei Sun", me: false },
        { name: "Zhixuan Chu", me: false },
        { name: "Kui Ren", me: false }
      ],
      summary:
        "A training-free framework that introduces a counterfactual conflict gate and confidence-adaptive residual intervention to detect and correct modality misrouting in omnimodal LLMs.",
      metricHighlight: "Training-Free Cross-Modal Intervention",
      image: "assets/care-method.png",
      imageAlt:
        "CaRe method: counterfactual conflict gate and confidence-adaptive residual intervention for cross-modal hallucinations",
      links: [
        { label: "Paper", href: "https://arxiv.org/abs/2610.18141", primary: true },
        { label: "alphaXiv", href: "https://www.alphaxiv.org/abs/2610.18141" },
        { label: "PDF", href: "https://arxiv.org/pdf/2610.18141" }
      ],
      bibtex: `@article{mi2026care,
  title   = {Mitigating Cross-Modal Hallucinations by Correcting Modality Misrouting in Omnimodal LLMs},
  author  = {Mi, Yu and Pan, Licheng and Zhu, Jiayi and Liu, Qirui and Qiao, Yitong and Xu, Changtong and Wei, Tao and Sun, Fei and Chu, Zhixuan and Ren, Kui},
  journal = {arXiv preprint arXiv:2610.18141},
  year    = {2026}
}`
    }
  ],

  education: [
    {
      institution: "Zhejiang University",
      url: "https://www.zju.edu.cn/english/",
      period: "2026 – Present",
      degree: "M.S. in Computer Science and Technology",
      detail: "College of Computer Science and Technology · Advised by Dr. Zhixuan Chu",
      logos: ["assets/zju-emblem.svg"]
    },
    {
      institution: "Northeastern University",
      url: "https://www.neuq.edu.cn/",
      period: "2022 – 2026",
      degree: "B.S. in Computer Science and Technology",
      detail: "Undergraduate Studies · Advised by Changming Xu",
      logos: ["assets/neu-emblem.png"]
    }
  ],

  internships: [
    {
      organization: "TruthLab",
      affiliation: "Zhejiang University & Ant Group",
      period: "2025 – 2026",
      role: "Research Intern",
      topic: "Safety alignment and efficient distillation of large reasoning models",
      logos: ["assets/zju-emblem.svg", "assets/antgroup-emblem.png"]
    },
    {
      organization: "Wukong Lab",
      affiliation: "Northeastern University",
      period: "2023 – 2025",
      role: "Research Intern",
      topic: "Deep reinforcement learning and computer games",
      logos: ["assets/neu-emblem.png"]
    }
  ]
};
