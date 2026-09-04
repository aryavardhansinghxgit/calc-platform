export interface AreaFaq {
  question: string;
  answer: string;
}

export const areaFaqs: AreaFaq[] = [
  {
    question: "What is the formula for area?",
    answer: "The formula depends on the shape. For example, a rectangle uses A = lw, a triangle uses A = ½bh, a circle uses A = πr², and a trapezoid uses A = ½(b₁ + b₂)h."
  },
  {
    question: "How do I calculate the area of a rectangle?",
    answer: "Multiply its length by its width: A = l × w. A rectangle measuring 8 m by 5 m therefore has an area of 40 m²."
  },
  {
    question: "How do I calculate the area of a triangle?",
    answer: "Multiply the base by the perpendicular height and divide by two: A = ½bh. When all three side lengths are known, Heron's formula can be used instead."
  },
  {
    question: "How do I calculate the area of a circle?",
    answer: "Use A = πr², where r is the radius. For a circle with radius 5, the area is approximately 78.5398 square units."
  },
  {
    question: "What is the difference between area and perimeter?",
    answer: "Area measures the surface enclosed by a shape and is expressed in square units. Perimeter measures the length of the shape's boundary and is expressed in linear units."
  },
  {
    question: "What is the area formula for a trapezoid?",
    answer: "Use A = ½(b₁ + b₂)h, where b₁ and b₂ are the parallel bases and h is the perpendicular height."
  },
  {
    question: "How do I find the area of a regular polygon?",
    answer: "A common formula is A = ½ap, where a is the apothem and p is the perimeter. Another equivalent formula can be used when side length and number of sides are known."
  },
  {
    question: "How do I find the area of an irregular polygon?",
    answer: "When the vertices are known as coordinates, use the Shoelace Formula: A = ½|∑(x_i y_{i+1} - x_{i+1} y_i)|. The vertices should normally be supplied in boundary order."
  },
  {
    question: "Why is my area in square meters instead of meters?",
    answer: "Because area is a two-dimensional measurement. Multiplying meters by meters produces square meters: m × m = m²."
  },
  {
    question: "Can I convert square meters to square feet?",
    answer: "Yes. Area units require area conversion factors. For example: 1 m² ≈ 10.7639 ft². NIST provides reference conversion relationships between U.S. customary and metric units."
  },
  {
    question: "Can I use decimal measurements?",
    answer: "Yes. Real-world measurements are often decimal values, such as 4.25 m or 12.75 ft. The calculator retains numerical precision internally and formats the displayed result according to the selected precision."
  },
  {
    question: "Can I calculate the area of a shape from coordinates?",
    answer: "Yes. The irregular-polygon coordinate mode can use Cartesian vertices and the Shoelace Formula to calculate the area of a simple polygon."
  },
  {
    question: "Why can't an annulus have an inner radius larger than the outer radius?",
    answer: "Because an annulus represents the area remaining after removing an inner circle from an outer circle. Therefore the inner radius must satisfy 0 < r < R. Otherwise there is no valid ring with those dimensions."
  },
  {
    question: "What happens if I enter invalid dimensions?",
    answer: "The calculator validates geometric inputs instead of silently replacing them with arbitrary values. Invalid cases such as impossible annulus dimensions, invalid polygon side counts, malformed coordinates and invalid sector angles are explicitly rejected."
  },
  {
    question: "Can area be used to estimate material quantities?",
    answer: "Yes. Area is often the starting point for flooring, tile, sheet material, paint coverage and other quantity estimates. However, the final quantity may need adjustment for waste, overlaps, cuts, installation requirements and site-specific conditions."
  },
  {
    question: "Is the calculated result the same for every unit system?",
    answer: "The physical area is the same, but its numerical representation changes with the unit. For example, one surface can be expressed in square meters, square feet or square inches. The conversion must use the appropriate squared-unit factor."
  }
];
