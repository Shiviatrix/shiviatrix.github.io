export const projects = [
  {
    id: "vinglish",
    title: "Vinglish & VinglishZero",
    subTitleDeva: "विङ्गलिश",
    meta: "Rust | Compilers",
    paragraphs: [
      "<strong>Vinglish:</strong> A statically-typed programming language compiling to C. It features a custom Lexer, recursive-descent parser, MIR lowering, and SSA optimization passes (DCE, constant folding, GVN). Includes a tree-walk interpreter, LSP server, and an experimental LLVM backend.",
      "<strong>VinglishZero:</strong> A deterministic, language-agnostic analysis tool. It turns code from multiple languages (Python, Java, C) into a shared IR to query code intent via rules rather than machine learning inference (Works on a similar principal as akinator)."
    ],
    links: [
      { label: "Source: Vinglish", url: "https://github.com/Shiviatrix/vinglish" },
      { label: "Source: VinglishZero", url: "https://github.com/Shiviatrix/VinglishZero" }
    ]
  },
  {
    id: "neuro-os",
    title: "Neuro-OS",
    subTitleDeva: "न्यूरो-ओएस",
    meta: "C | x86 Assembly | Neuromorphic Systems",
    paragraphs: [
      "A bare-metal i686 operating system built from scratch, replacing traditional Round-Robin scheduling with a Neuromorphic Lottery Scheduler. CPU time is probabilistically allocated by a kernel-level Liquid State Machine (LSM) simulating spiking neurons with STDP. The system also implements a custom SHA-256 cryptographic login and a RAM-based VFS with strict file isolation."
    ],
    links: [
      { label: "Source Repository", url: "https://github.com/Shiviatrix/neuro-os" }
    ]
  },
  {
    id: "zeta-chain",
    title: "Zeta-Chain",
    subTitleDeva: "जेटा-शृङ्खला",
    meta: "C++ | Python | Solidity | Distributed Systems",
    paragraphs: [
      "A mathematics-secured blockchain replacing traditional hash-mining with Proof of Useful Work (PoUW). It incentivizes the verification of the Riemann Hypothesis using an Interpolated Discrete Descent (IDD) algorithm. It includes a C++/FLINT mining engine for high-order derivative root finding, a Python-based P2P node, and an ERC-20 smart contract for managing ZETA block rewards. Solve math to get crypto essentially."
    ],
    links: [
      { label: "Source Repository", url: "https://github.com/Shiviatrix/zeta-chain" }
    ]
  },
  {
    id: "zeta-engine",
    title: "Riemann Zeta Parallel Engine",
    subTitleDeva: "रीमैन जेटा समानांतर इंजन",
    meta: "C++ | OpenMP | MPFR | High-Performance Computing",
    paragraphs: [
      "A massively parallel engine utilizing the Riemann-Siegel formula for pointwise evaluation of the Riemann zeta function at extreme altitudes (T > 10³⁰). Employs OpenMP for lock-free parallel summation and GNU MPFR/GMP for 500-bit mathematical precision, achieving O(log T) memory complexity."
    ],
    links: [
      { label: "Source Repository", url: "https://github.com/Shiviatrix/zeta-parallel-engine" }
    ]
  },
  {
    id: "heavy-tails",
    title: "Heavy Tails Research Verification",
    subTitleDeva: "हैवी टेल्स शोध सत्यापन",
    meta: "C | FLINT | Interval Arithmetic",
    paragraphs: [
      "Computer-assisted proof written for a research paper on the failure of the Law of Large Numbers in Heavy-Tailed Sums (specifically the Cauchy α=1 divergence). Utilizes Arb interval (ball) arithmetic to rigorously bound logarithmic moments, avoiding traditional floating-point approximation errors."
    ],
    links: [
      { label: "Source Repository", url: "https://github.com/Shiviatrix/Heavy_tails_research" }
    ]
  },
  {
    id: "image-to-equation",
    title: "ImageToEquation",
    subTitleDeva: "इमेज टू इक्वेशन",
    meta: "Python | Mathematics | Image Processing",
    paragraphs: [
      "A procedural math art generator that translates pixel data into continuous mathematical formulas without the use of AI. It employs a Polynomial Method to calculate a 40th-degree 3D landscape and a Box-Splitting QuadTree method to handle high-detail regions."
    ],
    links: [
      { label: "Source Repository", url: "https://github.com/Shiviatrix/image-to-equation" }
    ]
  }
];
