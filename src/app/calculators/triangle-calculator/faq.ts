export interface TriangleFaq {
  question: string;
  answer: string;
}

export const triangleFaqs: TriangleFaq[] = [
  {
    question: "What is a triangle calculator?",
    answer:
      "A triangle calculator is a tool for finding unknown sides, angles and other geometric measurements from known triangle data. Depending on the available measurements, it can use relationships such as the Law of Sines, Law of Cosines, the Pythagorean theorem and Heron's formula."
  },
  {
    question: "How do I solve a triangle with three sides?",
    answer:
      "Enter all three side lengths. First make sure they satisfy the triangle inequality. When they do, the three angles can be determined, typically using the Law of Cosines, and the area can be calculated using Heron's formula."
  },
  {
    question: "How do I find a missing side of a triangle?",
    answer:
      "The method depends on what is known. With two sides and their included angle, use the Law of Cosines. With a known side-angle pair and another angle or side, the Law of Sines may be appropriate. In a right triangle, the Pythagorean theorem can find an unknown side."
  },
  {
    question: "How do I find a missing angle?",
    answer:
      "For two known angles, subtract their sum from 180°. For three known sides, use the Law of Cosines to calculate an angle. Other configurations may be solved with the Law of Sines."
  },
  {
    question: "What is the difference between the Law of Sines and Law of Cosines?",
    answer:
      "The Law of Sines connects sides with their opposite angles: a/sin(A) = b/sin(B) = c/sin(C). The Law of Cosines relates three sides to an included angle: c² = a² + b² - 2ab cos(C). As a practical rule, SSS and SAS problems commonly point toward the Law of Cosines, while ASA/AAS and suitable SSA problems commonly use the Law of Sines."
  },
  {
    question: "Can a triangle have three sides such as 1, 2 and 3?",
    answer:
      "No. A proper triangle requires the sum of any two sides to be strictly greater than the third side. Here, 1 + 2 = 3, so the configuration is degenerate rather than a proper triangle."
  },
  {
    question: "What is Heron's formula used for?",
    answer:
      "Heron's formula calculates triangle area when all three side lengths are known: K = √[s(s-a)(s-b)(s-c)], where s is the semiperimeter s = (a+b+c)/2."
  },
  {
    question: "What is the difference between inradius and circumradius?",
    answer:
      "The inradius r is the radius of the circle inside the triangle that touches its sides: r = K / s. The circumradius R is the radius of the circle passing through the triangle's three vertices: R = abc / (4K)."
  },
  {
    question: "Can this calculator solve right triangles?",
    answer:
      "Yes. A right triangle contains a 90° angle, allowing the Pythagorean theorem and trigonometric relationships to be used. For example, a 6-8-10 triangle has hypotenuse 10, area 24, and perimeter 24."
  },
  {
    question: "Why can SSA produce two answers?",
    answer:
      "SSA gives two sides and a non-included angle. Depending on the dimensions, the known side can sometimes swing into two geometrically different positions while satisfying the same measurements. This is the ambiguous case of the Law of Sines, and it can result in zero, one or two valid triangles."
  }
];
