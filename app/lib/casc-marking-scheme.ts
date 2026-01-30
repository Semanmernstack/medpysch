// app/lib/ai/casc-marking-scheme.ts
// Complete MedPsychKH CASC Communication & Marking Scheme 2025
// Extracted from official PDF - No need to upload PDF separately

export const CASC_MARKING_SCHEME = {
  // PDF Pages 5-8: Global Judgement Definitions
  GLOBAL_JUDGEMENTS: {
    EXCELLENT_PASS: {
      title: "Excellent Pass",
      definition: "Justifiable, fluent and technically proficient",
      full_description: "The candidate demonstrates an excellent level of competence expected of a newly appointed ST4, with a clinical approach that is entirely justifiable, very well communicated, and technically proficient. They show a logical approach that covers most of the key areas identified in the construct. Any minor omissions do not detract from the overall performance.",
      pdf_page: "PDF Page 5-6"
    },
    PASS: {
      title: "Pass",
      definition: "Systematic, clinically justifiable and proficient",
      full_description: "The candidate demonstrates a clear level of competence expected of a newly appointed ST4, using a clinical approach that, while not always the best, is reasonably systematic, clinically justifiable, and well communicated. All essential areas of skill identified in the construct are covered, though a few less important points may be omitted.",
      pdf_page: "PDF Page 6"
    },
    BORDERLINE_PASS: {
      title: "Borderline Pass",
      definition: "Adequate essentials; some desirable omissions",
      full_description: "The candidate shows an adequate level of competence expected of a newly appointed ST4, using a clinical approach which is at times unsystematic or inconsistent with practice at the ST4 level. Technical proficiency may be a concern. Communication is mostly appropriate. The candidate covers most of the essential skill areas in the construct, but some desirable ones may be omitted.",
      pdf_page: "PDF Page 6-7",
      key_note: "Most candidates land here because they focus too much on technical aspects rather than communication/collaboration"
    },
    BORDERLINE_FAIL: {
      title: "Borderline Fail",
      definition: "Unsystematic at times; important omissions",
      full_description: "The candidate fails to demonstrate an adequate level of competence. Their clinical approach is at times unsystematic or inconsistent with practice at the ST4 level. Communication may be appropriate, but the candidate does not adequately cover essential issues or makes too many omissions of less important factors.",
      pdf_page: "PDF Page 7",
      critical_distinction: "Communication MAY be appropriate BUT important omissions present",
      key_note: "Most candidates land here because they focus too much on technical aspects rather than communication/collaboration"
    },
    FAIL: {
      title: "Fail",
      definition: "Frequent omissions; lacks focus",
      full_description: "The candidate fails to demonstrate competence. Their approach shows frequent omissions and lacks focus.",
      pdf_page: "PDF Page 5"
    },
    SEVERE_FAIL: {
      title: "Severe Fail",
      definition: "Incompatible with accepted practice",
      full_description: "The candidate fails to demonstrate competence, with a clinical approach that is incompatible with accepted practice. Their performance may show inadequate reasoning and/or technical incompetence, alongside a marked lack of respect, attention, or empathy for the patient, carer, or other individuals involved in the interaction.",
      pdf_page: "PDF Page 8"
    }
  },

  // PDF Page 4: Domain Structure
  DOMAINS: {
    PROFESSIONALISM: {
      name: "Professionalism",
      description: "Respectful, ethical conduct, boundaries, cultural sensitivity, patient-centred behaviour",
      typical_weight: "~10%",
      pdf_page: "PDF Page 4"
    },
    CONSULTATION_MANAGEMENT: {
      name: "Consultation/Organisation Management",
      description: "Logical flow (clear structured approach), time management, Prioritise important issues",
      typical_weight: "~20% (most heavily weighted area - DO YOUR TASK)",
      pdf_page: "PDF Page 4",
      note: "THE MOST HEAVILY WEIGHTED AREA"
    },
    COMMUNICATION_SKILLS: {
      name: "Communication Skills",
      description: "Verbal/non-verbal cues, empathy, clarity, clear and adapted language, responsiveness, listen actively",
      typical_weight: "~20%",
      pdf_page: "PDF Page 4"
    },
    CLINICAL_ASSESSMENT: {
      name: "Clinical Assessment",
      description: "Explore symptoms, risk, physical health, and psychological/social factors appropriately. Develop a relevant and concise formulation/summary",
      typical_weight: "~50% for history stations, ~60% for examination stations",
      pdf_page: "PDF Page 4"
    },
    CLINICAL_MANAGEMENT: {
      name: "Clinical Management",
      description: "Safety-focused plans, shared decision-making (Collaboration), evidence-based management",
      typical_weight: "~50-60% for management stations",
      pdf_page: "PDF Page 4"
    }
  },

  // PDF Pages 13-17: The THREE Most Frequent Failures
  MOST_FREQUENT_FAILURES: {
    FAILURE_1_FORMULAIC_TRAP: {
      title: "#1: The Formulaic Consultation Trap",
      description: "Most common examiner feedback - repetitive, scripted consultation",
      pdf_page: "PDF Page 13",
      what_examiners_see: [
        "Repetitive phrases: 'How does that make you feel?'",
        "Questions as a 'list' rather than conversation",
        "Pre-prepared responses that don't match patient's answers",
        "Robotic delivery without genuine connection"
      ],
      the_solution: [
        "Use your own words - avoid memorized scripts",
        "Respond to what patient actually says",
        "Show genuine curiosity - ask follow-ups based on their responses",
        "Practice flexibility - adapt to the individual"
      ],
      remember: "When you speak, the examiner is doing an MSE on YOU!",
      anti_formulaic_toolkit: {
        avoid: [
          "How does that make you feel?",
          "Any thoughts of self-harm?",
          "Tell me about your childhood",
          "Are you compliant with medication?"
        ],
        use_instead: [
          "What's going through your mind? / What's that experience like for you?",
          "Sometimes when people feel this low, they have thoughts of ending their life - have you had any thoughts like that?",
          "Help me understand what growing up was like for you",
          "How are you getting on with your medication?"
        ]
      }
    },

    FAILURE_2_POOR_LISTENING: {
      title: "#2: Active Listening & Responding to Cues",
      description: "Poor listening skills. Poor use and response to cues - Most frequent failure",
      pdf_page: "PDF Page 14",
      what_youre_missing: {
        verbal_cues: "Hesitations, tone changes, word choices",
        non_verbal_cues: "Gestures, facial expressions, pauses",
        emotional_cues: "Distress signals, withdrawal, one word answers",
        content_cues: "Hints about other problems"
      },
      practical_techniques: {
        echo_method: "You mentioned feeling 'trapped' - tell me more about that",
        pause_power: "Count 2-3 seconds after patient stops speaking",
        reflection: "I notice you looked away when talking about...",
        clarification: "When you say 'bad thoughts,' what exactly...?"
      }
    },

    FAILURE_3_POOR_QUESTIONING: {
      title: "#3: Questioning Style Mastery",
      description: "Poor questioning style - Extremely common failure",
      pdf_page: "PDF Page 15",
      the_90_percent_closed_question_trap: {
        wrong: "Do you hear voices? Are they male or female? Do they tell you to do things?",
        better: "Tell me about any unusual experiences... You mentioned hearing things - what's that like?"
      },
      funnel_technique: {
        description: "Open-Close-Close technique",
        steps: [
          "Open question to explore the area",
          "Focused questions to get specifics",
          "Closed questions for precise details",
          "Follow-up based on their responses"
        ],
        example_poor: "Any family history? / How does that make you feel?",
        example_good: "Tell me about your family's experience with mental health"
      }
    }
  },

  // PDF Page 10: Communication Framework (4 Domains)
  COMMUNICATION_FRAMEWORK: {
    title: "The Official Framework: 4 Communication Domains",
    pdf_page: "PDF Page 10",
    domains: {
      PERSONALISATION_AND_RESPECT: {
        name: "1. Personalisation and Respect",
        description: "Person-centred, honest, empathic, compassionate approach",
        how_to_operationalise: [
          "'What are your thoughts about...' (not imposing agenda)",
          "'Let's think about this together' (collaborative)",
          "'It's completely your choice' (respect autonomy)"
        ]
      },
      RECOGNISING_RESPONDING_TO_CUES: {
        name: "2. Recognising and Responding to Cues",
        description: "Understanding verbal and non-verbal communication",
        how_to_operationalise: [
          "'I notice you hesitated there...'",
          "'This seems difficult to talk about'",
          "'I can see this is upsetting for you'",
          "'Am I understanding correctly that...'"
        ]
      },
      EMPATHY: {
        name: "3. Empathy",
        description: "Active listening, partnership, non-judgmental",
        how_to_operationalise: [
          "Active listening: Paraphrase what they've said",
          "Validation especially when emotions are shared: 'That sounds really challenging'",
          "Partnership: Involve them in decisions",
          "Concise communication: Brief, clear explanations",
          "Non-judgmental/Non Paternalistic: No criticism of choices/behaviors"
        ]
      },
      PROVIDING_CLEAR_INFORMATION: {
        name: "4. Providing Clear and Accurate Information",
        description: "Clear, understandable explanations",
        how_to_operationalise: [
          "Link symptoms to life events coherently",
          "No Jargons - Explain Diagnosis in lay terms",
          "Give clear rationale for management plans in lay terms",
          "Check understanding frequently: 'What's your understanding of what we've discussed?'"
        ]
      }
    },
    key_insight: "Communication emphasis varies by station type but all 4 domains are always assessed"
  },

  // PDF Pages 31-32: Communication Red Flags
  COMMUNICATION_RED_FLAGS: {
    title: "Communication Red Flags - What Leads to Failure",
    pdf_page: "PDF Pages 31-32",
    categories: {
      LANGUAGE_AND_TONE: {
        issues: [
          "Using medical jargon without explanation",
          "Speaking too quickly or giving too much info at once",
          "Sounding patronizing or robotic",
          "Being overly formal"
        ]
      },
      LISTENING_AND_RESPONSIVENESS: {
        issues: [
          "Not picking up on emotional cues",
          "Failing to respond to patient's concerns",
          "Continuing with agenda when patient is distressed",
          "Not adapting to patient's communication style"
        ]
      },
      STRUCTURE_AND_FLOW: {
        issues: [
          "Jumping between topics without transitions",
          "Not signposting what you're doing",
          "Failing to summarise or check understanding",
          "Ending abruptly without proper closure"
        ]
      }
    }
  },

  // PDF Page 16: Structure Without Rigidity
  CONSULTATION_STRUCTURE: {
    title: "3. Structure Without Rigidity",
    description: "Finding the balance between 'disorganised' and 'formulaic'",
    pdf_page: "PDF Page 16",
    signposting: [
      "'I'd like to ask about your symptoms first, then we'll talk about treatment'",
      "'Now I'd like to shift to asking about your family background'",
      "'Before we finish, let me check if there's anything important I haven't asked'"
    ],
    time_management_phrases: [
      "'We have about a few minutes left...?'",
      "'Let me summarise what I understand so far...'"
    ],
    operational_guidelines: [
      "✓ Systematic approach but remain flexible",
      "✓ No multiple questions at once or compounded questions",
      "✓ No repeating stock phrases",
      "✓ Chunk and check - give info in small pieces",
      "✓ Recommend not speaking more than 20 sec at a time"
    ]
  },

  // PDF Pages 18-22: Station-Specific Strategies
  STATION_SPECIFIC_STRATEGIES: {
    HISTORY_TAKING: {
      pdf_page: "PDF Page 18-19",
      most_common_failures: [
        "Not exploring symptoms/details in enough depth",
        "Questions appearing random/Abrupt",
        "Not recognising significance of aspects"
      ],
      depth_framework: {
        detail: "Can you describe exactly what the voices say?",
        explore: "What was happening in your life when this started?",
        personal_impact: "How has this affected your daily life?",
        timeline: "Walk me through how this developed",
        hidden_concerns: "What worries you most about this?"
      },
      communication_flow: [
        "Open: 'Tell me what's been troubling you'",
        "Explore: 'When you say anxious, what does that feel like?'",
        "Detail: 'These panic attacks - can you describe what happens?'",
        "Impact: 'How is this affecting your work/relationships?'",
        "Cues: Notice hesitation 'I sense there's something else on your mind?'"
      ]
    },

    MANAGEMENT_STATION: {
      pdf_page: "PDF Page 20",
      most_common_failures: [
        "Does not develop adequate risk management plan",
        "Plan does not reflect risks of different management options",
        "Does not formulate problem effectively"
      ],
      shared_decision_making_model: [
        "Seek their understanding: 'What's your understanding of what's happening?'",
        "Help explore options: 'There are several approaches we could consider'",
        "Assess preferences: 'What feels most manageable for you right now?'",
        "Reach agreement: 'So we're thinking medication plus counselling?'",
        "Evaluate: 'How does this plan sit with you?'",
        "Tell next steps: 'Let's be clear about what happens next'"
      ],
      risk_communication_script: "I want to discuss the different options and their risks and benefits. With medication, the benefits include... but there are side effects to be aware of... With therapy, the advantages are... but it does require... What questions do you have?",
      remember: [
        "Pause in between so role player can digest info",
        "Most management tasks include holistic (biological, psychological, social) aspects",
        "Don't spend time on irrelevant history unless necessary",
        "Involve the person - what are their views, understanding, wants, concerns?",
        "Think about real day-to-day work tasks you do in practice - Show leadership quality"
      ]
    },

    EXAMINATION_STATION: {
      pdf_page: "PDF Page 21",
      most_common_failures: [
        "Not exploring symptoms and signs competently",
        "Not identifying/recognising significance of findings",
        "Poor time management"
      ],
      communication_during_examination: [
        "Explain as you go: 'I'm going to ask some questions about your thinking'",
        "Normalize the process: 'These are routine questions I ask everyone'",
        "Check comfort: 'Is it okay if I continue with these questions?'",
        "Respond to distress: 'I can see this is difficult - shall we take a moment?'"
      ]
    }
  },

  // PDF Page 22: Adapt Based on Station Type
  STATION_TYPE_PRIORITIES: {
    pdf_page: "PDF Page 22",
    station_types: {
      HISTORY_TAKING: {
        communication_priority: "Open-ended, non-judgmental, attentive",
        key_focus: "Rapport, open Qs, ICE (Ideas, Concerns, Expectations)",
        avoid: "Long monologues, checklisting"
      },
      INFORMATION_GIVING: {
        communication_priority: "Clear, simplified language, use analogies",
        key_focus: "Chunk & check, assess understanding",
        avoid: "Overloading or patronising"
      },
      RISK_ASSESSMENT: {
        communication_priority: "Calm, empathetic, gently probing",
        key_focus: "Gentle clarification, affirming autonomy",
        avoid: "Leading questions"
      },
      CAPACITY_ASSESSMENT: {
        communication_priority: "Neutral tone, support autonomy",
        key_focus: "Gentle clarification, affirming autonomy",
        avoid: "Leading questions"
      },
      PROFESSIONAL_INTERACTION: {
        communication_priority: "Concise, structured, diplomatic",
        key_focus: "Clarity, teamwork, time mgmt",
        avoid: "Vagueness, assuming shared knowledge"
      },
      PARENT_CARER_TALKS: {
        communication_priority: "Acknowledge concerns, joint planning",
        key_focus: "Acknowledge concerns, joint planning",
        avoid: "Blame or reassurance without depth"
      }
    }
  },

  // PDF Page 33: What Gets You an Excellent Pass
  EXCELLENT_PASS_CRITERIA: {
    title: "What Gets You an Excellent Pass",
    pdf_page: "PDF Page 33",
    rapport_and_engagement: "Genuine interest and empathy demonstrated",
    communication_style: [
      "Language consistently appropriate to patient's level",
      "Adjusts approach based on patient cues",
      "Uses silence effectively",
      "Shows authentic curiosity"
    ],
    information_exchange: [
      "Good balance of open/closed questions",
      "Responds to patient's agenda",
      "Checks understanding frequently"
    ]
  },

  // PDF Pages 11-13: Borderline Regression Marking
  BORDERLINE_REGRESSION: {
    title: "What's Borderline Regression Marking?",
    pdf_page: "PDF Pages 11-13",
    description: "Pass mark calculated dynamically per station based on domain scores vs examiner global judgement",
    how_it_works: "Borderline regression model sets the pass mark per station. The place where the regression line crosses the borderline between pass/fail (0.5 on Y-axis) = the pass mark for that station.",
    important_note: "You CAN get high domain scores but still FAIL globally if you miss key risks, say something unsafe, or show poor insight into patient distress"
  },

  // PDF Pages 9-10: Domain Weightings by Station Type
  DOMAIN_WEIGHTINGS: {
    HISTORY_TAKING: {
      clinical_assessment: "~50%",
      communication_skills: "~20%",
      consultation_management: "~20%",
      professional_attitude: "~10%",
      pdf_page: "PDF Page 9"
    },
    EXAMINATION: {
      clinical_assessment: "~60%",
      communication_skills: "~20%",
      consultation_management: "~10%",
      professional_attitude: "~10%",
      pdf_page: "PDF Page 9"
    },
    MANAGEMENT: {
      clinical_management: "~50-60%",
      communication_skills: "~20%",
      consultation_management: "~10%",
      professional_attitude: "~10%",
      pdf_page: "PDF Page 10"
    },
    BREAKING_BAD_NEWS: {
      communication_skills: "~40-50%",
      clinical_management: "~30%",
      professional_attitude: "~10-15%",
      consultation_management: "~10%",
      pdf_page: "PDF Page 10"
    }
  }
};

