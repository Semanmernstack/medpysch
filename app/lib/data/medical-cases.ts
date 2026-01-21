



// //////////new part/////////////////

// import { MedicalCase } from '../types';

// export const medicalCases: MedicalCase[] = [
//   // CASE 1: OCD (Postpartum)
//   {
//     case_id: 'PSYCH_OCD_001',
//     specialty: 'Psychiatry',
//     difficulty: 'Intermediate',
//     diagnosis: 'Obsessive-Compulsive Disorder (Postpartum)',
//     patient_profile: {
//       name: 'Sarah Williams',
//       age: 28,
//       gender: 'Female',
//       occupation: 'Teacher',
//       presenting_complaint: 'Thoughts of contamination—compulsions to wash hands excessively',
//       emotional_state: 'Anxious, distressed, exhausted',
//       communication_style: 'Hesitant, needs courage to talk, seeks reassurance',
//     },
//     history_of_presenting_complaint:
//       'Baby born 6 weeks ago. Experiencing intrusive thoughts about cleaning and contamination. Worries about germs/contamination affecting baby. Spends hours each day on cleaning routines. Cannot stop even when exhausted. Thoughts are ego-dystonic and cause significant distress. Avoiding certain activities with baby due to worries.',
//     past_medical_history: 'No psychiatric history before pregnancy',
//     medications: ['None'],
//     social_history:
//       'Lives with supportive husband. First-time mother. Husband comments on cleanliness concerns. Previously active social life, now withdrawn.',
//     family_history: 'No significant psychiatric history mentioned',
//     examination_findings: {
//       appearance: 'Tired, anxious',
//       speech: 'Normal rate, anxious content',
//       mood: 'Anxious',
//       affect: 'Anxious, ego-dystonic regarding obsessions',
//     },
//     investigations: {
//       Y_BOCS_score: 'Pending',
//     },
//     key_examination_points: [
//       'Explore obsessions in detail - ego-dystonic intrusive thoughts',
//       'Assess compulsions and cleaning rituals',
//       'Differentiate from postpartum psychosis (thoughts toward baby)',
//       'Assess functional impact on baby care and relationships',
//       'Screen for comorbid mood disorders (100% have comorbid mood)',
//       'Evaluate sleep, social functioning, self-care, appetite',
//       'Screen for harm to self and baby',
//     ],
//     expected_management: [
//       'Normalize postpartum intrusive thoughts',
//       'Explain OCD vs postpartum psychosis',
//       'CBT with ERP (Exposure Response Prevention)',
//       'Consider SSRI if severe',
//       'Perinatal mental health referral',
//       'Partner involvement and support',
//     ],
//   },

//   // CASE 2: Autism Spectrum Disorder (Asperger Syndrome)
//   {
//     case_id: 'PSYCH_AUTISM_001',
//     specialty: 'Psychiatry',
//     difficulty: 'Intermediate',
//     diagnosis: 'Autism Spectrum Disorder (Level 1 - Asperger Syndrome)',
//     patient_profile: {
//       name: 'David Chen',
//       age: 34,
//       gender: 'Male',
//       occupation: 'Software Developer',
//       presenting_complaint: 'Challenges at work related to social interactions and routines',
//       emotional_state: 'Anxious, frustrated, overwhelmed',
//       communication_style: 'Pedantic, fixated on special interests (colors), poor eye contact',
//     },
//     history_of_presenting_complaint:
//       'Recently moved to new office/department. Cannot concentrate due to different office layout, lighting, noise. Struggles with new colleagues communication style. Has intense interest in specific colors and painting. Uncle has autism. Difficulty making friends since childhood.',
//     past_medical_history: 'No formal diagnoses',
//     medications: ['None'],
//     social_history:
//       'Lives alone. Limited social circle. Prefers routine and sameness. Previously in same office for long time. Struggles with workplace transitions.',
//     family_history: 'Uncle diagnosed with autism',
//     examination_findings: {
//       appearance: 'Appropriate, fixated on interviewer clothing color',
//       speech: 'Pedantic, tangential about special interests',
//       mood: 'Anxious',
//       affect: 'Restricted range',
//       social_interaction: 'Difficulty with reciprocity and nonverbal communication',
//     },
//     investigations: {
//       ADOS2_pending: true,
//     },
//     key_examination_points: [
//       'Assess Criterion A: Social communication deficits (all 3 required)',
//       'Assess Criterion B: Restricted/repetitive behaviors (at least 2 required)',
//       'Explore workplace impact and routine adherence',
//       'Evaluate special interests intensity and duration',
//       'Obtain developmental history from childhood',
//       'Assess sensory sensitivities',
//       'Family history of autism traits',
//     ],
//     expected_management: [
//       'Comprehensive autism assessment (ADOS-2)',
//       'Workplace accommodations (routine, sensory environment)',
//       'Social skills training if desired',
//       'Peer support groups',
//       'Education about autism spectrum',
//     ],
//   },

//   // CASE 3: ADHD (Child)
//   {
//     case_id: 'PSYCH_ADHD_CHILD_001',
//     specialty: 'Psychiatry - Child',
//     difficulty: 'Intermediate',
//     diagnosis: 'ADHD (Combined Type)',
//     patient_profile: {
//       name: 'David Williams (speak to Mum)',
//       age: 8,
//       gender: 'Male',
//       occupation: 'Primary School Student',
//       presenting_complaint: 'Trouble focusing, hyperactivity, impulsivity at home and school',
//       emotional_state: 'Mother anxious and exhausted',
//       communication_style: 'Mother descriptive, seeking help, collaborative',
//     },
//     history_of_presenting_complaint:
//       'Teacher reports David cannot sit still, constantly disrupts class, forgets instructions, loses things. At home: refuses homework, argues constantly, cannot follow through on tasks. Always been active but worsening past year. Struggling academically. Poor grades.',
//     past_medical_history: 'Always been active child, possible early developmental concerns',
//     medications: ['None'],
//     social_history:
//       'Lives with both parents and younger sister. Father works long hours. Limited peer friendships. Father had similar difficulties as child.',
//     family_history: 'Father had similar childhood difficulties',
//     examination_findings: {
//       appearance: 'Fidgety, distractible',
//       speech: 'Interrupts frequently',
//       mood: 'Irritable at times',
//       affect: 'Labile',
//     },
//     investigations: {
//       Conners_rating_pending: true,
//     },
//     key_examination_points: [
//       'Screen for core ADHD symptoms: inattention, hyperactivity, impulsivity',
//       'Assess across multiple settings (home AND school) - must occur in both',
//       'Screen for comorbidities: Autism (24%), Learning Disorders (22%), Sleep (15%), Anxiety (12%), ODD (41%)',
//       'Obtain detailed developmental history (25% have early developmental concerns)',
//       'Assess functional impairment at home, school, socially',
//       'Screen for adverse childhood experiences',
//       'Medical screening: sleep, hearing, vision, seizures, head injuries',
//     ],
//     expected_management: [
//       'Psychoeducation for parents and teachers',
//       'Behavioral interventions',
//       'Consider medication (methylphenidate)',
//       'School support plan / educational accommodations',
//       'Parenting support programs',
//       'Regular monitoring and follow-up',
//     ],
//   },

//   // CASE 4: ADHD (Adult)
//   {
//     case_id: 'PSYCH_ADHD_ADULT_001',
//     specialty: 'Psychiatry',
//     difficulty: 'Intermediate',
//     diagnosis: 'ADHD (Adult)',
//     patient_profile: {
//       name: 'Michael Roberts',
//       age: 32,
//       gender: 'Male',
//       occupation: 'Office Worker',
//       presenting_complaint: 'Trouble focusing, hyperactivity, impulsivity at work',
//       emotional_state: 'Frustrated, anxious about work performance',
//       communication_style: 'Restless, examples of missed details, impulsive',
//     },
//     history_of_presenting_complaint:
//       'Lifelong pattern of attention difficulties. Small errors at work from missed details. Difficulty tracking deadlines and bills. Struggles with multi-step instructions. Feels "driven by a motor". Difficulty waiting. Childhood teachers noted similar issues.',
//     past_medical_history: 'No formal ADHD diagnosis in childhood',
//     medications: ['None'],
//     social_history:
//       'Employed but receiving poor feedback. Relationship difficulties. Impulsive financial decisions. May use substances to focus/relax.',
//     family_history: 'Possible family history of ADHD traits',
//     examination_findings: {
//       appearance: 'Restless',
//       speech: 'Interrupts, blurts out responses',
//       mood: 'Anxious, frustrated',
//       affect: 'Labile',
//     },
//     investigations: {
//       adult_ADHD_screening_pending: true,
//     },
//     key_examination_points: [
//       'Assess inattention symptoms (errors, organization, distractibility)',
//       'Assess hyperactivity-impulsivity (restlessness, waiting difficulty)',
//       'MUST establish childhood onset (before age 12)',
//       'Screen comorbidities: Anxiety/Mood, Substance Use (24%), Sleep, Personality traits',
//       'Assess functional impact: employment, relationships, finances, daily living',
//       'Risk assessment: driving safety, occupational hazards, financial impulsivity, substance misuse, self-harm, aggression',
//     ],
//     expected_management: [
//       'Comprehensive ADHD assessment',
//       'Medication trial (stimulants or non-stimulants)',
//       'CBT for ADHD',
//       'Workplace accommodations',
//       'Address comorbidities',
//       'Regular monitoring',
//     ],
//   },

