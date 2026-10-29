/**
 * CareerLens AI — Curated Scholarship Programs for Bangladeshi Students
 * Verified opportunities for higher studies abroad (Masters, PhD, Fellowships).
 */

export const mockScholarships = [
  {
    id: 'sch-001',
    name: 'Chevening Scholarship',
    country: 'United Kingdom',
    country_code: 'GB',
    university: 'Any UK University (Oxford, Cambridge, UCL, Imperial, Manchester, Edinburgh, etc.)',
    degree_level: ['Masters'],
    fields_of_study: ['All Fields', 'Computer Science', 'Data Science', 'Public Policy', 'Law', 'Business', 'Engineering', 'Social Sciences'],
    eligibility: {
      nationality: ['Bangladeshi'],
      min_gpa: 3.0,
      work_experience_years: 2,
      language_requirements: { ielts_min: 6.5, toefl_min: 79 },
    },
    funding_type: 'full',
    benefits: [
      'Full university tuition fees',
      'Monthly living stipend (£1,300 - £1,600/month)',
      'Economy round-trip airfare from Dhaka to UK',
      'Visa application fee & travel grant',
      'Arrival and departure allowances',
      'Access to exclusive Chevening networking events across Britain'
    ],
    application_deadline: '2026-11-05',
    application_url: 'https://www.chevening.org/scholarships/',
    description: 'The UK Government\'s most prestigious global scholarship programme, funded by the Foreign, Commonwealth & Development Office (FCDO). Fully covers a one-year Master’s degree in any subject at any accredited UK university for future leaders from Bangladesh.',
    required_documents: ['Online Chevening application', 'Undergraduate transcripts & certificate', '2 Professional / Academic references', 'Four leadership essays (500 words each)', 'Unconditional UK university offer'],
    tags: ['leadership', 'uk', 'prestige', 'fully-funded', 'fcdouk'],
    active: true,
  },
  {
    id: 'sch-002',
    name: 'DAAD EPOS / Helmut-Schmidt Scholarship',
    country: 'Germany',
    country_code: 'DE',
    university: 'German Public Universities (TUM, RWTH Aachen, Uni Bonn, Heidelberg, etc.)',
    degree_level: ['Masters', 'PhD'],
    fields_of_study: ['Engineering', 'Computer Science', 'Renewable Energy', 'Economics', 'Development Studies', 'Public Policy'],
    eligibility: {
      nationality: ['Bangladeshi'],
      min_gpa: 3.0,
      work_experience_years: 2,
      language_requirements: { ielts_min: 6.0, toefl_min: 80 },
    },
    funding_type: 'full',
    benefits: [
      'Zero tuition fees at top German public universities',
      'Monthly stipend (€934 for Masters, €1,300 for PhD)',
      'Full health, accident, and personal liability insurance',
      'Travel allowance for flights to and from Germany',
      'Free 2-6 months intensive German language training in Germany',
      'Monthly rent subsidy and allowance for accompanying family members'
    ],
    application_deadline: '2026-10-31',
    application_url: 'https://www.daad.de/en/study-and-research-in-germany/scholarships/',
    description: 'The German Academic Exchange Service (DAAD) funds highly qualified professionals from developing nations including Bangladesh. Tuition-free world-class STEM and social science education in the heart of Europe.',
    required_documents: ['DAAD application form', 'Europass CV format', 'Letter of Motivation', 'Undergraduate transcripts', '2 Recommendation letters', 'English proficiency test (IELTS/TOEFL)'],
    tags: ['tuition-free', 'germany', 'engineering', 'research', 'europe', 'stem'],
    active: true,
  },
  {
    id: 'sch-003',
    name: 'Fulbright Foreign Student Program',
    country: 'United States',
    country_code: 'US',
    university: 'Participating US Universities (MIT, Harvard, Stanford, Columbia, Berkeley, etc.)',
    degree_level: ['Masters', 'PhD'],
    fields_of_study: ['All Fields', 'STEM', 'Public Health', 'Economics', 'Environmental Science', 'Education', 'Humanities'],
    eligibility: {
      nationality: ['Bangladeshi'],
      min_gpa: 3.2,
      work_experience_years: 2,
      language_requirements: { ielts_min: 7.0, toefl_min: 90 },
    },
    funding_type: 'full',
    benefits: [
      '100% full tuition and mandatory university fees',
      'Generous monthly living allowance ($1,800 - $2,500/month)',
      'Round-trip international airfare between Dhaka and USA',
      'Accident & sickness health benefits plan',
      'Textbook and settling-in allowance',
      'Enrichment seminars across American universities'
    ],
    application_deadline: '2027-02-15',
    application_url: 'https://foreign.fulbrightonline.org/',
    description: 'The flagship international educational exchange program sponsored by the U.S. government. Highly competitive for Bangladeshi university graduates to complete a fully funded Masters degree in the USA.',
    required_documents: ['Online Fulbright application', 'Academic transcripts and diplomas', 'Three letters of recommendation', 'Personal statement essay', 'Study objective essay', 'GRE scores (if required by department)'],
    tags: ['usa', 'prestigious', 'ivy-league', 'fully-funded', 'cultural-exchange'],
    active: true,
  },
  {
    id: 'sch-004',
    name: 'Commonwealth Master’s & PhD Scholarship',
    country: 'United Kingdom',
    country_code: 'GB',
    university: 'UK Universities in the Commonwealth Network',
    degree_level: ['Masters', 'PhD'],
    fields_of_study: ['Science & Tech for Development', 'Strengthening Health Systems', 'Promoting Global Prosperity', 'Environmental Resilience'],
    eligibility: {
      nationality: ['Bangladeshi'],
      min_gpa: 3.3,
      work_experience_years: 0,
      language_requirements: { ielts_min: 6.5, toefl_min: 80 },
    },
    funding_type: 'full',
    benefits: [
      'Approved full airfare to the UK and return flight to Bangladesh',
      'Full tuition and examination fees',
      'Living stipend (£1,347 per month, or £1,652 in London)',
      'Warm clothing allowance upon arrival in the UK',
      'Study travel grant towards the cost of study-related travel in the UK',
      'Child allowance if applicable'
    ],
    application_deadline: '2026-12-12',
    application_url: 'https://cscuk.fcdo.gov.uk/scholarships/',
    description: 'Funded by the UK Foreign, Commonwealth & Development Office for Commonwealth citizens. Nominated primarily via Bangladesh University Grants Commission (UGC). Focused on talent contributing to sustainable national development.',
    required_documents: ['CSC Online Application', 'UGC Bangladesh Nomination Form', 'Academic transcripts', '2 References', 'Development Impact Statement'],
    tags: ['commonwealth', 'uk', 'fully-funded', 'ugc-nominated'],
    active: true,
  },
  {
    id: 'sch-005',
    name: 'Australia Awards Scholarship',
    country: 'Australia',
    country_code: 'AU',
    university: 'Australian Universities (ANU, Uni of Melbourne, Sydney, UNSW, Monash, Queensland)',
    degree_level: ['Masters'],
    fields_of_study: ['Education', 'Health', 'Infrastructure & Climate Resilience', 'Trade & Economics', 'Governance & Public Policy', 'IT'],
    eligibility: {
      nationality: ['Bangladeshi'],
      min_gpa: 3.0,
      work_experience_years: 2,
      language_requirements: { ielts_min: 6.5, toefl_min: 84 },
    },
    funding_type: 'full',
    benefits: [
      'Full tuition fees paid directly to the Australian institution',
      'Return economy class airfare',
      'Establishment allowance of AUD $5,000 upon arrival',
      'Contribution to Living Expenses (CLE) paid fortnightly (approx. AUD $35,000/yr)',
      'Overseas Student Health Cover (OSHC) for the duration of the grant',
      'Introductory Academic Program (IAP) prior to commencing studies'
    ],
    application_deadline: '2027-04-30',
    application_url: 'https://www.dfat.gov.au/people-to-people/australia-awards/',
    description: 'Prestigious international scholarships funded by the Australian Department of Foreign Affairs and Trade (DFAT). Equips Bangladeshi leaders with the skills and knowledge to drive positive change in their home country.',
    required_documents: ['OASIS online portal application', 'Certified copies of academic transcripts', 'IELTS/PTE academic certificate', 'Development impact plan', 'Employer support letter'],
    tags: ['australia', 'dfat', 'fully-funded', 'leadership', 'masters'],
    active: true,
  },
  {
    id: 'sch-006',
    name: 'Erasmus Mundus Joint Masters (EMJM)',
    country: 'Europe (Multi-Country)',
    country_code: 'EU',
    university: 'Consortium of 2-4 European Universities (France, Germany, Italy, Spain, Belgium, Sweden)',
    degree_level: ['Masters'],
    fields_of_study: ['Computer Science', 'Artificial Intelligence', 'Cybersecurity', 'Renewable Energy', 'Biomedical Science', 'Economics', 'Digital Humanities'],
    eligibility: {
      nationality: ['Bangladeshi'],
      min_gpa: 3.0,
      work_experience_years: 0,
      language_requirements: { ielts_min: 6.5, toefl_min: 85 },
    },
    funding_type: 'full',
    benefits: [
      '100% tuition waiver across all consortium universities',
      '€1,400 monthly living allowance for up to 24 months',
      '€3,000 per year travel grant + €1,000 installation allowance',
      'Comprehensive worldwide health insurance',
      'Study in at least two different European countries with multiple degrees awarded'
    ],
    application_deadline: '2027-01-15',
    application_url: 'https://www.eacea.ec.europa.eu/scholarships/erasmus-mundus-catalogue_en',
    description: 'European Union-funded elite Master’s programs delivered by international university consortia. Students study in 2, 3, or even 4 different countries, gaining dual or joint European degrees with full scholarship funding.',
    required_documents: ['Programme specific online portal submission', 'Academic transcripts', 'CV (Europass)', '2 Academic reference letters', 'Statement of purpose / motivation letter', 'English proficiency test'],
    tags: ['europe', 'multi-country', 'joint-degree', 'erasmus', 'fully-funded'],
    active: true,
  },
  {
    id: 'sch-007',
    name: 'MEXT Japanese Government Scholarship',
    country: 'Japan',
    country_code: 'JP',
    university: 'National & Public Universities in Japan (University of Tokyo, Kyoto, Tokyo Tech, Osaka)',
    degree_level: ['Masters', 'PhD'],
    fields_of_study: ['Engineering', 'Computer Science', 'Robotics', 'Natural Sciences', 'Biotechnology', 'Social Sciences', 'Humanities'],
    eligibility: {
      nationality: ['Bangladeshi'],
      min_gpa: 3.0,
      work_experience_years: 0,
      language_requirements: { ielts_min: 0, toefl_min: 0 },
    },
    funding_type: 'full',
    benefits: [
      'Full exemption from all entrance examination fees and university tuition',
      'Monthly stipend: ¥144,000 for Masters, ¥145,000 for PhD (approx. $1,000/mo)',
      'Round-trip economy flight tickets (Dhaka to Tokyo and return)',
      '6 months of intensive Japanese language immersion training in Japan',
      'No IELTS mandatory if academic medium of instruction was English'
    ],
    application_deadline: '2027-05-15',
    application_url: 'https://www.bd.emb-japan.go.jp/itpr_en/education.html',
    description: 'Awarded by the Ministry of Education, Culture, Sports, Science and Technology (MEXT) of Japan through the Embassy of Japan in Dhaka and university recommendations. One of the highest funded programs in Asia.',
    required_documents: ['Embassy application form', 'Field of study and research plan', 'Certified university transcripts & graduation certificate', 'Recommendation letters', 'Medical certificate', 'Abstract of previous thesis'],
    tags: ['japan', 'mext', 'fully-funded', 'asia', 'engineering', 'research'],
    active: true,
  },
  {
    id: 'sch-008',
    name: 'Swedish Institute Scholarships (SISGP)',
    country: 'Sweden',
    country_code: 'SE',
    university: 'Swedish Universities (KTH Royal Institute, Lund, Uppsala, Chalmers, Stockholm University)',
    degree_level: ['Masters'],
    fields_of_study: ['Sustainability', 'Computer Science', 'Innovation', 'Renewable Energy', 'Global Health', 'Entrepreneurship'],
    eligibility: {
      nationality: ['Bangladeshi'],
      min_gpa: 3.0,
      work_experience_years: 3,
      language_requirements: { ielts_min: 6.5, toefl_min: 90 },
    },
    funding_type: 'full',
    benefits: [
      'Full university tuition fees paid directly to Swedish universities',
      'Monthly living allowance of SEK 12,000 (approx. $1,150/mo)',
      'Travel grant of SEK 15,000 for international flights',
      'Comprehensive insurance against illness and accident',
      'Membership in the SI Network for Future Global Leaders'
    ],
    application_deadline: '2027-02-15',
    application_url: 'https://si.se/en/apply/scholarships/',
    description: 'Targets ambitious professionals from eligible countries including Bangladesh. Covers full tuition and living expenses for a Master’s degree in Sweden, with strong emphasis on UN 2030 Sustainable Development Goals.',
    required_documents: ['Universityadmissions.se application', 'SI online scholarship application', 'CV in SI template', 'Proof of minimum 3,000 hours of work experience', 'Two letters of reference'],
    tags: ['sweden', 'nordic', 'sustainability', 'leadership', 'fully-funded'],
    active: true,
  },
  {
    id: 'sch-009',
    name: 'Türkiye Bursları (Turkish Government Scholarship)',
    country: 'Turkey',
    country_code: 'TR',
    university: 'Turkish Public & Research Universities (METU, Boğaziçi, Istanbul University, Bilkent, ITU)',
    degree_level: ['Masters', 'PhD'],
    fields_of_study: ['Engineering', 'Computer Science', 'Medicine', 'International Relations', 'Islamic Studies', 'Business', 'Agriculture'],
    eligibility: {
      nationality: ['Bangladeshi'],
      min_gpa: 3.0,
      work_experience_years: 0,
      language_requirements: { ielts_min: 0, toefl_min: 0 },
    },
    funding_type: 'full',
    benefits: [
      '100% full university placement and tuition waiver',
      'Monthly allowance (1,400 TL - 2,600 TL/month)',
      'Free student dormitory accommodation',
      'Comprehensive state health insurance',
      'One-time return international flight ticket',
      '1-year free Turkish Language Course (TÖMER)'
    ],
    application_deadline: '2027-02-20',
    application_url: 'https://turkiyeburslari.gov.tr/',
    description: 'Turkey’s official government scholarship for international students. Extremely popular among Bangladeshi graduates due to generous package including dormitories, stipend, medical cover, and flight tickets.',
    required_documents: ['Online TB application portal', 'National Passport or NID', 'Bachelor diploma & marksheet', 'Academic reference letters', 'Letter of Intent / Research proposal'],
    tags: ['turkey', 'accommodation-included', 'fully-funded', 'generous'],
    active: true,
  },
  {
    id: 'sch-010',
    name: 'Global Korea Scholarship (GKS / KGSP)',
    country: 'South Korea',
    country_code: 'KR',
    university: 'Korean Universities (SNU, KAIST, Yonsei, Korea University, POSTECH)',
    degree_level: ['Masters', 'PhD'],
    fields_of_study: ['Artificial Intelligence', 'Electronics & Semiconductor', 'Computer Science', 'Mechanical Engineering', 'Biomedical Science', 'Business'],
    eligibility: {
      nationality: ['Bangladeshi'],
      min_gpa: 2.8,
      work_experience_years: 0,
      language_requirements: { ielts_min: 0, toefl_min: 0 },
    },
    funding_type: 'full',
    benefits: [
      'Complete tuition coverage up to 5,000,000 KRW per semester',
      'Monthly stipend: 1,000,000 KRW for degree students',
      'Round-trip economy flight tickets between Dhaka and Incheon',
      'Settlement allowance of 200,000 KRW upon arrival',
      'Medical insurance coverage of 20,000 KRW per month',
      '1-year intensive Korean language training before degree commencement'
    ],
    application_deadline: '2027-03-20',
    application_url: 'https://www.studyinkorea.go.kr/en/sub/gks/allnew_inviteScholar.do',
    description: 'Designed to provide international students with opportunities to conduct advanced studies in undergraduate & graduate programs at higher educational institutions in the Republic of Korea. Available via Embassy and University tracks.',
    required_documents: ['GKS Application Form', 'Personal Statement', 'Statement of Purpose / Study Plan', 'Two recommendation letters', 'Official undergraduate transcripts & degree certificate'],
    tags: ['korea', 'kaist', 'semiconductor', 'fully-funded', 'asia'],
    active: true,
  },
  {
    id: 'sch-011',
    name: 'Chinese Government Scholarship (CSC - Bilateral & High-Level)',
    country: 'China',
    country_code: 'CN',
    university: 'Top Chinese Universities (Tsinghua, Peking, Zhejiang, Fudan, SJTU, USTC)',
    degree_level: ['Masters', 'PhD'],
    fields_of_study: ['AI & Robotics', 'Civil Engineering', 'Material Science', 'Biomedical Engineering', 'Data Science', 'International Trade'],
    eligibility: {
      nationality: ['Bangladeshi'],
      min_gpa: 3.0,
      work_experience_years: 0,
      language_requirements: { ielts_min: 0, toefl_min: 0 },
    },
    funding_type: 'full',
    benefits: [
      'Full tuition waiver for all course duration',
      'Free university dormitory room or accommodation subsidy',
      'Monthly living stipend: 3,000 RMB for Masters, 3,500 RMB for PhD',
      'Comprehensive medical insurance (800 RMB/year)',
      'English-taught programs available without mandatory Chinese requirement'
    ],
    application_deadline: '2027-03-31',
    application_url: 'https://www.campuschina.org/',
    description: 'Administered by the China Scholarship Council (CSC). Provides full funding for Bangladeshi postgraduate students to study at top-ranked C9 League research universities in China.',
    required_documents: ['CSC Online Portal Application', 'Notarized Bachelor degree & transcripts', 'Research proposal (minimum 800 words)', 'Two academic professor recommendation letters', 'Foreigner Physical Examination Form'],
    tags: ['china', 'csc', 'fully-funded', 'stem', 'engineering'],
    active: true,
  },
  {
    id: 'sch-012',
    name: 'Stipendium Hungaricum Scholarship',
    country: 'Hungary',
    country_code: 'HU',
    university: 'Hungarian Universities (Eötvös Loránd Uni - ELTE, BME Budapest, Uni of Debrecen, Szeged)',
    degree_level: ['Masters', 'PhD'],
    fields_of_study: ['Computer Science', 'Agricultural Sciences', 'Natural Sciences', 'Engineering', 'Economics', 'Medical & Health Sciences'],
    eligibility: {
      nationality: ['Bangladeshi'],
      min_gpa: 2.8,
      work_experience_years: 0,
      language_requirements: { ielts_min: 6.0, toefl_min: 75 },
    },
    funding_type: 'full',
    benefits: [
      'Exemption from the payment of tuition fees',
      'Monthly stipend: HUF 43,700 for Masters, HUF 140,000 for PhD students',
      'Free dormitory accommodation or HUF 40,000/month contribution to housing',
      'Health insurance services of up to HUF 65,000/year per person',
      'Schengen area residency permitting travel across European countries'
    ],
    application_deadline: '2027-01-15',
    application_url: 'https://stipendiumhungaricum.hu/',
    description: 'Based on the bilateral education agreement between the Ministry of Foreign Affairs and Trade of Hungary and the Ministry of Education of Bangladesh. Offers over 140 English-taught programs in Central Europe.',
    required_documents: ['DreamApply online application', 'Nomination from Bangladesh Ministry of Education', 'Certificate of education & transcripts', 'Motivation letter', 'Proof of language proficiency'],
    tags: ['hungary', 'europe', 'schengen', 'fully-funded', 'moe-bangladesh'],
    active: true,
  },
  {
    id: 'sch-013',
    name: 'Swiss Government Excellence Scholarships',
    country: 'Switzerland',
    country_code: 'CH',
    university: 'Swiss Federal Institutes & Cantonal Universities (ETH Zurich, EPFL, Uni of Geneva, Basel, Zurich)',
    degree_level: ['PhD'],
    fields_of_study: ['Quantum Computing', 'Computer Science', 'Biotechnology', 'Environmental Engineering', 'Physics', 'Chemistry'],
    eligibility: {
      nationality: ['Bangladeshi'],
      min_gpa: 3.5,
      work_experience_years: 1,
      language_requirements: { ielts_min: 7.0, toefl_min: 100 },
    },
    funding_type: 'full',
    benefits: [
      'Monthly payment of CHF 1,920 (approx. $2,100/mo)',
      'Mandatory Swiss health insurance coverage',
      'Airfare allowance for return flight to Bangladesh',
      'One-time housing allowance of CHF 300 upon arrival',
      'Free half-fare public transport card across all Swiss trains and transit'
    ],
    application_deadline: '2026-11-15',
    application_url: 'https://www.sbfi.admin.ch/scholarships_eng',
    description: 'Offered by the Swiss Federal Commission for Scholarships for Foreign Students (FCS). Targets young researchers from Bangladesh who have completed a Master’s degree to conduct PhD research at top institutions like ETH Zurich.',
    required_documents: ['Official Swiss scholarship application form', 'Curriculum Vitae', 'Letter of motivation', 'Complete research proposal (5 pages)', 'Confirmatory letter from a Swiss academic professor willing to host'],
    tags: ['switzerland', 'eth-zurich', 'phd', 'excellence', 'high-stipend'],
    active: true,
  },
  {
    id: 'sch-014',
    name: 'Islamic Development Bank (IsDB) Scholarship',
    country: 'International (Member Countries & Top Ranked Universities)',
    country_code: 'ISDB',
    university: 'Top Ranked Universities Worldwide (including Cambridge, Oxford, McGill, Turkey, Malaysia)',
    degree_level: ['Masters', 'PhD'],
    fields_of_study: ['Sustainability', 'Agriculture & Food Security', 'Water & Sanitation', 'Renewable Energy', 'FinTech & Islamic Finance', 'Medicine'],
    eligibility: {
      nationality: ['Bangladeshi'],
      min_gpa: 3.3,
      work_experience_years: 1,
      language_requirements: { ielts_min: 6.5, toefl_min: 80 },
    },
    funding_type: 'full',
    benefits: [
      '100% full university tuition fees',
      'Generous monthly living allowance commensurate with the cost of living of the host country',
      'Return economy class air tickets',
      'Comprehensive medical insurance',
      'Installation & thesis preparation allowances'
    ],
    application_deadline: '2027-02-28',
    application_url: 'https://www.isdb.org/scholarships',
    description: 'Funded by the Islamic Development Bank for citizens of member countries including Bangladesh. Aims at human capital development in key science, technology, and sustainability sectors.',
    required_documents: ['IsDB Online portal form', 'Graduation diploma and academic transcripts', 'Research proposal', 'Proof of English or host country language proficiency', 'Referee reports'],
    tags: ['isdb', 'fully-funded', 'sustainability', 'islamic-development-bank'],
    active: true,
  },
  {
    id: 'sch-015',
    name: 'Eiffel Excellence Scholarship Programme',
    country: 'France',
    country_code: 'FR',
    university: 'French Universities & Grandes Écoles (Sorbonne, École Polytechnique, PSL, Sciences Po)',
    degree_level: ['Masters', 'PhD'],
    fields_of_study: ['Engineering Sciences', 'Computer Science & AI', 'Economics & Management', 'Law & Political Sciences', 'Ecological Transition'],
    eligibility: {
      nationality: ['Bangladeshi'],
      min_gpa: 3.4,
      work_experience_years: 0,
      language_requirements: { ielts_min: 6.5, toefl_min: 85 },
    },
    funding_type: 'full',
    benefits: [
      'Monthly allowance of €1,181 for Master’s candidates',
      'Monthly allowance of €1,800 for PhD research fellows',
      'International return flight tickets between Dhaka and France',
      'National train travel allowance to first study location',
      'Reimbursement of local transit and Campus France priority housing assistance'
    ],
    application_deadline: '2027-01-10',
    application_url: 'https://www.campusfrance.org/en/eiffel-scholarship-program-excellence',
    description: 'Launched by the French Ministry for Europe and Foreign Affairs to enable French higher education institutions to attract top foreign students from emerging countries like Bangladesh.',
    required_documents: ['Application submitted directly through a French higher education institution', 'CV & Professional project statement', 'Academic transcripts', 'Language test certificate'],
    tags: ['france', 'campus-france', 'europe', 'excellence', 'masters', 'phd'],
    active: true,
  },
  {
    id: 'sch-016',
    name: 'Singapore International Graduate Award (SINGA)',
    country: 'Singapore',
    country_code: 'SG',
    university: 'A*STAR Research Institutes, NUS, NTU, SUTD',
    degree_level: ['PhD'],
    fields_of_study: ['Biomedical Sciences', 'Computing & Information Sciences', 'Physical Sciences & Engineering', 'Artificial Intelligence'],
    eligibility: {
      nationality: ['Bangladeshi'],
      min_gpa: 3.5,
      work_experience_years: 0,
      language_requirements: { ielts_min: 6.5, toefl_min: 85 },
    },
    funding_type: 'full',
    benefits: [
      'Complete tuition fees covered for 4 years of PhD studies',
      'Monthly stipend of SGD $2,700, increased to SGD $3,200 after passing Qualifying Exam',
      'One-time airfare grant of up to SGD $1,500',
      'One-time settling-in allowance of SGD $1,000',
      'World-class research laboratories in Singapore'
    ],
    application_deadline: '2026-12-01',
    application_url: 'https://www.a-star.edu.sg/Scholarships/for-graduate-studies/singapore-international-graduate-award-singa',
    description: 'A collaboration between the Agency for Science, Technology and Research (A*STAR), NTU, NUS, and SUTD. Offers talented Bangladeshi university graduates the opportunity to pursue fully funded doctoral research in Singapore.',
    required_documents: ['SINGA Online portal application', 'Bachelor and Master academic transcripts', '2 Recommendation reports', 'Passport copy', 'Recent passport photo'],
    tags: ['singapore', 'astar', 'nus', 'ntu', 'phd', 'fully-funded', 'asia'],
    active: true,
  },
  {
    id: 'sch-017',
    name: 'Manaaki New Zealand Scholarships',
    country: 'New Zealand',
    country_code: 'NZ',
    university: 'New Zealand Universities (Uni of Auckland, Otago, Victoria Wellington, Canterbury, Massey)',
    degree_level: ['Masters', 'PhD'],
    fields_of_study: ['Climate Change & Environment', 'Renewable Energy', 'Food Security & Agriculture', 'Disaster Risk Management', 'Public Sector Leadership'],
    eligibility: {
      nationality: ['Bangladeshi'],
      min_gpa: 3.0,
      work_experience_years: 2,
      language_requirements: { ielts_min: 6.5, toefl_min: 90 },
    },
    funding_type: 'full',
    benefits: [
      'Full tuition fees for entire study period',
      'Living allowance (stipend) of NZD $531 per week',
      'Establishment allowance of NZD $3,000 towards accommodation and initial expenses',
      'Medical and travel insurance coverage',
      'Return air travel from Bangladesh to New Zealand',
      'Reimbursement of visa application and medical testing costs'
    ],
    application_deadline: '2027-02-28',
    application_url: 'https://www.nzscholarships.govt.nz/',
    description: 'Funded by the New Zealand Ministry of Foreign Affairs and Trade (MFAT). Seeks to empower individuals with knowledge and skills to drive sustainable social and economic progress in Bangladesh.',
    required_documents: ['Online MFAT scholarship application', 'Certified copies of university transcripts', 'IELTS Academic test report', 'Work history verification', 'Development rationale'],
    tags: ['new-zealand', 'mfat', 'fully-funded', 'climate', 'sustainability'],
    active: true,
  },
  {
    id: 'sch-018',
    name: 'Government of Ireland International Education Scholarship (GOI-IES)',
    country: 'Ireland',
    country_code: 'IE',
    university: 'Irish Higher Education Institutions (Trinity College Dublin, UCD, University of Galway, UCC, DCU)',
    degree_level: ['Masters', 'PhD'],
    fields_of_study: ['All Fields', 'Computer Science', 'Data Analytics', 'Biotechnology', 'Pharmaceutical Sciences', 'Finance'],
    eligibility: {
      nationality: ['Bangladeshi'],
      min_gpa: 3.3,
      work_experience_years: 0,
      language_requirements: { ielts_min: 6.5, toefl_min: 88 },
    },
    funding_type: 'full',
    benefits: [
      'Full tuition fee waiver for one year of Masters or PhD research',
      '€10,000 stipend awarded directly to the scholar for living expenses',
      'Two-year stay-back working visa post graduation in Ireland',
      'Access to Ireland’s thriving global tech and pharmaceutical hub (Google, Meta, Pfizer EU HQs)'
    ],
    application_deadline: '2027-03-15',
    application_url: 'https://hea.ie/policy/internationalisation/goi-ies/',
    description: 'Awarded by the Higher Education Authority (HEA) of Ireland on behalf of the Department of Further and Higher Education, Research, Innovation and Science. Sixty scholarships awarded annually to high-achieving non-EU students.',
    required_documents: ['HEA Online application', 'Offer of admission from an eligible Irish institution', 'Two academic reference letters', 'Statement of purpose and candidate potential'],
    tags: ['ireland', 'europe', 'tech-hub', 'stay-back-visa', 'fully-funded'],
    active: true,
  },
  {
    id: 'sch-019',
    name: 'Vanier Canada Graduate Scholarships',
    country: 'Canada',
    country_code: 'CA',
    university: 'Canadian Universities (Uni of Toronto, McGill, UBC, Waterloo, Montreal, Alberta)',
    degree_level: ['PhD'],
    fields_of_study: ['Health Research', 'Natural Sciences & Engineering', 'Social Sciences & Humanities', 'Computer Science'],
    eligibility: {
      nationality: ['Bangladeshi'],
      min_gpa: 3.6,
      work_experience_years: 1,
      language_requirements: { ielts_min: 7.0, toefl_min: 95 },
    },
    funding_type: 'full',
    benefits: [
      'CAD $50,000 per year for 3 consecutive years of doctoral study',
      'Covers all tuition fees with substantial surplus for comfortable living and research',
      'Pathway to Canadian Permanent Residency (PR) via Express Entry & Provincial Nominee Program (PNP)',
      'Collaboration with world-renowned Canadian research institutes'
    ],
    application_deadline: '2026-11-01',
    application_url: 'https://vanier.gc.ca/en/home-accueil.html',
    description: 'The Government of Canada launched the Vanier Canada Graduate Scholarships (Vanier CGS) program to strengthen Canada’s ability to attract and retain world-class doctoral students. Recognizes leadership and academic excellence.',
    required_documents: ['Nomination by participating Canadian university', 'ResearchNet online application', 'Academic transcripts', 'Project description and bibliography', 'Two referee assessments'],
    tags: ['canada', 'phd', 'vanier', 'high-stipend', 'pr-pathway'],
    active: true,
  },
  {
    id: 'sch-020',
    name: 'Russian Government State Scholarship',
    country: 'Russia',
    country_code: 'RU',
    university: 'Russian State Universities (Lomonosov Moscow State Uni, SPbU, Bauman Moscow Tech, MEPhI, HSE)',
    degree_level: ['Masters', 'PhD'],
    fields_of_study: ['Nuclear Energy Engineering', 'Aerospace Engineering', 'Medicine & Surgery', 'Computer Science', 'Mathematics', 'Civil Engineering'],
    eligibility: {
      nationality: ['Bangladeshi'],
      min_gpa: 2.8,
      work_experience_years: 0,
      language_requirements: { ielts_min: 0, toefl_min: 0 },
    },
    funding_type: 'full',
    benefits: [
      '100% full tuition exemption for the entire duration of the chosen program',
      'Free 1-year preparatory Russian language foundation course',
      'Subsidized university hostel accommodation (approx. $20 - $40/month)',
      'Monthly maintenance allowance',
      'Direct quotas allocated annually specifically for Bangladeshi citizens'
    ],
    application_deadline: '2027-01-31',
    application_url: 'https://education-in-russia.com/',
    description: 'Provided under the bilateral agreement between the Russian Federation and Bangladesh through the Russian House in Dhaka. High quota allocated for nuclear energy (supporting Rooppur Nuclear Power Plant engineers) and technical fields.',
    required_documents: ['Application on Education-in-Russia portal', 'Attested passport and educational certificates', 'Medical health certificate including HIV and hepatitis clearance', 'Russian House interview participation'],
    tags: ['russia', 'nuclear-energy', 'rooppur', 'fully-funded', 'government-quota'],
    active: true,
  },
  {
    id: 'sch-021',
    name: 'VLIR-UOS Master Scholarships (Belgium)',
    country: 'Belgium',
    country_code: 'BE',
    university: 'Flemish Universities in Belgium (KU Leuven, Ghent University, Uni of Antwerp, VUB Brussels)',
    degree_level: ['Masters'],
    fields_of_study: ['Water Resources Engineering', 'Biostatistics', 'Sustainable Development', 'Food Technology', 'Epidemiology & Global Health'],
    eligibility: {
      nationality: ['Bangladeshi'],
      min_gpa: 3.0,
      work_experience_years: 1,
      language_requirements: { ielts_min: 6.5, toefl_min: 80 },
    },
    funding_type: 'full',
    benefits: [
      'Full university tuition fees paid',
      'Monthly allowance of €1,400 to cover accommodation and living costs',
      'International round-trip airline ticket from Bangladesh to Belgium',
      'Comprehensive medical and accident insurance coverage',
      'Logistic grant and installation allowance'
    ],
    application_deadline: '2027-02-01',
    application_url: 'https://www.vliruos.be/en/scholarships',
    description: 'Funded by the Belgian Federal Government. Designed for students from developing partner countries including Bangladesh seeking specialized English-taught Masters degrees at Belgium’s world-renowned Flemish research institutions.',
    required_documents: ['Online university admission application', 'VLIR-UOS scholarship application form', 'Academic records', 'Professional motivation statement', 'Two academic reference letters'],
    tags: ['belgium', 'europe', 'flemish', 'ku-leuven', 'fully-funded'],
    active: true,
  },
  {
    id: 'sch-022',
    name: 'Brunei Darussalam Government Scholarship (BDGS)',
    country: 'Brunei',
    country_code: 'BN',
    university: 'Universiti Brunei Darussalam (UBD), Universiti Teknologi Brunei (UTB), UNISSA',
    degree_level: ['Masters', 'PhD'],
    fields_of_study: ['Engineering', 'Computer Science & Cybersecurity', 'Energy & Petroleum', 'Islamic Banking', 'Public Policy'],
    eligibility: {
      nationality: ['Bangladeshi'],
      min_gpa: 3.0,
      work_experience_years: 0,
      language_requirements: { ielts_min: 6.0, toefl_min: 75 },
    },
    funding_type: 'full',
    benefits: [
      'Exemption from payment of tuition fees including acceptance and examination fees',
      'Monthly living allowance of BND $500',
      'Monthly food allowance of BND $150',
      'Free residential hostel accommodation',
      'Return economy class air ticket',
      'Baggage allowance upon completion of program',
      'Comprehensive healthcare at Brunei Government hospitals'
    ],
    application_deadline: '2027-02-15',
    application_url: 'http://www.mfa.gov.bn/Pages/bdgs/bdgs2024.aspx',
    description: 'Funded by the Ministry of Foreign Affairs of Brunei Darussalam. Welcomes applicants from OIC and Commonwealth member countries including Bangladesh to study in an English-speaking, tax-free sultanate.',
    required_documents: ['BDGS Application Form endorsed by Ministry of Foreign Affairs / UGC Bangladesh', 'Certified educational certificates & transcripts', 'IELTS certificate', 'Security clearance certificate (Police Clearance)'],
    tags: ['brunei', 'asean', 'oic', 'commonwealth', 'accommodation-included', 'fully-funded'],
    active: true,
  }
];