// Helper function to get marking reference by topic
export function getMarkingReference(topic: string): string {
  const references: Record<string, string> = {
    'formulaic_trap': 'PDF Page 13 - The Formulaic Consultation Trap',
    'poor_listening': 'PDF Page 14 - Active Listening & Responding to Cues',
    'poor_questioning': 'PDF Page 15 - Questioning Style Mastery',
    'structure': 'PDF Page 16 - Structure Without Rigidity',
    'cues': 'PDF Page 14 - Recognising and Responding to Cues',
    'empathy': 'PDF Page 10 - Communication Framework: Empathy',
    'personalisation': 'PDF Page 10 - Personalisation and Respect',
    'clear_information': 'PDF Page 10 - Providing Clear and Accurate Information',
    'history_strategy': 'PDF Pages 18-19 - History Taking Strategies',
    'management_strategy': 'PDF Page 20 - Management Station Strategies',
    'examination_strategy': 'PDF Page 21 - Examination Station Communication',
    'red_flags': 'PDF Pages 31-32 - Communication Red Flags',
    'excellent_pass': 'PDF Page 33 - What Gets You an Excellent Pass',
    'global_judgement': 'PDF Pages 5-8 - Global Judgement Definitions',
    'domains': 'PDF Page 4 - Domain Structure',
    'borderline_regression': 'PDF Pages 11-13 - Borderline Regression Marking'
  };
  
  return references[topic] || 'PDF - MedPsychKH CASC Communication & Marking Scheme 2025';
}