//   // CASE 5: Delirium vs Dementia
//   {
//     case_id: 'PSYCH_DELIRIUM_001',
//     specialty: 'Old Age Psychiatry',
//     difficulty: 'Advanced',
//     diagnosis: 'Delirium (vs Dementia)',
//     patient_profile: {
//       name: 'Mrs. Anderson (speak to family)',
//       age: 82,
//       gender: 'Female',
//       occupation: 'Retired',
//       presenting_complaint: 'Acute confusion and behavioral changes',
//       emotional_state: 'Family distressed and worried',
//       communication_style: 'Family seeking answers about sudden change',
//     },
//     history_of_presenting_complaint:
//       'Acute onset confusion over days. Fluctuating level of consciousness. Disoriented to time and place. Visual hallucinations. Disturbed sleep-wake cycle. Recent medical illness or medication change. This represents significant change from baseline functioning.',
//     past_medical_history: 'Recent infection, surgery, or medication change',
//     medications: ['Multiple medications - recent changes'],
//     social_history:
//       'Previously independent. Family involved in care.',
//     family_history: 'To be explored',
//     examination_findings: {
//       consciousness: 'Fluctuating',
//       attention: 'Impaired',
//       orientation: 'Disoriented',
//       perceptions: 'Visual hallucinations possible',
//     },
//     investigations: {
//       blood_tests: 'Pending - FBC, U&E, LFT, glucose, infection markers',
//       urine_analysis: 'Pending',
//       imaging: 'Consider CT head',
//     },
//     key_examination_points: [
//       'Establish timeline - acute vs gradual onset',
//       'Assess for fluctuation - key feature of delirium',
//       'Identify precipitating factors (infection, medications, metabolic)',
//       'Determine baseline cognitive function',
//       'Screen for underlying dementia',
//       'Assess for medical causes',
//     ],
//     expected_management: [
//       'Identify and treat underlying cause',
//       'Review and optimize medications',
//       'Environmental modifications',
//       'Reorientation strategies',
//       'Avoid sedatives unless essential',
//       'Monitor and reassess regularly',
//     ],
//   },

//   // CASE 6: Vascular Dementia Carer
//   {
//     case_id: 'PSYCH_DEMENTIA_001',
//     specialty: 'Old Age Psychiatry',
//     difficulty: 'Advanced',
//     diagnosis: 'Vascular Dementia (Carer Assessment)',
//     patient_profile: {
//       name: 'Mrs. James',
//       age: 68,
//       gender: 'Female',
//       occupation: 'Carer (speaking about husband)',
//       presenting_complaint: 'Challenges managing husband with dementia',
//       emotional_state: 'Distressed, exhausted, overwhelmed',
//       communication_style: 'Seeking help and support',
//     },
//     history_of_presenting_complaint:
//       'Husband (Mr. James, 78) diagnosed with vascular dementia. Mrs. James is primary carer. Experiencing significant carer burden. Struggling with physical and emotional demands. Social isolation. Own health declining. Relationship role has changed from wife to carer.',
//     past_medical_history: 'Mrs. James: own health concerns possible',
//     medications: ['Husband on various medications'],
//     social_history:
//       'Mrs. James is sole carer. Limited formal support. May have lost social connections. Financial impact possible.',
//     family_history: 'Husband has vascular risk factors',
//     examination_findings: {
//       husband_cognitive: 'Significantly impaired',
//       carer_wellbeing: 'Declining',
//     },
//     investigations: {
//       carer_burden_assessment: 'Zarit Burden Interview',
//       husband_investigations: 'CT head showing vascular changes',
//     },
//     key_examination_points: [
//       'Assess carer burden using Zarit domains: Physical/Emotional impact, Social life, Time/Personal freedom',
//       'Evaluate support systems: Formal (services, respite) and Informal (family, friends)',
//       'Assess carer health: Physical and mental health screening',
//       'Explore relationship role change',
//       'Screen for carer depression and suicidal thoughts',
//       'Identify risks: Husband aggression, carer burnout, safety concerns, social isolation',
//     ],
//     expected_management: [
//       'Carer\'s assessment from social services',
//       'Respite care arrangements',
//       'Dementia support groups',
//       'Education about vascular dementia',
//       'Address carer\'s own health needs',
//       'Safety planning',
//       'Financial and legal advice (power of attorney)',
//     ],
//   },

//   // CASE 7: PTSD
//   {
//     case_id: 'PSYCH_PTSD_001',
//     specialty: 'Psychiatry',
//     difficulty: 'Advanced',
//     diagnosis: 'Post-Traumatic Stress Disorder (PTSD)',
//     patient_profile: {
//       name: 'James Martinez',
//       age: 35,
//       gender: 'Male',
//       occupation: 'Paramedic',
//       presenting_complaint: 'Symptoms following traumatic event',
//       emotional_state: 'Hypervigilant, distressed, guarded',
//       communication_style: 'Reluctant to discuss trauma, stops when discussing details',
//     },
//     history_of_presenting_complaint:
//       '3 months since traumatic incident at work. Experiencing intrusive memories, flashbacks, nightmares. Avoids situations that remind him of trauma. Hypervigilant and easily startled. Negative thoughts and guilt. Sleep disturbed. Using alcohol to cope.',
//     past_medical_history: 'No previous psychiatric history',
//     medications: ['None'],
//     social_history:
//       'Lives with partner. Previously outgoing, now withdrawn. Increased alcohol use. Occupational health concerns.',
//     family_history: 'No psychiatric history',
//     examination_findings: {
//       appearance: 'Tense, hyperalert',
//       speech: 'Guarded, stops when discussing trauma',
//       mood: 'Anxious, guilty',
//       affect: 'Restricted, vigilant',
//     },
//     investigations: {
//       PCL5_score: 'Pending (PTSD checklist)',
//     },
//     key_examination_points: [
//       'Establish trauma with permission-seeking approach',
//       'Assess intrusive symptoms: memories, nightmares, flashbacks, emotional distress, physical reactivity',
//       'Evaluate avoidance behaviors',
//       'Screen for negative cognitions and mood changes',
//       'Assess hypervigilance and exaggerated startle response',
//       'Timeline (symptoms >1 month)',
//       'Screen for substance use as coping mechanism',
//       'Assess functional impact and occupational effects',
//     ],
//     expected_management: [
//       'Trauma-focused CBT',
//       'EMDR (Eye Movement Desensitization and Reprocessing)',
//       'Consider SSRI if indicated',
//       'Sleep hygiene education',
//       'Avoid benzodiazepines',
//       'Occupational health referral',
//       'Address substance use',
//     ],
//   },

//   // CASE 8: Specific Phobia - Fear of Driving
//   {
//     case_id: 'PSYCH_PHOBIA_DRIVING_001',
//     specialty: 'Psychiatry',
//     difficulty: 'Intermediate',
//     diagnosis: 'Specific Phobia (Situational - Driving)',
//     patient_profile: {
//       name: 'Lisa Thompson',
//       age: 29,
//       gender: 'Female',
//       occupation: 'Office Manager',
//       presenting_complaint: 'Fear of driving after car accident',
//       emotional_state: 'Anxious about driving, frustrated by limitations',
//       communication_style: 'Can discuss accident calmly but intense anxiety about driving',
//     },
//     history_of_presenting_complaint:
//       'Involved in car accident 8 months ago. Since then, experiences immediate intense fear when trying to drive. Physical symptoms: sweating, heart racing, "blanking out". Completely avoids driving. Can be a passenger without problems. No fear on public transport. Lost independence.',
//     past_medical_history: 'No previous anxiety issues',
//     medications: ['None'],
//     social_history:
//       'Work and social life affected. Relies on others for transport. Previously independent driver.',
//     family_history: 'No significant anxiety disorders',
//     examination_findings: {
//       appearance: 'Anxious when discussing driving',
//       speech: 'Normal',
//       mood: 'Anxious about specific situation',
//       affect: 'Congruent',
//     },
//     investigations: {
//       phobia_assessment: 'Meets DSM-5 criteria for specific phobia',
//     },
//     key_examination_points: [
//       'Assess immediate fear response when attempting to drive (DSM-5 Criterion B)',
//       'Evaluate physical and cognitive symptoms',
//       'Confirm specificity (only driving, not other transport)',
//       'Assess avoidance vs endurance with anxiety',
//       'Rule out PTSD (no intrusions, nightmares, hypervigilance, broad avoidance)',
//       'Evaluate functional impact on work, social life, independence',
//       'Duration >6 months',
//     ],
//     expected_management: [
//       'Psychoeducation about specific phobia',
//       'CBT with graded exposure therapy',
//       'Relaxation techniques',
//       'Driving instructor with experience in anxiety',
//       'Consider short-term anxiolytic if needed for exposure',
//       'Good prognosis with treatment',
//     ],
//   },