/**
 * Match scholarships to a student profile or analyzed CV.
 */
export function getMatchingScholarships(profile, filters = {}) {
  const gpa = profile?.education?.[0]?.gpa || profile?.gpa || 3.5;
  const userIelts = profile?.ielts_score || profile?.ielts || null;
  const expYears = profile?.experience_years || (Array.isArray(profile?.experience) ? profile.experience.length : 0);
  const preferredCountries = profile?.preferred_countries || [];

  return mockScholarships
    .filter((sch) => {
      if (!sch.active) return false;
      if (filters.country && sch.country !== filters.country) return false;
      if (filters.degree_level && !sch.degree_level.includes(filters.degree_level)) return false;
      if (filters.funding_type && sch.funding_type !== filters.funding_type) return false;
      if (filters.search) {
        const q = filters.search.toLowerCase();
        const searchable = `${sch.name} ${sch.country} ${sch.university} ${sch.fields_of_study.join(' ')} ${sch.description} ${sch.tags.join(' ')}`.toLowerCase();
        if (!searchable.includes(q)) return false;
      }
      return true;
    })
    .map((sch) => {
      let matchScore = 55; // Base eligibility score

      // GPA check
      if (gpa >= sch.eligibility.min_gpa) {
        matchScore += 18;
      } else if (gpa >= sch.eligibility.min_gpa - 0.2) {
        matchScore += 8;
      }

      // Work experience check
      if (expYears >= sch.eligibility.work_experience_years) {
        matchScore += 12;
      }

      // IELTS check
      if (userIelts) {
        if (userIelts >= sch.eligibility.language_requirements.ielts_min) {
          matchScore += 15;
        }
      } else if (sch.eligibility.language_requirements.ielts_min === 0) {
        matchScore += 15; // No IELTS needed
      }

      // Preferred country match
      if (preferredCountries.some((c) => sch.country.toLowerCase().includes(c.toLowerCase()))) {
        matchScore += 10;
      }

      matchScore = Math.min(matchScore, 98);

      return { ...sch, match_score: matchScore };
    })
    .sort((a, b) => b.match_score - a.match_score);
}

export function getScholarshipById(id) {
  return mockScholarships.find((s) => s.id === id) || null;
}

export function getScholarshipCountries() {
  return [...new Set(mockScholarships.map((s) => s.country))];
}

export function getScholarshipDegreeLevels() {
  return [...new Set(mockScholarships.flatMap((s) => s.degree_level))];
}