// Helper function to check if consultation is formulaic
export function detectFormulaicPhrases(transcript: string): string[] {
  const formulaicPhrases = [
    'how does that make you feel',
    'any thoughts of self-harm',
    'tell me about your childhood',
    'are you compliant',
    'how are things at home',
    'any family history',
    'do you hear voices'
  ];
  
  const found: string[] = [];
  const lowerTranscript = transcript.toLowerCase();
  
  for (const phrase of formulaicPhrases) {
    if (lowerTranscript.includes(phrase)) {
      found.push(phrase);
    }
  }
  
  return found;
}

// Helper function to analyze question style
export function analyzeQuestionStyle(questions: string[]): {
  open_questions: number;
  closed_questions: number;
  focused_questions: number;
  formulaic_count: number;
  percentage_closed: number;
} {
  let open = 0;
  let closed = 0;
  let focused = 0;
  let formulaic = 0;
  
  for (const question of questions) {
    const q = question.toLowerCase().trim();
    
    // Check if formulaic
    const formulaicInQuestion = detectFormulaicPhrases(q);
    if (formulaicInQuestion.length > 0) {
      formulaic++;
    }
    
    // Classify question type
    if (q.startsWith('tell me') || q.startsWith('describe') || q.startsWith('what') || q.startsWith('how')) {
      if (q.includes('exactly') || q.includes('specifically')) {
        focused++;
      } else {
        open++;
      }
    } else if (q.startsWith('do you') || q.startsWith('are you') || q.startsWith('have you') || q.startsWith('can you')) {
      closed++;
    }
  }
  
  const total = questions.length || 1;
  const percentage_closed = Math.round((closed / total) * 100);
  
  return {
    open_questions: open,
    closed_questions: closed,
    focused_questions: focused,
    formulaic_count: formulaic,
    percentage_closed
  };
}