//   // CASE 9: Social Anxiety Disorder (Social Phobia)
//   {
//     case_id: 'PSYCH_SOCIAL_PHOBIA_001',
//     specialty: 'Psychiatry',
//     difficulty: 'Intermediate',
//     diagnosis: 'Social Anxiety Disorder (Social Phobia - Performance Type)',
//     patient_profile: {
//       name: 'Tom Anderson',
//       age: 27,
//       gender: 'Male',
//       occupation: 'Accountant',
//       presenting_complaint: 'Fear of social gatherings, especially wedding',
//       emotional_state: 'Extremely anxious about upcoming wedding',
//       communication_style: 'Tense when discussing wedding, embarrassed',
//     },
//     history_of_presenting_complaint:
//       'Getting married in 3 months. Intense fear about wedding ceremony - being center of attention. Worries about embarrassing self in front of 200 guests. Physical symptoms when thinking about it. Avoids work presentations and social events. Pattern since adolescence.',
//     past_medical_history: 'No formal diagnoses',
//     medications: ['None'],
//     social_history:
//       'In relationship (getting married). Avoids work social events. Limited social circle. Career progression affected.',
//     family_history: 'Possible family anxiety',
//     examination_findings: {
//       appearance: 'Tense, avoids eye contact when discussing fears',
//       speech: 'Anxious when discussing performance situations',
//       mood: 'Anxious',
//       affect: 'Anxious, embarrassed',
//     },
//     investigations: {
//       social_anxiety_scale: 'Pending',
//     },
//     key_examination_points: [
//       'Assess fear specific to performance/observation situations',
//       'Evaluate worry about embarrassment and negative evaluation',
//       'Confirm immediate anxiety response in social situations',
//       'Assess avoidance patterns (work events, social gatherings)',
//       'Rule out other anxiety disorders',
//       'Evaluate functional impairment',
//       'Duration and onset (often adolescence)',
//     ],
//     expected_management: [
//       'Normalize social anxiety (1 in 10 adults)',
//       'CBT with exposure hierarchy',
//       'Practice vows with gradually increasing audience',
//       'Consider SSRI',
//       'Relaxation and breathing techniques',
//       'Reassure about keeping wedding date with treatment',
//     ],
//   },

//   // CASE 10: Somatoform Pain Disorder / Conversion
//   {
//     case_id: 'PSYCH_SOMATOFORM_001',
//     specialty: 'Psychiatry',
//     difficulty: 'Advanced',
//     diagnosis: 'Somatic Symptom Disorder / Conversion Disorder',
//     patient_profile: {
//       name: 'Rachel Martinez',
//       age: 35,
//       gender: 'Female',
//       occupation: 'Office Worker',
//       presenting_complaint: 'Chronic pain symptoms / Paralysis with normal investigations',
//       emotional_state: 'Distressed, exhausted, frustrated',
//       communication_style: 'Focused on physical symptoms, resistant to psychological explanations',
//     },
//     history_of_presenting_complaint:
//       'Chronic pain 10/10 severity for months. All medical investigations normal. Pain dominates life. Significant functional impairment. Recent major life stressors: department change at work, caring for mother who had stroke. Pain worse when mood dips. Doctor-shopping behavior.',
//     past_medical_history: 'Multiple medical consultations, all investigations normal',
//     medications: ['Multiple pain medications tried'],
//     social_history:
//       'Stopped hobbies and exercise. Work stress from department change. Carer for mother with stroke. Social isolation. Financial stress.',
//     family_history: 'Mother had stroke - patient is carer',
//     examination_findings: {
//       physical_exam: 'Normal',
//       pain_severity: '10/10',
//       functional_impairment: 'Severe',
//       mood: 'Low, anxious',
//     },
//     investigations: {
//       all_medical_investigations: 'Normal',
//     },
//     key_examination_points: [
//       'Detailed pain narrative (location, quality, pattern, triggers)',
//       'Assess patient perception (catastrophizing, health anxiety)',
//       'Explore attention-seeking behaviors and doctor-shopping',
//       'Link to recent life stressors (work change, caring responsibilities)',
//       'Assess functional impact on work, sleep, hobbies, relationships',
//       'Evaluate mood and emotional state',
//       'Screen for secondary gains',
//       'Assess insight into mind-body connection',
//     ],
//     expected_management: [
//       'Validate suffering while explaining mind-body connection',
//       'CBT for somatic symptoms',
//       'Graded exercise and activity programs',
//       'Address underlying stressors (work, caring)',
//       'Antidepressant if comorbid depression',
//       'Avoid reinforcing sick role',
//       'Multidisciplinary approach',
//     ],
//   },

//   // CASE 11: Body Dysmorphic Disorder (BDD)
//   {
//     case_id: 'PSYCH_BDD_001',
//     specialty: 'Psychiatry',
//     difficulty: 'Advanced',
//     diagnosis: 'Body Dysmorphic Disorder (BDD)',
//     patient_profile: {
//       name: 'Emily Sanders',
//       age: 24,
//       gender: 'Female',
//       occupation: 'University Student',
//       presenting_complaint: 'Preoccupation with perceived defect in eyes',
//       emotional_state: 'Distressed, anxious, low self-esteem',
//       communication_style: 'Seeks reassurance, resistant to medical opinions, poor insight',
//     },
//     history_of_presenting_complaint:
//       'Convinced eyes are defective despite doctors saying normal. Spends hours checking mirrors. Constant reassurance-seeking on social media. Avoids photos and social situations. Wants referral to neurologist. Affecting work and relationships. Considers self-mutilation if cannot see specialist.',
//     past_medical_history: 'Multiple doctor consultations, all normal',
//     medications: ['None, may have tried over-the-counter treatments'],
//     social_history:
//       'University student. Social withdrawal. Cancelled events due to appearance concerns. Relationship difficulties.',
//     family_history: 'Possible perfectionism in family',
//     examination_findings: {
//       appearance: 'Normal appearance, preoccupied',
//       insight: 'Poor - cannot accept medical reassurance',
//       mood: 'Low, anxious',
//       affect: 'Distressed when discussing appearance',
//     },
//     investigations: {
//       medical_examinations: 'All normal',
//     },
//     key_examination_points: [
//       'Assess BDD triad: Preoccupation, Repetitive behaviors, Significant distress',
//       'Evaluate insight and response to reassurance',
//       'Assess time spent on checking behaviors',
//       'Explore reassurance-seeking patterns',
//       'Evaluate functional impact (work, social, relationships)',
//       'Screen for depression, anxiety, suicidal thoughts',
//       'Risk of self-mutilation',
//       'Rule out eating disorder',
//       'Assess for actual vs perceived defect',
//     ],
//     expected_management: [
//       'Psychoeducation about BDD',
//       'CBT with exposure and response prevention',
//       'SSRI (first-line pharmacotherapy)',
//       'Address comorbid depression/anxiety',
//       'Avoid cosmetic procedures',
//       'Risk management if self-harm thoughts',
//     ],
//   },

//   // CASE 12: Bulimia Nervosa with Diabetes
//   {
//     case_id: 'PSYCH_BULIMIA_001',
//     specialty: 'Psychiatry',
//     difficulty: 'Advanced',
//     diagnosis: 'Bulimia Nervosa with Type 1 Diabetes (Diabulimia)',
//     patient_profile: {
//       name: 'Sophie Anderson',
//       age: 19,
//       gender: 'Female',
//       occupation: 'University Student',
//       presenting_complaint: 'Insulin omission to lose weight, binge eating',
//       emotional_state: 'Ashamed, secretive, distressed',
//       communication_style: 'Reluctant initially, defensive, then opens up',
//     },
//     history_of_presenting_complaint:
//       'Type 1 diabetic since age 12. Binge eating episodes 3-4x/week. Skips or reduces insulin to lose weight. Recent DKA admission. Preoccupied with body weight and shape. Feels out of control. Poor diabetic control. Struggling academically. History of bullying about weight.',
//     past_medical_history: 'Type 1 Diabetes Mellitus since age 12, recent DKA',
//     medications: ['Insulin - inconsistently taken'],
//     social_history:
//       'University student. Limited peer support. History of being bullied about weight. Social isolation.',
//     family_history: 'Mother has anxiety disorder',
//     examination_findings: {
//       BMI: 19.5,
//       appearance: 'Thin, appears unwell',
//       vitals: 'Tachycardic',
//       mood: 'Low, ashamed',
//     },
//     investigations: {
//       HbA1c: '11.2% (very poor control)',
//       recent_DKA: true,
//       blood_glucose: 'Erratic',
//     },
//     key_examination_points: [
//       'Assess eating disorder triad: Binges, Compensatory behaviors, Body image distortion',
//       'Evaluate diabetes-specific behaviors (insulin omission)',
//       'Screen for medical complications (DKA, neuropathy, retinopathy)',
//       'Assess frequency and severity of binges',
//       'Evaluate body image and weight preoccupation',
//       'Screen for mood disorders and self-harm',
//       'Assess prognostic factors (family support, motivation, duration, comorbidities)',
//       'Evaluate insight and readiness for change',
//     ],
//     expected_management: [
//       'Joint diabetes-eating disorder specialized team',
//       'Medical stabilization',
//       'CBT-ED (Enhanced)',
//       'Family therapy',
//       'SSRI if comorbid depression',
//       'Diabetes education with ED-aware approach',
//       'Regular monitoring of metabolic parameters',
//       'Address underlying trauma (bullying)',
//     ],
//   },

