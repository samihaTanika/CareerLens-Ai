import json
import os

with open('scripts/generate_categories.py', 'r', encoding='utf-8') as f:
    text = f.read()

# Additional 22 categories to reach 83 categories total
extra_categories = [
    {
        "id": "judicial-service-bjs",
        "name": "Bangladesh Judicial Service (BJS Assistant Judge)",
        "sector": "Government & Judiciary",
        "is_government": True,
        "govt_grade": "Senior 9th Grade (BJS Pay Scale + Special Judicial Allowances)",
        "description": "Recruitment through Bangladesh Judicial Service Commission (BJSC). Appointees serve as Assistant Judges in District Courts and Judicial Magistrates.",
        "avg_salary_bdt": {"min": 45000, "max": 115000},
        "demand_level": "very_high",
        "required_skills": ["Code of Civil Procedure (CPC)", "Code of Criminal Procedure (CrPC)", "Penal Code 1860", "Evidence Act 1872", "Judicial Writing & Judgment Drafting", "Constitutional Law of Bangladesh"],
        "preferred_skills": ["Trial Court Procedure", "Case Law Research (DLR / BLD)", "Alternative Dispute Resolution (ADR)"],
        "typical_employers": ["Supreme Court of Bangladesh", "District & Sessions Judge Courts", "Chief Judicial Magistrate Courts"],
        "education_preference": "LL.B (Honours) / LL.M from recognized university with minimum 2nd class or CGPA 3.0",
        "bdjobs_search_terms": ["BJS Circular", "Assistant Judge BJS", "Judicial Service Commission", "Judicial Magistrate"]
    },
    {
        "id": "police-sub-inspector",
        "name": "Bangladesh Police Sub-Inspector (SI) & Sergeant",
        "sector": "Government & Public Safety",
        "is_government": True,
        "govt_grade": "10th Grade (National Pay Scale: ৳16,000 - ৳38,640 + Rations + Special Risk Allowance)",
        "description": "Direct recruitment into Bangladesh Police as Sub-Inspector (Unarmed) or Sergeant (Traffic & Highway Division), serving as investigating officers.",
        "avg_salary_bdt": {"min": 28000, "max": 65000},
        "demand_level": "very_high",
        "required_skills": ["Criminal Investigation Techniques", "CrPC & Penal Code Familiarity", "Physical Endurance & Fitness", "Bangla & English Police Reporting", "Public Law & Order Maintenance"],
        "preferred_skills": ["Cybercrime Investigation Basics", "Traffic Management & Road Transport Act 2018", "Firearms & Self Defense"],
        "typical_employers": ["Bangladesh Police", "Dhaka Metropolitan Police (DMP)", "Criminal Investigation Department (CID)", "Highway Police"],
        "education_preference": "Bachelor's / Honours degree in any discipline with minimum physical measurement requirements",
        "bdjobs_search_terms": ["Sub Inspector Police", "Police Sergeant", "Police SI Circular", "Bangladesh Police Teletalk"]
    },
    {
        "id": "govt-senior-staff-nurse",
        "name": "Govt. Senior Staff Nurse (DGNM & BPSC 10th Grade)",
        "sector": "Government & Healthcare",
        "is_government": True,
        "govt_grade": "10th Grade (National Pay Scale)",
        "description": "Direct recruitment of permanent registered senior staff nurses across government medical college hospitals, district sadar hospitals, and upazila health complexes.",
        "avg_salary_bdt": {"min": 28000, "max": 65000},
        "demand_level": "very_high",
        "required_skills": ["Clinical Nursing Care", "Medication Admin & Patient Safety", "Emergency Ward Management", "Infection Control Standards", "BNMC Registration"],
        "preferred_skills": ["ICU & CCU Patient Management", "Maternal & Child Health Care", "Operation Theater Assistance"],
        "typical_employers": ["Directorate General of Nursing & Midwifery (DGNM)", "Dhaka Medical College Hospital", "SSMC Mitford Hospital", "Chittagong Medical College Hospital"],
        "education_preference": "B.Sc in Nursing / Diploma in Nursing Science & Midwifery with valid BNMC registration",
        "bdjobs_search_terms": ["Senior Staff Nurse BPSC", "Govt Nurse Circular", "DGNM Staff Nurse", "Nurse Teletalk"]
    },
    {
        "id": "scientific-officer-research",
        "name": "Scientific Officer & Agricultural Researcher (BCSIR, BARI, BRRI)",
        "sector": "Government & Research",
        "is_government": True,
        "govt_grade": "9th Grade (National Pay Scale)",
        "description": "Public scientific research officers conducting crop breeding, industrial chemical development, biotechnology, and food science experiments.",
        "avg_salary_bdt": {"min": 38000, "max": 90000},
        "demand_level": "high",
        "required_skills": ["Scientific Experimental Design", "Statistical Data Analysis (R / SPSS)", "Laboratory Instrument Operation (GC-MS, PCR)", "Research Paper Publishing", "Scientific Literature Review"],
        "preferred_skills": ["Genomics & Molecular Markers", "Grant Proposal Writing", "Patent Application Procedures"],
        "typical_employers": ["BCSIR", "Bangladesh Agricultural Research Institute (BARI)", "Bangladesh Rice Research Institute (BRRI)", "Bangladesh Atomic Energy Commission (BAEC)"],
        "education_preference": "Master's degree or 4-year B.Sc in Agriculture, Chemistry, Biochemistry, Microbiology, Physics, or Biotechnology",
        "bdjobs_search_terms": ["Scientific Officer BCSIR", "BARI Scientific Officer", "BRRI Researcher", "Atomic Energy Scientific Officer"]
    },
    {
        "id": "merchant-navy-maritime",
        "name": "Merchant Navy Deck Officer & Marine Engineer",
        "sector": "Maritime & Shipping",
        "is_government": False,
        "description": "Navigating international ocean-going container vessels, bulk carriers, oil tankers, and overseeing marine diesel propulsion engines.",
        "avg_salary_bdt": {"min": 85000, "max": 350000},
        "demand_level": "high",
        "required_skills": ["Celestial & Electronic Navigation (ECDIS)", "COLREGs & Maritime Safety", "Marine Diesel Engine Operations", "Shipboard Cargo Handling & Stability", "STCW 2010 Certification"],
        "preferred_skills": ["CDC & Class 3/2 Marine Certificate of Competency (CoC)", "Tanker Endorsement (Oil/Chemical)", "Ship Simulator Navigation"],
        "typical_employers": ["Bangladesh Shipping Corporation (BSC)", "Akij Shipping", "Meghna Group Ocean Fleets", "International Maritime Lines (Maersk, MSC, Anglo-Eastern)"],
        "education_preference": "Pre-Sea Nautical Science or Marine Engineering graduation from Bangladesh Marine Academy",
        "bdjobs_search_terms": ["Marine Engineer Bangladesh", "Deck Officer Merchant Navy", "Trainee Nautical Officer", "BSC Marine"]
    },
    {
        "id": "apparel-fashion-designer",
        "name": "Fashion Designer & Technical Pattern Maker (CAD / Gerber)",
        "sector": "RMG & Garments",
        "is_government": False,
        "description": "Creating seasonal apparel collections, mood boards, tech packs, and automated pattern grading using Gerber or Lectra CAD systems.",
        "avg_salary_bdt": {"min": 32000, "max": 130000},
        "demand_level": "high",
        "required_skills": ["Apparel Pattern Making & Grading", "Gerber / Lectra CAD Software", "Fashion Illustration & Mood Boards", "Garment Fitting & Construction", "Fabric Drape & Behavior"],
        "preferred_skills": ["CLO 3D Virtual Sampling", "Print & Embroidery Artwork Design", "Trend Forecasting (WGSN)"],
        "typical_employers": ["Aarong", "Yellow by Beximco", "Cats Eye", "Sailor by Epyllion", "Ha-Meem Design Studio"],
        "education_preference": "Graduation in Fashion Design & Technology (BGMEA University of Fashion & Technology - BUFT, Shanto-Mariam, or SMUCT)",
        "bdjobs_search_terms": ["Fashion Designer RMG", "Pattern Master Gerber", "CAD Pattern Maker", "Apparel Designer"]
    },
    {
        "id": "leather-footwear-merchandising",
        "name": "Leather Goods & Footwear Engineering (Apex, Bay)",
        "sector": "Leather & Footwear",
        "is_government": False,
        "description": "Export leather shoe manufacturing, tannery wet processing, footwear upper construction, and international buyer merchandising.",
        "avg_salary_bdt": {"min": 32000, "max": 135000},
        "demand_level": "high",
        "required_skills": ["Footwear Lasting & Sole Attachment", "Leather Quality Grading & Tannery Processes", "Footwear Costing & Consumption", "Shoe Pattern Making", "LWG (Leather Working Group) Standards"],
        "preferred_skills": ["Crispin Shoemaker CAD", "Direct Injection Process", "Physical Footwear Testing (Flexing, Bond Strength)"],
        "typical_employers": ["Apex Footwear Limited", "Bay Footwear", "Picard Bangladesh", "Fortuna Leather", "Blue Ocean Footwear"],
        "education_preference": "B.Sc in Leather Engineering / Footwear Technology from Institute of Leather Engineering & Technology (ILET, University of Dhaka)",
        "bdjobs_search_terms": ["Leather Engineer", "Footwear Merchandiser", "Shoe Production Officer Apex", "Tannery Quality Officer"]
    },
    {
        "id": "plastic-polymer-engineering",
        "name": "Plastic, Polymer & Moulding Engineering (RFL, Bengal)",
        "sector": "Manufacturing & Polymers",
        "is_government": False,
        "description": "High-tonnage injection moulding, blow moulding, extrusion lines, PVC pipe manufacturing, and polymer compound quality assurance.",
        "avg_salary_bdt": {"min": 30000, "max": 125000},
        "demand_level": "high",
        "required_skills": ["Plastic Injection & Blow Moulding", "Extrusion Machine Calibration", "Polymer Chemistry & Masterbatch Formulation", "Mould Maintenance & Tooling", "Quality Inspection (Tensile, Impact)"],
        "preferred_skills": ["AutoCAD / SolidWorks Mould Design", "Plastic Recycling & Regrind Management", "Cycle Time Reduction"],
        "typical_employers": ["PRAN-RFL Plastics", "Bengal Group of Industries", "Akij Plastics", "Gazi Group", "National Polymer"],
        "education_preference": "B.Sc / Diploma in Mechanical, Chemical, Polymer, or Materials Engineering",
        "bdjobs_search_terms": ["Plastic Engineer", "Moulding Engineer RFL", "Injection Moulding Officer", "Polymer QC Officer"]
    },
    {
        "id": "ceramics-building-materials",
        "name": "Ceramics, Tiles & Sanitaryware Engineering (RAK, Shinepukur)",
        "sector": "Manufacturing & Ceramics",
        "is_government": False,
        "description": "Kiln firing temperature control, ceramic glaze preparation, tile pressing, sanitaryware slip casting, and quality sorting.",
        "avg_salary_bdt": {"min": 32000, "max": 130000},
        "demand_level": "high",
        "required_skills": ["Ceramic Body & Glaze Formulation", "Tunnel Kiln & Roller Kiln Firing", "Slip Casting & Hydraulic Pressing", "Tile Quality Testing (Modulus of Rupture, Water Absorption)", "Industrial Safety"],
        "preferred_skills": ["Digital Inkjet Tile Printing", "ISO 13006 Ceramic Tile Standards", "Raw Material Ball Mill Optimization"],
        "typical_employers": ["RAK Ceramics Bangladesh", "Shinepukur Ceramics", "Great Wall Ceramic", "Mir Ceramic", "Akij Ceramics"],
        "education_preference": "B.Sc / Diploma in Glass & Ceramic Engineering (BUET, Bangladesh Institute of Glass & Ceramics)",
        "bdjobs_search_terms": ["Ceramic Engineer", "Kiln In-charge", "Glaze Production Officer", "RAK Ceramics Engineer"]
    },
    {
        "id": "real-estate-property-sales",
        "name": "Real Estate Development, Property Sales & Land Acquisition",
        "sector": "Real Estate & Construction",
        "is_government": False,
        "description": "Marketing luxury apartments, commercial office towers, conducting land title vetting, RAJUK approval coordination, and high-value property sales.",
        "avg_salary_bdt": {"min": 35000, "max": 160000},
        "demand_level": "very_high",
        "required_skills": ["High-Value Property Selling", "Client Relationship Management (HNI & Corporate)", "RAJUK / CDA Building Bye-laws Awareness", "Land Title & Ownership Due Diligence", "Sales Presentation & Closing"],
        "preferred_skills": ["Mortgage Loan Coordination with Banks", "Digital Property Marketing", "REHAB Fair Client Acquisition"],
        "typical_employers": ["Shanta Holdings", "Building Technology & Ideas (bti)", "Concord Real Estate", "Rangs Properties", "Navana Real Estate"],
        "education_preference": "Graduation in Business Administration, Marketing, Architecture, or Civil Engineering",
        "bdjobs_search_terms": ["Real Estate Sales Manager", "Property Sales Executive", "Land Acquisition Officer", "Shanta Holdings Sales"]
    },
    {
        "id": "hospitality-hotel-management",
        "name": "Hotel, Hospitality & Food/Beverage Management",
        "sector": "Hospitality & Tourism",
        "is_government": False,
        "description": "5-star international hotel operations, front office desk, banquet and conference catering, food & beverage hygiene, and guest experience.",
        "avg_salary_bdt": {"min": 28000, "max": 120000},
        "demand_level": "high",
        "required_skills": ["Front Office Operations (Opera PMS)", "Food & Beverage Service Etiquette", "HACCP & Kitchen Hygiene Standards", "Guest De-escalation & Hospitality Care", "Bilingual English & Bangla Oratory"],
        "preferred_skills": ["Banquet & Corporate Event Planning", "Revenue Management & Room Pricing", "Sommelier / Mixology Basics"],
        "typical_employers": ["Radisson Blu Dhaka Water Garden", "InterContinental Dhaka", "Pan Pacific Sonargaon", "Le Meridien Dhaka", "The Westin Dhaka"],
        "education_preference": "Graduation in Hospitality Management, Tourism, BBA, or National Hotel & Tourism Training Institute (NHTTI) diploma",
        "bdjobs_search_terms": ["Hotel Front Office Executive", "Food and Beverage Manager", "Guest Relations Officer Hotel", "Banquet Executive 5-Star"]
    },
    {
        "id": "travel-tourism-aviation-ticketing",
        "name": "Aviation Ticketing, GDS & Travel Operations (Amadeus/Sabre)",
        "sector": "Hospitality & Tourism",
        "is_government": False,
        "description": "Issuing domestic and international flight tickets on Global Distribution Systems (GDS), handling tour packages, visa processing, and corporate itineraries.",
        "avg_salary_bdt": {"min": 25000, "max": 75000},
        "demand_level": "high",
        "required_skills": ["GDS Systems (Amadeus, Sabre, Galileo)", "Airfare Calculation & Ticket Re-issuance", "Visa Application Documentation", "Tour Package Costing", "Customer Travel Advising"],
        "preferred_skills": ["IATA Accreditation Knowledge", "Hajj & Umrah Package Operations", "Corporate Travel Desk Management"],
        "typical_employers": ["ShareTrip", "GoZayaan", "Flight Expert", "Biman Holidays", "Saimon Global", "Galaxy Travel"],
        "education_preference": "Graduation in any discipline with certified GDS Amadeus / Sabre training",
        "bdjobs_search_terms": ["Ticketing Officer Amadeus", "Travel Consultant", "GDS Sabre Specialist", "Tour Operations Executive"]
    },
    {
        "id": "corporate-communications-pr",
        "name": "Corporate Communications & Public Relations (PR)",
        "sector": "Marketing & Media",
        "is_government": False,
        "description": "Managing brand reputation, corporate press conferences, media interviews, annual reports, crisis communications, and internal town halls.",
        "avg_salary_bdt": {"min": 38000, "max": 150000},
        "demand_level": "high",
        "required_skills": ["Press Release Drafting (Bangla & English)", "Media Relations & Journalist Networking", "Corporate Crisis Communications", "Annual Report Editorial", "Event Coordination & Press Briefings"],
        "preferred_skills": ["Speechwriting for C-suite Executives", "CSR Program Storytelling", "Brand Reputation Monitoring"],
        "typical_employers": ["Grameenphone Corporate Affairs", "BRAC Communications", "Unilever External Affairs", "Asiatic PR", "Masthead PR"],
        "education_preference": "Graduation in Mass Communication & Journalism, English Literature, PR, or Marketing",
        "bdjobs_search_terms": ["Corporate Communications Officer", "Public Relations Executive PR", "Media Relations Manager", "Communications Specialist"]
    },
    {
        "id": "broadcast-journalism-media",
        "name": "Broadcast Journalism, News Reporting & News Anchoring",
        "sector": "Marketing & Media",
        "is_government": False,
        "description": "Investigative field reporting, prime-time news presentation, digital newsroom editorial, and multimedia video storytelling.",
        "avg_salary_bdt": {"min": 25000, "max": 85000},
        "demand_level": "high",
        "required_skills": ["Investigative News Reporting", "Bangla News Pronunciation & Voice Modulation", "Live TV Reporting & Piece-to-Camera (PTC)", "News Scriptwriting & Fact-checking", "Interviewing & Media Ethics"],
        "preferred_skills": ["Video Editing (Premiere Pro)", "Digital Social Media Journalism", "MoJo (Mobile Journalism)"],
        "typical_employers": ["Somoy TV", "Channel 24", "Jamuna TV", "Independent TV", "Prothom Alo Online", "bdnews24.com"],
        "education_preference": "Graduation in Mass Communication & Journalism, Bangla, English, or Social Sciences",
        "bdjobs_search_terms": ["News Reporter Broadcast", "News Presenter TV", "Sub Editor Online Newspaper", "Investigative Journalist"]
    },
    {
        "id": "embedded-firmware-iot",
        "name": "Embedded Systems, Firmware & IoT Hardware Engineering",
        "sector": "Hardware & Electronics",
        "is_government": False,
        "description": "Designing microcontroller firmware (STM32, ESP32, Arduino), PCB schematics, sensor telemetry, and smart home appliances.",
        "avg_salary_bdt": {"min": 35000, "max": 150000},
        "demand_level": "high",
        "required_skills": ["Embedded C / C++", "Microcontrollers (STM32, ESP32, PIC)", "Communication Protocols (UART, SPI, I2C, CAN)", "PCB Design (Altium / KiCad)", "Hardware Debugging (Oscilloscope, Logic Analyzer)"],
        "preferred_skills": ["FreeRTOS", "IoT Protocols (MQTT, CoAP)", "Wireless Integration (BLE, LoRaWAN, Zigbee)", "EMI/EMC Compliance"],
        "typical_employers": ["Walton Hi-Tech R&D", "Inovace Technologies", "DataSoft IoT Lab", "Bondstein Technologies", "Ulterior Engineering"],
        "education_preference": "B.Sc in EEE, CSE, Mechatronics, or Applied Physics",
        "bdjobs_search_terms": ["Embedded Systems Engineer", "Firmware Engineer", "IoT Hardware Developer", "PCB Design Engineer"]
    },
    {
        "id": "game-development-interactive",
        "name": "Game Development & Interactive Simulation (Unity / Unreal)",
        "sector": "Gaming & Multimedia",
        "is_government": False,
        "description": "Building mobile and PC games, 3D character physics, gameplay mechanics, level architecture, and immersive VR simulations.",
        "avg_salary_bdt": {"min": 35000, "max": 140000},
        "demand_level": "high",
        "required_skills": ["C# Programming", "Unity Engine / Unreal Engine", "Gameplay Physics & Mechanics", "2D/3D Asset Optimization", "Mobile Game Performance Optimization (Draw calls, Memory)"],
        "preferred_skills": ["Shader Graph & Particle Effects", "Multiplayer Networking (Photon / WebSockets)", "In-app Purchases & Ad SDK Integration"],
        "typical_employers": ["Riseup Labs", "Battery Low Interactive", "Mindfisher Games", "Ulka Games", "Dream71 Bangladesh"],
        "education_preference": "B.Sc in CSE, Software Engineering, Multimedia, or strong portfolio of playable games",
        "bdjobs_search_terms": ["Unity Game Developer", "Game Programmer C#", "Unreal Engine Developer", "Mobile Game Developer"]
    },
    {
        "id": "blockchain-web3-engineering",
        "name": "Blockchain & Web3 Smart Contract Engineering",
        "sector": "Information Technology",
        "is_government": False,
        "description": "Developing decentralized applications (dApps), Solidity smart contracts, cryptographic wallet integrations, and distributed ledger nodes.",
        "avg_salary_bdt": {"min": 55000, "max": 220000},
        "demand_level": "high",
        "required_skills": ["Solidity", "EVM Architecture", "Smart Contract Security & Gas Optimization", "Ethers.js / Web3.js", "Cryptographic Fundamentals (Public/Private Keys, Hashing)"],
        "preferred_skills": ["Hardhat / Foundry Testing Frameworks", "Decentralized Finance (DeFi) Protocols", "Subgraphs & The Graph", "Layer-2 Rollups"],
        "typical_employers": ["Brain Station 23 Blockchain Unit", "Chaldal Web3 Labs", "Global Outsourcing Tech Firms in Dhaka"],
        "education_preference": "B.Sc in CSE, Mathematics, or proven GitHub repository of audited smart contracts",
        "bdjobs_search_terms": ["Blockchain Developer Solidity", "Smart Contract Engineer", "Web3 Developer", "Ethereum Developer"]
    },
    {
        "id": "logistics-courier-fleet-management",
        "name": "Courier, Last-Mile Delivery & Fleet Management (Pathao, RedX)",
        "sector": "Logistics & E-Commerce",
        "is_government": False,
        "description": "Managing nationwide parcel delivery hubs, rider incentive algorithms, cash-on-delivery (COD) reconciliation, and routing optimization.",
        "avg_salary_bdt": {"min": 30000, "max": 110000},
        "demand_level": "very_high",
        "required_skills": ["Hub Logistics & Parcel Sorting Operations", "Cash-on-Delivery (COD) Reconciliation", "Last-Mile Delivery Routing", "Rider Fleet Onboarding & Dispatch", "Excel & Delivery Management Software"],
        "preferred_skills": ["GIS Route Optimization", "Reverse Logistics (Return Processing)", "SLA & Delivery TAT Monitoring"],
        "typical_employers": ["Pathao Courier", "RedX Logistics", "Paperfly", "Steadfast Courier", "eCourier Bangladesh"],
        "education_preference": "Graduation in Business Administration, Supply Chain, Commerce, or any relevant discipline",
        "bdjobs_search_terms": ["Hub In-charge Courier", "Fleet Manager Logistics", "Delivery Operations Executive", "Last Mile Logistics Officer"]
    },
    {
        "id": "marine-fisheries-aquaculture",
        "name": "Fisheries, Shrimp Farming & Aquaculture Management",
        "sector": "Agriculture & Food Sciences",
        "is_government": False,
        "description": "Intensive brackish-water shrimp (Vannamei/Bagda) farming, carp hatchery operations, fish nutrition, and export processing compliance.",
        "avg_salary_bdt": {"min": 30000, "max": 110000},
        "demand_level": "high",
        "required_skills": ["Aquaculture Pond Water Quality Monitoring (DO, pH, Ammonia)", "Fish & Shrimp Pathology & Disease Treatment", "Biofloc & RAS Aquaculture Systems", "Fish Feed Formulation & FCR Calculation", "Hatchery Induced Breeding"],
        "preferred_skills": ["HACCP in Frozen Seafood Processing", "EU Export Quality Compliance", "Specific Pathogen Free (SPF) Post-Larvae Management"],
        "typical_employers": ["CP Bangladesh Fisheries", "Quality Feeds Limited", "Spectra Hexa Feeds", "Apex Foods (Frozen Seafood)", "Aftab Hatchery"],
        "education_preference": "B.Sc in Fisheries from recognized agricultural universities (BAU, SAU, CVASU, KU)",
        "bdjobs_search_terms": ["Fisheries Officer", "Aquaculture Specialist", "Shrimp Farm Manager", "Hatchery Officer"]
    },
    {
        "id": "video-editing-cinematography",
        "name": "Commercial Video Editing, Cinematography & Color Grading",
        "sector": "Design & Creative",
        "is_government": False,
        "description": "Shooting corporate documentaries, digital commercials, YouTube creator productions, DaVinci Resolve color grading, and audio mastering.",
        "avg_salary_bdt": {"min": 28000, "max": 105000},
        "demand_level": "high",
        "required_skills": ["Adobe Premiere Pro", "DaVinci Resolve Color Grading", "Camera Operation (Sony FX / Cinema Cameras)", "Studio Three-Point Lighting", "Audio Synchronization & Noise Reduction"],
        "preferred_skills": ["After Effects Visual Effects (VFX)", "Drone Videography (CAAB Certified Pilot)", "Short-form Content Editing (TikTok / Reels)"],
        "typical_employers": ["10 Minute School Video Production", "Media Production Houses (Runout Films, Half Stop Down)", "Creative Digital Agencies", "Prothom Alo Multimedia"],
        "education_preference": "Graduation in Film Studies, Multimedia, Fine Arts, or impressive video showreel",
        "bdjobs_search_terms": ["Video Editor Premiere Pro", "Cinematographer Video Producer", "Colorist DaVinci Resolve", "Multimedia Video Specialist"]
    },
    {
        "id": "insurance-actuarial-underwriting",
        "name": "Insurance Underwriting, Claims Assessment & Actuarial Science",
        "sector": "Banking & Finance",
        "is_government": False,
        "description": "Underwriting general and life insurance policies, assessing marine/fire risk claims, reinsurance documentation, and actuarial reserve modeling.",
        "avg_salary_bdt": {"min": 32000, "max": 130000},
        "demand_level": "high",
        "required_skills": ["Insurance Risk Underwriting", "Claims Survey Inspection & Loss Assessment", "Insurance Development & Regulatory Authority (IDRA) Guidelines", "Policy Pricing & Mortality Tables", "Reinsurance Treaty Allocation"],
        "preferred_skills": ["Actuarial Exam Papers (IFoA / SOA)", "Marine Cargo Insurance", "Health Insurance Claims Auditing"],
        "typical_employers": ["Green Delta Insurance", "Delta Life Insurance", "MetLife Bangladesh", "Pragati Life Insurance", "Sadharan Bima Corporation (SBC)"],
        "education_preference": "Graduation in Actuarial Science, Statistics, Mathematics, Finance, or Commerce",
        "bdjobs_search_terms": ["Insurance Underwriter", "Claims Officer Insurance", "Actuarial Analyst MetLife", "Branch Manager Insurance"]
    },
    {
        "id": "e-commerce-marketplace-management",
        "name": "E-Commerce Category Management & Marketplace Operations",
        "sector": "Logistics & E-Commerce",
        "is_government": False,
        "description": "Directing online product cataloging, seller onboarding, Flash Sale campaign pricing, return rates, and digital consumer experience.",
        "avg_salary_bdt": {"min": 32000, "max": 135000},
        "demand_level": "very_high",
        "required_skills": ["E-Commerce Marketplace Platforms (Daraz, Chaldal)", "Product Category Management & P&L", "Promotional Campaign Planning (11.11, Eid Campaigns)", "Seller Commission & SLA Tracking", "Consumer Rating & Review Optimization"],
        "preferred_skills": ["SQL for E-Commerce Metrics", "Vendor Negotiation", "Inventory Turnaround Velocity"],
        "typical_employers": ["Daraz Bangladesh (Alibaba Group)", "Chaldal", "Othoba.com (PRAN)", "Aarong Online", "Pickaboo"],
        "education_preference": "BBA / MBA with major in Marketing, Supply Chain, or Management",
        "bdjobs_search_terms": ["Category Manager E-Commerce", "Marketplace Operations Officer", "Daraz Category Executive", "E-Commerce Specialist"]
    }
]

# Append the extra categories to the master list
with open('nlp_export/job_categories.json', 'r', encoding='utf-8') as f:
    existing = json.load(f)

existing_ids = {c['id'] for c in existing}
added = 0
for cat in extra_categories:
    if cat['id'] not in existing_ids:
        existing.append(cat)
        added += 1

print(f"Added {added} new categories. Total categories: {len(existing)}")

with open('nlp_export/job_categories.json', 'w', encoding='utf-8') as f:
    json.dump(existing, f, indent=2, ensure_ascii=False)

print("Saved updated nlp_export/job_categories.json!")
