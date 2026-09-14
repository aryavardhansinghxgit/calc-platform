import { CalculatorFAQ } from "@/lib/calculator-engine/types";

export const body_type_calculatorFaqs: CalculatorFAQ[] = [
  {
    question: "What measurements do I need for the body type calculator?",
    answer:
      "The calculator can use bust/chest, natural waist, high hip, low/total hip, height and weight, depending on the selected mode. The exact fields vary between the female-shape, male-frame and analysis tools.",
  },
  {
    question: "What is the most important measurement for body shape?",
    answer:
      "There is no single universally dominant measurement. Body shape is fundamentally about relationships between measurements, especially bust/chest, waist and hip proportions.",
  },
  {
    question: "Can men use a body type calculator?",
    answer:
      "Yes, but the classification framework should be made explicit. This calculator uses a separate Male Frame Classification rather than applying the female FFIT-derived model to men.",
  },
  {
    question: "What is the difference between body shape and body type?",
    answer:
      "The terms are often used interchangeably online. In this calculator, “body shape” primarily refers to proportional silhouette categories, while “somatotype” is treated separately as an estimated anthropometric proxy.",
  },
  {
    question: "Is the Hourglass body shape healthier?",
    answer:
      "No. Body shape is not a health diagnosis. A person's health cannot be inferred from an Hourglass, Rectangle, Pear or other silhouette label.",
  },
  {
    question: "Is the Pear body shape healthy?",
    answer:
      "A Pear/Triangle classification describes proportions in which the hips are relatively larger than the bust. It does not by itself determine health.",
  },
  {
    question: "Is the Apple body shape unhealthy?",
    answer:
      "No body-shape label by itself diagnoses health. Central adiposity can be associated with health risk, but body shape alone does not directly measure visceral fat or diagnose disease.",
  },
  {
    question: "What does a 0.72 waist-to-hip ratio mean?",
    answer:
      "It means the waist measurement is about 72% of the hip measurement when both are expressed in the same unit. Health interpretation requires population-specific context.",
  },
  {
    question: "What does a 0.39 waist-to-height ratio mean?",
    answer:
      "It means the waist is approximately 39% of the person's height in the same unit system. NICE's adult guidance focuses on 0.4–0.49 as healthy central adiposity and recommends keeping waist-to-height ratio below 0.5.",
  },
  {
    question: "What WHtR should I aim for?",
    answer:
      "NICE recommends that adults try to keep their waist circumference below half their height, corresponding to a WHtR below 0.5. This is a general health message, not the same thing as a body-shape classification.",
  },
  {
    question: "Is WHR or WHtR better?",
    answer:
      "They measure different relationships. WHR compares waist with hips, while WHtR compares waist with height. They should not be treated as interchangeable.",
  },
  {
    question: "Can body shape change with age?",
    answer:
      "Yes. Weight, muscle, fat distribution, pregnancy, posture and changes in body proportions can all affect a later classification.",
  },
  {
    question: "Can exercise change body shape?",
    answer:
      "Exercise can change muscle mass and body composition, which can change your measurements and therefore your calculated proportions. It does not mean that a particular body shape determines a particular workout.",
  },
  {
    question: "Can I change my body shape naturally?",
    answer:
      "Your proportions can change through changes in body composition, muscle development and overall body weight. However, your underlying skeletal structure places limits on how much particular dimensions can change.",
  },
  {
    question: "Why did I get a different shape from another calculator?",
    answer:
      "Different systems can use different measurements, definitions and classification thresholds. Even changes in measurement definitions can affect body-shape classification results.",
  },
  {
    question: "Is this calculator the original NCSU FFIT calculator?",
    answer:
      "No. The original NCSU FFIT system used 3D body-scan data and nine female categories for apparel applications. This calculator uses a seven-category adaptation designed for self-measured tape dimensions.",
  },
  {
    question: "Why are Oval and Diamond missing from this calculator?",
    answer:
      "The calculator does not attempt to reproduce the full nine-category FFIT system. Oval and Diamond were omitted because the available 2D tape measurements do not provide the multidimensional surface information needed to distinguish those forms reliably.",
  },
  {
    question: "Is the Shape Similarity Score scientifically validated?",
    answer:
      "The score is a calculator-generated mathematical similarity measure. Its scoring constants are application-defined heuristics and are not presented as a published NCSU accuracy model.",
  },
  {
    question: "Is the somatotype result a true Heath-Carter assessment?",
    answer:
      "No. It is an Estimated Anthropometric Somatotype Proxy. A full Heath-Carter assessment requires additional anthropometric measurements, including skinfolds, bone breadths and limb girths.",
  },
  {
    question: "Does body shape predict fertility?",
    answer:
      "No. Historical studies may report population-level associations between body proportions and reproductive variables, but body shape or WHR is not a fertility diagnostic test.",
  },
  {
    question: "Can body shape tell me how much visceral fat I have?",
    answer:
      "No. Tape measurements and body-shape labels cannot directly quantify visceral fat. Imaging or other specialized assessment is needed for direct anatomical quantification.",
  },
  {
    question: "Can a body type calculator diagnose health problems?",
    answer:
      "No. This calculator provides anthropometric and descriptive information. WHR and WHtR can be useful screening indicators, but they are not diagnoses. WHO describes WHR in the context of epidemiological risk assessment, while NICE uses WHtR as a practical measure of central adiposity.",
  },
];