//   // CASE 13: Schizophrenia Relapse and Weight Gain
//   {
//     case_id: 'PSYCH_SCHIZO_WEIGHT_001',
//     specialty: 'Psychiatry',
//     difficulty: 'Advanced',
//     diagnosis: 'Schizophrenia with Medication-Induced Weight Gain',
//     patient_profile: {
//       name: 'Michael Brown',
//       age: 32,
//       gender: 'Male',
//       occupation: 'Unemployed',
//       presenting_complaint: 'Stopped olanzapine due to weight gain, symptoms returning',
//       emotional_state: 'Distressed about weight, hearing voices again',
//       communication_style: 'Conflicted, wants wellness in mind and body',
//     },
//     history_of_presenting_complaint:
//       'Stopped olanzapine 2 weeks ago due to significant weight gain. Since stopping: voices and suspicious thoughts returning. Gained substantial weight on olanzapine over months. Weight gain affected self-esteem, mood, and social life. Now facing return of psychotic symptoms.',
//     past_medical_history: 'Schizophrenia diagnosed, previously stable on olanzapine',
//     medications: ['Olanzapine (stopped 2 weeks ago)'],
//     social_history:
//       'Lost girlfriend due to weight changes. Social withdrawal. Previously had active social life. Stopped outdoor activities.',
//     family_history: 'Possible family history of diabetes or heart disease',
//     examination_findings: {
//       appearance: 'Overweight, self-conscious',
//       speech: 'May show thought disorder',
//       mood: 'Low, frustrated',
//       thought_content: 'Auditory hallucinations returning, possible paranoia',
//       insight: 'Variable - wants both mental and physical health',
//     },
//     investigations: {
//       metabolic_screen: 'Cholesterol and glucose may be elevated',
//       weight: 'Significant gain from baseline',
//     },
//     key_examination_points: [
//       'Assess current psychotic symptoms (voices, paranoia, thought disorder)',
//       'Document weight changes and timeline',
//       'Evaluate dietary and activity changes',
//       'Assess functional impact of weight gain (self-esteem, social, relationships)',
//       'Screen for metabolic complications (diabetes, cardiovascular)',
//       'Assess insight: Understanding of medication vs weight vs psychosis trade-offs',
//       'Evaluate readiness to restart medication',
//       'Screen for self-harm risk',
//     ],
//     expected_management: [
//       'Validate concerns about weight and psychosis',
//       'Discuss alternative antipsychotics with lower metabolic risk',
//       'Offer lifestyle support (diet, exercise programs)',
//       'Restart antipsychotic urgently (voices returning)',
//       'Metabolic monitoring',
//       'Collaborative decision-making about medication choice',
//       'Regular follow-up',
//     ],
//   },

//   // CASE 14: SSRI Sexual Dysfunction
//   {
//     case_id: 'PSYCH_SSRI_001',
//     specialty: 'Psychiatry',
//     difficulty: 'Intermediate',
//     diagnosis: 'SSRI-Induced Sexual Dysfunction',
//     patient_profile: {
//       name: 'James Thompson',
//       age: 34,
//       gender: 'Male',
//       occupation: 'IT Consultant',
//       presenting_complaint: 'Wants to stop fluoxetine due to side effects',
//       emotional_state: 'Embarrassed, shy, reluctant to discuss',
//       communication_style: 'Vague initially, needs gentle exploration, embarrassed about sexual issues',
//     },
//     history_of_presenting_complaint:
//       'Started fluoxetine for depression. Dose increased to 40mg. Since starting medication, experiencing sexual dysfunction - trouble with erection/orgasm/decreased libido. Causing worry and embarrassment. In a relationship and affecting things with partner. Wants to stop medication because of these side effects.',
//     past_medical_history: 'Depression - currently on treatment',
//     medications: ['Fluoxetine 40mg (wants to stop)'],
//     social_history:
//       'In a relationship. Working. Sexual dysfunction affecting relationship quality.',
//     family_history: 'No relevant history mentioned',
//     examination_findings: {
//       appearance: 'Shy, embarrassed',
//       speech: 'Reluctant, vague initially',
//       mood: 'Need to assess current depression status',
//       affect: 'Congruent, embarrassed',
//     },
//     investigations: {
//       depression_screening: 'PHQ-9 to assess current mood',
//     },
//     key_examination_points: [
//       'Gently explore reason for wanting to stop medication',
//       'Normalize SSRI sexual side effects',
//       'Lead patient to discuss sexual problems (avoid direct questions initially)',
//       'Clarify specific sexual problems (erectile dysfunction, delayed orgasm, decreased libido)',
//       'Timeline - when did this start (after dose increase?)',
//       'Impact on relationship and emotional wellbeing',
//       'Rule out other causes (alcohol, drugs, diabetes, blood pressure, other medications)',
//       'Assess current depression status (mood, sleep, appetite, suicidal thoughts)',
//       'Balance assessment: mood improvement vs side effects',
//     ],
//     expected_management: [
//       'Validate concerns and normalize side effect',
//       'Explain SSRI sexual dysfunction is common and dose-related',
//       'Emphasize "doesn\'t mean anything is wrong with you as a man"',
//       'Offer multiple options: dose reduction, switching SSRI, adding medication, timing adjustments',
//       'Collaborative approach - adjust rather than stop suddenly',
//       'Warn about discontinuation syndrome',
//       'Follow-up to monitor mood and sexual function',
//     ],
//   },

//   // CASE 15: Psychosocial Weight Gain Assessment
//   {
//     case_id: 'PSYCH_WEIGHT_001',
//     specialty: 'Psychiatry',
//     difficulty: 'Intermediate',
//     diagnosis: 'Medication-Induced Weight Gain with Psychosocial Impact',
//     patient_profile: {
//       name: 'Robert Wilson',
//       age: 28,
//       gender: 'Male',
//       occupation: 'Unemployed (previously worked)',
//       presenting_complaint: 'Significant weight gain on antipsychotic medication',
//       emotional_state: 'Embarrassed, low self-esteem, socially withdrawn',
//       communication_style: 'Reluctant, self-conscious, needs validation',
//     },
//     history_of_presenting_complaint:
//       'Significant weight gain since starting olanzapine for schizophrenia. Lost girlfriend. Avoiding friends and activities. Stopped outdoor activities. Changed daily routine. Comfort eating. Night eating. Low mood, hopelessness. Blood results show elevated cholesterol and glucose.',
//     past_medical_history: 'Schizophrenia on olanzapine',
//     medications: ['Olanzapine'],
//     social_history:
//       'Recently lost girlfriend. Avoiding friends. Stopped social activities. Lives alone. Previously had active social life.',
//     family_history: 'To be explored for diabetes/cardiovascular disease',
//     examination_findings: {
//       vitals: 'Weight increased significantly',
//       blood_results: 'Elevated cholesterol and glucose',
//       appearance: 'Self-conscious about weight',
//       mood: 'Low, possible depression',
//     },
//     investigations: {
//       cholesterol: 'Elevated',
//       glucose: 'Elevated',
//       metabolic_syndrome_screening: 'Required',
//     },
//     key_examination_points: [
//       'Engage with empathy - normalize medication effects',
//       'Discuss blood results and metabolic risks',
//       'Screen for symptoms (thirst, urination, fatigue)',
//       'Explore diet and activity changes (comfort eating, night eating)',
//       'Assess psychosocial impact: relationships (lost girlfriend), social withdrawal, mood',
//       'Screen for depression, hopelessness, self-harm thoughts',
//       'Evaluate daily routine changes (sleep, eating patterns, physical activity)',
//       'Assess work/education/financial impact',
//       'Screen for substance use changes',
//       'Explore family/support structure',
//       'Evaluate motivation and readiness to change (Stages of Change Model)',
//     ],
//     expected_management: [
//       'Validate - "This isn\'t your fault; medication can have real impact"',
//       'Offer hope - "These changes are reversible"',
//       'Assess motivation at each stage of change',
//       'Collaborative planning: dietitian, activity changes, medication review',
//       'Small, achievable steps',
//       'Address barriers and facilitators to change',
//       'Link with appropriate resources',
//       'Monitor metabolic parameters regularly',
//       'Consider medication alternatives if weight continues to be problem',
//     ],
//   },
// ];













import { MedicalCase } from '../types';

export const medicalCases: MedicalCase[] = [
  // CASE 1: OCD (Postpartum)
  {
    case_id: 'PSYCH_OCD_001',
    specialty: 'Adult Psychiatry',
    station_type: 'history',
    session_number: 2,
    difficulty: 'Intermediate',
    diagnosis: 'Obsessive-Compulsive Disorder (Postpartum)',
    patient_profile: {
      name: 'Sarah Williams',
      age: 28,
      gender: 'Female',
      occupation: 'Teacher',
      presenting_complaint: 'Thoughts of contamination—compulsions to wash hands excessively',
      emotional_state: 'Anxious, distressed, exhausted',
      communication_style: 'Hesitant, needs courage to talk, seeks reassurance',
    },
    history_of_presenting_complaint:
      'Baby born 6 weeks ago. Experiencing intrusive thoughts about cleaning and contamination. Worries about germs/contamination affecting baby. Spends hours each day on cleaning routines. Cannot stop even when exhausted. Thoughts are ego-dystonic and cause significant distress. Avoiding certain activities with baby due to worries.',
    past_medical_history: 'No psychiatric history before pregnancy',
    medications: ['None'],
    social_history:
      'Lives with supportive husband. First-time mother. Husband comments on cleanliness concerns. Previously active social life, now withdrawn.',
    family_history: 'No significant psychiatric history mentioned',
    examination_findings: {
      appearance: 'Tired, anxious',
      speech: 'Normal rate, anxious content',
      mood: 'Anxious',
      affect: 'Anxious, ego-dystonic regarding obsessions',
    },
    investigations: {
      Y_BOCS_score: 'Pending',
    },
    key_examination_points: [
      'Explore obsessions in detail - ego-dystonic intrusive thoughts',
      'Assess compulsions and cleaning rituals',
      'Differentiate from postpartum psychosis (thoughts toward baby)',
      'Assess functional impact on baby care and relationships',
      'Screen for comorbid mood disorders (100% have comorbid mood)',
      'Evaluate sleep, social functioning, self-care, appetite',
      'Screen for harm to self and baby',
    ],
    expected_management: [
      'Normalize postpartum intrusive thoughts',
      'Explain OCD vs postpartum psychosis',
      'CBT with ERP (Exposure Response Prevention)',
      'Consider SSRI if severe',
      'Perinatal mental health referral',
      'Partner involvement and support',
    ],
  },

  // CASE 2: Autism Spectrum Disorder (Asperger Syndrome)
  {
    case_id: 'PSYCH_AUTISM_001',
    specialty: 'Adult Psychiatry',
    station_type: 'history',
    session_number: 2,
    difficulty: 'Intermediate',
    diagnosis: 'Autism Spectrum Disorder (Level 1 - Asperger Syndrome)',
    patient_profile: {
      name: 'David Chen',
      age: 34,
      gender: 'Male',
      occupation: 'Software Developer',
      presenting_complaint: 'Challenges at work related to social interactions and routines',
      emotional_state: 'Anxious, frustrated, overwhelmed',
      communication_style: 'Pedantic, fixated on special interests (colors), poor eye contact',
    },
    history_of_presenting_complaint:
      'Recently moved to new office/department. Cannot concentrate due to different office layout, lighting, noise. Struggles with new colleagues communication style. Has intense interest in specific colors and painting. Uncle has autism. Difficulty making friends since childhood.',
    past_medical_history: 'No formal diagnoses',
    medications: ['None'],
    social_history:
      'Lives alone. Limited social circle. Prefers routine and sameness. Previously in same office for long time. Struggles with workplace transitions.',
    family_history: 'Uncle diagnosed with autism',
    examination_findings: {
      appearance: 'Appropriate, fixated on interviewer clothing color',
      speech: 'Pedantic, tangential about special interests',
      mood: 'Anxious',
      affect: 'Restricted range',
      social_interaction: 'Difficulty with reciprocity and nonverbal communication',
    },
    investigations: {
      ADOS2_pending: true,
    },
    key_examination_points: [
      'Assess Criterion A: Social communication deficits (all 3 required)',
      'Assess Criterion B: Restricted/repetitive behaviors (at least 2 required)',
      'Explore workplace impact and routine adherence',
      'Evaluate special interests intensity and duration',
      'Obtain developmental history from childhood',
      'Assess sensory sensitivities',
      'Family history of autism traits',
    ],
    expected_management: [
      'Comprehensive autism assessment (ADOS-2)',
      'Workplace accommodations (routine, sensory environment)',
      'Social skills training if desired',
      'Peer support groups',
      'Education about autism spectrum',
    ],
  },

  // CASE 3: ADHD (Child)
  {
    case_id: 'PSYCH_ADHD_CHILD_001',
    specialty: 'Child & Adolescent',
    station_type: 'history',
    session_number: 2,
    difficulty: 'Intermediate',
    diagnosis: 'ADHD (Combined Type)',
    patient_profile: {
      name: 'David Williams (speak to Mum)',
      age: 8,
      gender: 'Male',
      occupation: 'Primary School Student',
      presenting_complaint: 'Trouble focusing, hyperactivity, impulsivity at home and school',
      emotional_state: 'Mother anxious and exhausted',
      communication_style: 'Mother descriptive, seeking help, collaborative',
    },
    history_of_presenting_complaint:
      'Teacher reports David cannot sit still, constantly disrupts class, forgets instructions, loses things. At home: refuses homework, argues constantly, cannot follow through on tasks. Always been active but worsening past year. Struggling academically. Poor grades.',
    past_medical_history: 'Always been active child, possible early developmental concerns',
    medications: ['None'],
    social_history:
      'Lives with both parents and younger sister. Father works long hours. Limited peer friendships. Father had similar difficulties as child.',
    family_history: 'Father had similar childhood difficulties',
    examination_findings: {
      appearance: 'Fidgety, distractible',
      speech: 'Interrupts frequently',
      mood: 'Irritable at times',
      affect: 'Labile',
    },
    investigations: {
      Conners_rating_pending: true,
    },
    key_examination_points: [
      'Screen for core ADHD symptoms: inattention, hyperactivity, impulsivity',
      'Assess across multiple settings (home AND school) - must occur in both',
      'Screen for comorbidities: Autism (24%), Learning Disorders (22%), Sleep (15%), Anxiety (12%), ODD (41%)',
      'Obtain detailed developmental history (25% have early developmental concerns)',
      'Assess functional impairment at home, school, socially',
      'Screen for adverse childhood experiences',
      'Medical screening: sleep, hearing, vision, seizures, head injuries',
    ],
    expected_management: [
      'Psychoeducation for parents and teachers',
      'Behavioral interventions',
      'Consider medication (methylphenidate)',
      'School support plan / educational accommodations',
      'Parenting support programs',
      'Regular monitoring and follow-up',
    ],
  },

  // CASE 4: ADHD (Adult)
  {
    case_id: 'PSYCH_ADHD_ADULT_001',
    specialty: 'Adult Psychiatry',
    station_type: 'history',
    session_number: 2,
    difficulty: 'Intermediate',
    diagnosis: 'ADHD (Adult)',
    patient_profile: {
      name: 'Michael Roberts',
      age: 32,
      gender: 'Male',
      occupation: 'Office Worker',
      presenting_complaint: 'Trouble focusing, hyperactivity, impulsivity at work',
      emotional_state: 'Frustrated, anxious about work performance',
      communication_style: 'Restless, examples of missed details, impulsive',
    },
    history_of_presenting_complaint:
      'Lifelong pattern of attention difficulties. Small errors at work from missed details. Difficulty tracking deadlines and bills. Struggles with multi-step instructions. Feels "driven by a motor". Difficulty waiting. Childhood teachers noted similar issues.',
    past_medical_history: 'No formal ADHD diagnosis in childhood',
    medications: ['None'],
    social_history:
      'Employed but receiving poor feedback. Relationship difficulties. Impulsive financial decisions. May use substances to focus/relax.',
    family_history: 'Possible family history of ADHD traits',
    examination_findings: {
      appearance: 'Restless',
      speech: 'Interrupts, blurts out responses',
      mood: 'Anxious, frustrated',
      affect: 'Labile',
    },
    investigations: {
      adult_ADHD_screening_pending: true,
    },
    key_examination_points: [
      'Assess inattention symptoms (errors, organization, distractibility)',
      'Assess hyperactivity-impulsivity (restlessness, waiting difficulty)',
      'MUST establish childhood onset (before age 12)',
      'Screen comorbidities: Anxiety/Mood, Substance Use (24%), Sleep, Personality traits',
      'Assess functional impact: employment, relationships, finances, daily living',
      'Risk assessment: driving safety, occupational hazards, financial impulsivity, substance misuse, self-harm, aggression',
    ],
    expected_management: [
      'Comprehensive ADHD assessment',
      'Medication trial (stimulants or non-stimulants)',
      'CBT for ADHD',
      'Workplace accommodations',
      'Address comorbidities',
      'Regular monitoring',
    ],
  },

  // CASE 5: Delirium vs Dementia
  {
    case_id: 'PSYCH_DELIRIUM_001',
    specialty: 'Old Age',
    station_type: 'examination',
    session_number: 2,
    difficulty: 'Advanced',
    diagnosis: 'Delirium (vs Dementia)',
    patient_profile: {
      name: 'Mrs. Anderson (speak to family)',
      age: 82,
      gender: 'Female',
      occupation: 'Retired',
      presenting_complaint: 'Acute confusion and behavioral changes',
      emotional_state: 'Family distressed and worried',
      communication_style: 'Family seeking answers about sudden change',
    },
    history_of_presenting_complaint:
      'Acute onset confusion over days. Fluctuating level of consciousness. Disoriented to time and place. Visual hallucinations. Disturbed sleep-wake cycle. Recent medical illness or medication change. This represents significant change from baseline functioning.',
    past_medical_history: 'Recent infection, surgery, or medication change',
    medications: ['Multiple medications - recent changes'],
    social_history:
      'Previously independent. Family involved in care.',
    family_history: 'To be explored',
    examination_findings: {
      consciousness: 'Fluctuating',
      attention: 'Impaired',
      orientation: 'Disoriented',
      perceptions: 'Visual hallucinations possible',
    },
    investigations: {
      blood_tests: 'Pending - FBC, U&E, LFT, glucose, infection markers',
      urine_analysis: 'Pending',
      imaging: 'Consider CT head',
    },
    key_examination_points: [
      'Establish timeline - acute vs gradual onset',
      'Assess for fluctuation - key feature of delirium',
      'Identify precipitating factors (infection, medications, metabolic)',
      'Determine baseline cognitive function',
      'Screen for underlying dementia',
      'Assess for medical causes',
    ],
    expected_management: [
      'Identify and treat underlying cause',
      'Review and optimize medications',
      'Environmental modifications',
      'Reorientation strategies',
      'Avoid sedatives unless essential',
      'Monitor and reassess regularly',
    ],
  },

  // CASE 6: Vascular Dementia Carer
  {
    case_id: 'PSYCH_DEMENTIA_001',
    specialty: 'Old Age',
    station_type: 'history',
    session_number: 2,
    difficulty: 'Advanced',
    diagnosis: 'Vascular Dementia (Carer Assessment)',
    patient_profile: {
      name: 'Mrs. James',
      age: 68,
      gender: 'Female',
      occupation: 'Carer (speaking about husband)',
      presenting_complaint: 'Challenges managing husband with dementia',
      emotional_state: 'Distressed, exhausted, overwhelmed',
      communication_style: 'Seeking help and support',
    },
    history_of_presenting_complaint:
      'Husband (Mr. James, 78) diagnosed with vascular dementia. Mrs. James is primary carer. Experiencing significant carer burden. Struggling with physical and emotional demands. Social isolation. Own health declining. Relationship role has changed from wife to carer.',
    past_medical_history: 'Mrs. James: own health concerns possible',
    medications: ['Husband on various medications'],
    social_history:
      'Mrs. James is sole carer. Limited formal support. May have lost social connections. Financial impact possible.',
    family_history: 'Husband has vascular risk factors',
    examination_findings: {
      husband_cognitive: 'Significantly impaired',
      carer_wellbeing: 'Declining',
    },
    investigations: {
      carer_burden_assessment: 'Zarit Burden Interview',
      husband_investigations: 'CT head showing vascular changes',
    },
    key_examination_points: [
      'Assess carer burden using Zarit domains: Physical/Emotional impact, Social life, Time/Personal freedom',
      'Evaluate support systems: Formal (services, respite) and Informal (family, friends)',
      'Assess carer health: Physical and mental health screening',
      'Explore relationship role change',
      'Screen for carer depression and suicidal thoughts',
      'Identify risks: Husband aggression, carer burnout, safety concerns, social isolation',
    ],
    expected_management: [
      'Carer\'s assessment from social services',
      'Respite care arrangements',
      'Dementia support groups',
      'Education about vascular dementia',
      'Address carer\'s own health needs',
      'Safety planning',
      'Financial and legal advice (power of attorney)',
    ],
  },

  // CASE 7: PTSD
  {
    case_id: 'PSYCH_PTSD_001',
    specialty: 'Adult Psychiatry',
    station_type: 'history',
    session_number: 2,
    difficulty: 'Advanced',
    diagnosis: 'Post-Traumatic Stress Disorder (PTSD)',
    patient_profile: {
      name: 'James Martinez',
      age: 35,
      gender: 'Male',
      occupation: 'Paramedic',
      presenting_complaint: 'Symptoms following traumatic event',
      emotional_state: 'Hypervigilant, distressed, guarded',
      communication_style: 'Reluctant to discuss trauma, stops when discussing details',
    },
    history_of_presenting_complaint:
      '3 months since traumatic incident at work. Experiencing intrusive memories, flashbacks, nightmares. Avoids situations that remind him of trauma. Hypervigilant and easily startled. Negative thoughts and guilt. Sleep disturbed. Using alcohol to cope.',
    past_medical_history: 'No previous psychiatric history',
    medications: ['None'],
    social_history:
      'Lives with partner. Previously outgoing, now withdrawn. Increased alcohol use. Occupational health concerns.',
    family_history: 'No psychiatric history',
    examination_findings: {
      appearance: 'Tense, hyperalert',
      speech: 'Guarded, stops when discussing trauma',
      mood: 'Anxious, guilty',
      affect: 'Restricted, vigilant',
    },
    investigations: {
      PCL5_score: 'Pending (PTSD checklist)',
    },
    key_examination_points: [
      'Establish trauma with permission-seeking approach',
      'Assess intrusive symptoms: memories, nightmares, flashbacks, emotional distress, physical reactivity',
      'Evaluate avoidance behaviors',
      'Screen for negative cognitions and mood changes',
      'Assess hypervigilance and exaggerated startle response',
      'Timeline (symptoms >1 month)',
      'Screen for substance use as coping mechanism',
      'Assess functional impact and occupational effects',
    ],
    expected_management: [
      'Trauma-focused CBT',
      'EMDR (Eye Movement Desensitization and Reprocessing)',
      'Consider SSRI if indicated',
      'Sleep hygiene education',
      'Avoid benzodiazepines',
      'Occupational health referral',
      'Address substance use',
    ],
  },

  // CASE 8: Specific Phobia - Fear of Driving
  {
    case_id: 'PSYCH_PHOBIA_DRIVING_001',
    specialty: 'Adult Psychiatry',
    station_type: 'history',
    session_number: 2,
    difficulty: 'Intermediate',
    diagnosis: 'Specific Phobia (Situational - Driving)',
    patient_profile: {
      name: 'Lisa Thompson',
      age: 29,
      gender: 'Female',
      occupation: 'Office Manager',
      presenting_complaint: 'Fear of driving after car accident',
      emotional_state: 'Anxious about driving, frustrated by limitations',
      communication_style: 'Can discuss accident calmly but intense anxiety about driving',
    },
    history_of_presenting_complaint:
      'Involved in car accident 8 months ago. Since then, experiences immediate intense fear when trying to drive. Physical symptoms: sweating, heart racing, "blanking out". Completely avoids driving. Can be a passenger without problems. No fear on public transport. Lost independence.',
    past_medical_history: 'No previous anxiety issues',
    medications: ['None'],
    social_history:
      'Work and social life affected. Relies on others for transport. Previously independent driver.',
    family_history: 'No significant anxiety disorders',
    examination_findings: {
      appearance: 'Anxious when discussing driving',
      speech: 'Normal',
      mood: 'Anxious about specific situation',
      affect: 'Congruent',
    },
    investigations: {
      phobia_assessment: 'Meets DSM-5 criteria for specific phobia',
    },
    key_examination_points: [
      'Assess immediate fear response when attempting to drive (DSM-5 Criterion B)',
      'Evaluate physical and cognitive symptoms',
      'Confirm specificity (only driving, not other transport)',
      'Assess avoidance vs endurance with anxiety',
      'Rule out PTSD (no intrusions, nightmares, hypervigilance, broad avoidance)',
      'Evaluate functional impact on work, social life, independence',
      'Duration >6 months',
    ],
    expected_management: [
      'Psychoeducation about specific phobia',
      'CBT with graded exposure therapy',
      'Relaxation techniques',
      'Driving instructor with experience in anxiety',
      'Consider short-term anxiolytic if needed for exposure',
      'Good prognosis with treatment',
    ],
  },

  // CASE 9: Social Anxiety Disorder (Social Phobia)
  {
    case_id: 'PSYCH_SOCIAL_PHOBIA_001',
    specialty: 'Adult Psychiatry',
    station_type: 'history',
    session_number: 2,
    difficulty: 'Intermediate',
    diagnosis: 'Social Anxiety Disorder (Social Phobia - Performance Type)',
    patient_profile: {
      name: 'Tom Anderson',
      age: 27,
      gender: 'Male',
      occupation: 'Accountant',
      presenting_complaint: 'Fear of social gatherings, especially wedding',
      emotional_state: 'Extremely anxious about upcoming wedding',
      communication_style: 'Tense when discussing wedding, embarrassed',
    },
    history_of_presenting_complaint:
      'Getting married in 3 months. Intense fear about wedding ceremony - being center of attention. Worries about embarrassing self in front of 200 guests. Physical symptoms when thinking about it. Avoids work presentations and social events. Pattern since adolescence.',
    past_medical_history: 'No formal diagnoses',
    medications: ['None'],
    social_history:
      'In a relationship (getting married). Avoids work social events. Limited social circle. Career progression affected.',
    family_history: 'Possible family anxiety',
    examination_findings: {
      appearance: 'Tense, avoids eye contact when discussing fears',
      speech: 'Anxious when discussing performance situations',
      mood: 'Anxious',
      affect: 'Anxious, embarrassed',
    },
    investigations: {
      social_anxiety_scale: 'Pending',
    },
    key_examination_points: [
      'Assess fear specific to performance/observation situations',
      'Evaluate worry about embarrassment and negative evaluation',
      'Confirm immediate anxiety response in social situations',
      'Assess avoidance patterns (work events, social gatherings)',
      'Rule out other anxiety disorders',
      'Evaluate functional impairment',
      'Duration and onset (often adolescence)',
    ],
    expected_management: [
      'Normalize social anxiety (1 in 10 adults)',
      'CBT with exposure hierarchy',
      'Practice vows with gradually increasing audience',
      'Consider SSRI',
      'Relaxation and breathing techniques',
      'Reassure about keeping wedding date with treatment',
    ],
  },

  // CASE 10: Somatoform Pain Disorder / Conversion
  {
    case_id: 'PSYCH_SOMATOFORM_001',
    specialty: 'Adult Psychiatry',
    station_type: 'history',
    session_number: 2,
    difficulty: 'Advanced',
    diagnosis: 'Somatic Symptom Disorder / Conversion Disorder',
    patient_profile: {
      name: 'Rachel Martinez',
      age: 35,
      gender: 'Female',
      occupation: 'Office Worker',
      presenting_complaint: 'Chronic pain symptoms / Paralysis with normal investigations',
      emotional_state: 'Distressed, exhausted, frustrated',
      communication_style: 'Focused on physical symptoms, resistant to psychological explanations',
    },
    history_of_presenting_complaint:
      'Chronic pain 10/10 severity for months. All medical investigations normal. Pain dominates life. Significant functional impairment. Recent major life stressors: department change at work, caring for mother who had stroke. Pain worse when mood dips. Doctor-shopping behavior.',
    past_medical_history: 'Multiple medical consultations, all investigations normal',
    medications: ['Multiple pain medications tried'],
    social_history:
      'Stopped hobbies and exercise. Work stress from department change. Carer for mother with stroke. Social isolation. Financial stress.',
    family_history: 'Mother had stroke - patient is carer',
    examination_findings: {
      physical_exam: 'Normal',
      pain_severity: '10/10',
      functional_impairment: 'Severe',
      mood: 'Low, anxious',
    },
    investigations: {
      all_medical_investigations: 'Normal',
    },
    key_examination_points: [
      'Detailed pain narrative (location, quality, pattern, triggers)',
      'Assess patient perception (catastrophizing, health anxiety)',
      'Explore attention-seeking behaviors and doctor-shopping',
      'Link to recent life stressors (work change, caring responsibilities)',
      'Assess functional impact on work, sleep, hobbies, relationships',
      'Evaluate mood and emotional state',
      'Screen for secondary gains',
      'Assess insight into mind-body connection',
    ],
    expected_management: [
      'Validate suffering while explaining mind-body connection',
      'CBT for somatic symptoms',
      'Graded exercise and activity programs',
      'Address underlying stressors (work, caring)',
      'Antidepressant if comorbid depression',
      'Avoid reinforcing sick role',
      'Multidisciplinary approach',
    ],
  },

  // CASE 11: Body Dysmorphic Disorder (BDD)
  {
    case_id: 'PSYCH_BDD_001',
    specialty: 'Adult Psychiatry',
    station_type: 'history',
    session_number: 2,
    difficulty: 'Advanced',
    diagnosis: 'Body Dysmorphic Disorder (BDD)',
    patient_profile: {
      name: 'Emily Sanders',
      age: 24,
      gender: 'Female',
      occupation: 'University Student',
      presenting_complaint: 'Preoccupation with perceived defect in eyes',
      emotional_state: 'Distressed, anxious, low self-esteem',
      communication_style: 'Seeks reassurance, resistant to medical opinions, poor insight',
    },
    history_of_presenting_complaint:
      'Convinced eyes are defective despite doctors saying normal. Spends hours checking mirrors. Constant reassurance-seeking on social media. Avoids photos and social situations. Wants referral to neurologist. Affecting work and relationships. Considers self-mutilation if cannot see specialist.',
    past_medical_history: 'Multiple doctor consultations, all normal',
    medications: ['None, may have tried over-the-counter treatments'],
    social_history:
      'University student. Social withdrawal. Cancelled events due to appearance concerns. Relationship difficulties.',
    family_history: 'Possible perfectionism in family',
    examination_findings: {
      appearance: 'Normal appearance, preoccupied',
      insight: 'Poor - cannot accept medical reassurance',
      mood: 'Low, anxious',
      affect: 'Distressed when discussing appearance',
    },
    investigations: {
      medical_examinations: 'All normal',
    },
    key_examination_points: [
      'Assess BDD triad: Preoccupation, Repetitive behaviors, Significant distress',
      'Evaluate insight and response to reassurance',
      'Assess time spent on checking behaviors',
      'Explore reassurance-seeking patterns',
      'Evaluate functional impact (work, social, relationships)',
      'Screen for depression, anxiety, suicidal thoughts',
      'Risk of self-mutilation',
      'Rule out eating disorder',
      'Assess for actual vs perceived defect',
    ],
    expected_management: [
      'Psychoeducation about BDD',
      'CBT with exposure and response prevention',
      'SSRI (first-line pharmacotherapy)',
      'Address comorbid depression/anxiety',
      'Avoid cosmetic procedures',
      'Risk management if self-harm thoughts',
    ],
  },

  // CASE 12: Bulimia Nervosa with Diabetes
  {
    case_id: 'PSYCH_BULIMIA_001',
    specialty: 'Adult Psychiatry',
    station_type: 'history',
    session_number: 2,
    difficulty: 'Advanced',
    diagnosis: 'Bulimia Nervosa with Type 1 Diabetes (Diabulimia)',
    patient_profile: {
      name: 'Sophie Anderson',
      age: 19,
      gender: 'Female',
      occupation: 'University Student',
      presenting_complaint: 'Insulin omission to lose weight, binge eating',
      emotional_state: 'Ashamed, secretive, distressed',
      communication_style: 'Reluctant initially, defensive, then opens up',
    },
    history_of_presenting_complaint:
      'Type 1 diabetic since age 12. Binge eating episodes 3-4x/week. Skips or reduces insulin to lose weight. Recent DKA admission. Preoccupied with body weight and shape. Feels out of control. Poor diabetic control. Struggling academically. History of bullying about weight.',
    past_medical_history: 'Type 1 Diabetes Mellitus since age 12, recent DKA',
    medications: ['Insulin - inconsistently taken'],
    social_history:
      'University student. Limited peer support. History of being bullied about weight. Social isolation.',
    family_history: 'Mother has anxiety disorder',
    examination_findings: {
      BMI: 19.5,
      appearance: 'Thin, appears unwell',
      vitals: 'Tachycardic',
      mood: 'Low, ashamed',
    },
    investigations: {
      HbA1c: '11.2% (very poor control)',
      recent_DKA: true,
      blood_glucose: 'Erratic',
    },
    key_examination_points: [
      'Assess eating disorder triad: Binges, Compensatory behaviors, Body image distortion',
      'Evaluate diabetes-specific behaviors (insulin omission)',
      'Screen for medical complications (DKA, neuropathy, retinopathy)',
      'Assess frequency and severity of binges',
      'Evaluate body image and weight preoccupation',
      'Screen for mood disorders and self-harm',
      'Assess prognostic factors (family support, motivation, duration, comorbidities)',
      'Evaluate insight and readiness for change',
    ],
    expected_management: [
      'Joint diabetes-eating disorder specialized team',
      'Medical stabilization',
      'CBT-ED (Enhanced)',
      'Family therapy',
      'SSRI if comorbid depression',
      'Diabetes education with ED-aware approach',
      'Regular monitoring of metabolic parameters',
      'Address underlying trauma (bullying)',
    ],
  },

  // CASE 13: Schizophrenia Relapse and Weight Gain
  {
    case_id: 'PSYCH_SCHIZO_WEIGHT_001',
    specialty: 'Adult Psychiatry',
    station_type: 'management',
    session_number: 1,
    difficulty: 'Advanced',
    diagnosis: 'Schizophrenia with Medication-Induced Weight Gain',
    patient_profile: {
      name: 'Michael Brown',
      age: 32,
      gender: 'Male',
      occupation: 'Unemployed',
      presenting_complaint: 'Stopped olanzapine due to weight gain, symptoms returning',
      emotional_state: 'Distressed about weight, hearing voices again',
      communication_style: 'Conflicted, wants wellness in mind and body',
    },
    history_of_presenting_complaint:
      'Stopped olanzapine 2 weeks ago due to significant weight gain. Since stopping: voices and suspicious thoughts returning. Gained substantial weight on olanzapine over months. Weight gain affected self-esteem, mood, and social life. Now facing return of psychotic symptoms.',
    past_medical_history: 'Schizophrenia diagnosed, previously stable on olanzapine',
    medications: ['Olanzapine (stopped 2 weeks ago)'],
    social_history:
      'Lost girlfriend due to weight changes. Social withdrawal. Previously had active social life. Stopped outdoor activities.',
    family_history: 'Possible family history of diabetes or heart disease',
    examination_findings: {
      appearance: 'Overweight, self-conscious',
      speech: 'May show thought disorder',
      mood: 'Low, frustrated',
      thought_content: 'Auditory hallucinations returning, possible paranoia',
      insight: 'Variable - wants both mental and physical health',
    },
    investigations: {
      metabolic_screen: 'Cholesterol and glucose may be elevated',
      weight: 'Significant gain from baseline',
    },
    key_examination_points: [
      'Assess current psychotic symptoms (voices, paranoia, thought disorder)',
      'Document weight changes and timeline',
      'Evaluate dietary and activity changes',
      'Assess functional impact of weight gain (self-esteem, social, relationships)',
      'Screen for metabolic complications (diabetes, cardiovascular)',
      'Assess insight: Understanding of medication vs weight vs psychosis trade-offs',
      'Evaluate readiness to restart medication',
      'Screen for self-harm risk',
    ],
    expected_management: [
      'Validate concerns about weight and psychosis',
      'Discuss alternative antipsychotics with lower metabolic risk',
      'Offer lifestyle support (diet, exercise programs)',
      'Restart antipsychotic urgently (voices returning)',
      'Metabolic monitoring',
      'Collaborative decision-making about medication choice',
      'Regular follow-up',
    ],
  },

  // CASE 14: SSRI Sexual Dysfunction
  {
    case_id: 'PSYCH_SSRI_001',
    specialty: 'Adult Psychiatry',
    station_type: 'management',
    session_number: 1,
    difficulty: 'Intermediate',
    diagnosis: 'SSRI-Induced Sexual Dysfunction',
    patient_profile: {
      name: 'James Thompson',
      age: 34,
      gender: 'Male',
      occupation: 'IT Consultant',
      presenting_complaint: 'Wants to stop fluoxetine due to side effects',
      emotional_state: 'Embarrassed, shy, reluctant to discuss',
      communication_style: 'Vague initially, needs gentle exploration, embarrassed about sexual issues',
    },
    history_of_presenting_complaint:
      'Started fluoxetine for depression. Dose increased to 40mg. Since starting medication, experiencing sexual dysfunction - trouble with erection/orgasm/decreased libido. Causing worry and embarrassment. In a relationship and affecting things with partner. Wants to stop medication because of these side effects.',
    past_medical_history: 'Depression - currently on treatment',
    medications: ['Fluoxetine 40mg (wants to stop)'],
    social_history:
      'In a relationship. Working. Sexual dysfunction affecting relationship quality.',
    family_history: 'No relevant history mentioned',
    examination_findings: {
      appearance: 'Shy, embarrassed',
      speech: 'Reluctant, vague initially',
      mood: 'Need to assess current depression status',
      affect: 'Congruent, embarrassed',
    },
    investigations: {
      depression_screening: 'PHQ-9 to assess current mood',
    },
    key_examination_points: [
      'Gently explore reason for wanting to stop medication',
      'Normalize SSRI sexual side effects',
      'Lead patient to discuss sexual problems (avoid direct questions initially)',
      'Clarify specific sexual problems (erectile dysfunction, delayed orgasm, decreased libido)',
      'Timeline - when did this start (after dose increase?)',
      'Impact on relationship and emotional wellbeing',
      'Rule out other causes (alcohol, drugs, diabetes, blood pressure, other medications)',
      'Assess current depression status (mood, sleep, appetite, suicidal thoughts)',
      'Balance assessment: mood improvement vs side effects',
    ],
    expected_management: [
      'Validate concerns and normalize side effect',
      'Explain SSRI sexual dysfunction is common and dose-related',
      'Emphasize "doesn\'t mean anything is wrong with you as a man"',
      'Offer multiple options: dose reduction, switching SSRI, adding medication, timing adjustments',
      'Collaborative approach - adjust rather than stop suddenly',
      'Warn about discontinuation syndrome',
      'Follow-up to monitor mood and sexual function',
    ],
  },

  // CASE 15: Psychosocial Weight Gain Assessment
  {
    case_id: 'PSYCH_WEIGHT_001',
    specialty: 'Adult Psychiatry',
    station_type: 'management',
    session_number: 1,
    difficulty: 'Intermediate',
    diagnosis: 'Medication-Induced Weight Gain with Psychosocial Impact',
    patient_profile: {
      name: 'Robert Wilson',
      age: 28,
      gender: 'Male',
      occupation: 'Unemployed (previously worked)',
      presenting_complaint: 'Significant weight gain on antipsychotic medication',
      emotional_state: 'Embarrassed, low self-esteem, socially withdrawn',
      communication_style: 'Reluctant, self-conscious, needs validation',
    },
    history_of_presenting_complaint:
      'Significant weight gain since starting olanzapine for schizophrenia. Lost girlfriend. Avoiding friends and activities. Stopped outdoor activities. Changed daily routine. Comfort eating. Night eating. Low mood, hopelessness. Blood results show elevated cholesterol and glucose.',
    past_medical_history: 'Schizophrenia on olanzapine',
    medications: ['Olanzapine'],
    social_history:
      'Recently lost girlfriend. Avoiding friends. Stopped social activities. Lives alone. Previously had active social life.',
    family_history: 'To be explored for diabetes/cardiovascular disease',
    examination_findings: {
      vitals: 'Weight increased significantly',
      blood_results: 'Elevated cholesterol and glucose',
      appearance: 'Self-conscious about weight',
      mood: 'Low, possible depression',
    },
    investigations: {
      cholesterol: 'Elevated',
      glucose: 'Elevated',
      metabolic_syndrome_screening: 'Required',
    },
    key_examination_points: [
      'Engage with empathy - normalize medication effects',
      'Discuss blood results and metabolic risks',
      'Screen for symptoms (thirst, urination, fatigue)',
      'Explore diet and activity changes (comfort eating, night eating)',
      'Assess psychosocial impact: relationships (lost girlfriend), social withdrawal, mood',
      'Screen for depression, hopelessness, self-harm thoughts',
      'Evaluate daily routine changes (sleep, eating patterns, physical activity)',
      'Assess work/education/financial impact',
      'Screen for substance use changes',
      'Explore family/support structure',
      'Evaluate motivation and readiness to change (Stages of Change Model)',
    ],
    expected_management: [
      'Validate - "This isn\'t your fault; medication can have real impact"',
      'Offer hope - "These changes are reversible"',
      'Assess motivation at each stage of change',
      'Collaborative planning: dietitian, activity changes, medication review',
      'Small, achievable steps',
      'Address barriers and facilitators to change',
      'Link with appropriate resources',
      'Monitor metabolic parameters regularly',
      'Consider medication alternatives if weight continues to be problem',
    ],
  },
];