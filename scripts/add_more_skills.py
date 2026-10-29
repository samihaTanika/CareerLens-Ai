import json

with open('nlp_export/skills_taxonomy.json', 'r', encoding='utf-8') as f:
    tax = json.load(f)

rich_additions = {
    "certifications_and_standards": [
        "AWS Certified Solutions Architect", "AWS Certified Developer", "AWS Certified SysOps Administrator",
        "Google Cloud Certified Professional Cloud Architect", "Google Cloud Professional Data Engineer",
        "Microsoft Certified: Azure Solutions Architect Expert", "Certified Kubernetes Administrator (CKA)",
        "Certified Kubernetes Application Developer (CKAD)", "Certified Information Systems Security Professional (CISSP)",
        "Certified Ethical Hacker (CEH)", "Offensive Security Certified Professional (OSCP)",
        "CompTIA Security+", "CompTIA Network+", "CompTIA A+", "Cisco Certified Network Associate (CCNA)",
        "Cisco Certified Network Professional (CCNP)", "Project Management Professional (PMP)",
        "Certified Associate in Project Management (CAPM)", "PRINCE2 Practitioner", "Professional Scrum Master (PSM I / II)",
        "Certified ScrumMaster (CSM)", "ITIL 4 Foundation", "Six Sigma Green Belt", "Six Sigma Black Belt",
        "TOGAF 9 / 10 Enterprise Architecture", "ISO 9001 Quality Management", "ISO 14001 Environmental Management",
        "ISO 45001 Occupational Health and Safety", "ISO 27001 Information Security Management", "CMMI Level 3 / 5 Standards"
    ],
    "education_pedagogy_bd": [
        "Curriculum Design & Mapping", "Bloom's Taxonomy Cognitive Levels", "Creative Question Technique (Srijonshil Proshno)",
        "Formative Assessment & Evaluation", "Summative Assessment Strategies", "Continuous Professional Development (CPD)",
        "Lesson Plan Formulation", "Classroom Engagement & Discipline", "Inclusive Education & Special Needs Pedagogy",
        "Early Childhood Care and Education (ECCE)", "Multimedia Classroom Operation", "Teacher Training Pedagogy (B.Ed / M.Ed)",
        "DPEd Primary Teacher Training", "NTRCA Subject Exam Syllabus", "National Curriculum and Textbook Board (NCTB) Standards",
        "Student Counseling & Mentorship", "Distance Learning & LMS Management", "Interactive Whiteboard Instruction",
        "Bangla Phonics & Literacy Instruction", "Mental Math & Abacus Pedagogy", "Science Practical Laboratory Demonstration"
    ],
    "mechanical_automotive_engineering": [
        "SolidWorks 3D Modeling", "CATIA Design", "ANSYS Mechanical Simulation", "Computational Fluid Dynamics (CFD)",
        "Finite Element Analysis (FEA)", "CNC Lathe & Milling Programming (G-Code)", "Manual Lathe & Shaper Operation",
        "TIG & MIG Welding Inspection", "Pneumatic & Hydraulic System Design", "Internal Combustion Engines (Petrol / Diesel)",
        "Automotive Electronic Fuel Injection (EFI)", "Vehicle Transmission Systems", "Steam Boiler Operation & Boiler Act 1923",
        "Steam Turbines & Gas Turbines", "Shell and Tube Heat Exchangers", "Pumps & Compressor Performance Testing",
        "Refrigeration Cycle (Vapor Compression)", "HVAC Air Handling Unit (AHU)", "Centrifugal Water Chillers",
        "Vibration Analysis & Condition Monitoring", "Dynamic Rotor Balancing", "Total Productive Maintenance (TPM)",
        "Root Cause Failure Analysis (RCFA)", "Gear Train Design & Lubrication", "Piping and Instrumentation Diagram (P&ID)"
    ],
    "civil_structural_detail": [
        "Bar Bending Schedule (BBS) Preparation", "Structural Steel Detailing (Tekla Structures)", "Retaining Wall & Sheet Pile Design",
        "Subsoil Investigation & Borehole Sampling", "Standard Penetration Test (SPT N-Value)", "Plate Load & Triaxial Shear Testing",
        "Cast-in-Situ & Pre-cast Piling Supervision", "Pile Dynamic Analysis (PDA) Testing", "Total Station & Theodolite Surveying",
        "Digital Auto-Level & Elevation Contouring", "RTK GPS Geodetic Surveying", "Road Pavement Design (Flexible & Rigid)",
        "AASHTO Pavement Thickness Calculations", "California Bearing Ratio (CBR) Laboratory Test", "Bitumen Penetration & Ductility Testing",
        "Marshall Mix Design for Asphalt Roads", "Bridge Girder & Pier Cap Execution", "Pre-stressed Concrete Girders",
        "Culvert & Drainage Hydraulic Sizing", "Effluent Treatment Plant (ETP) Civil Works", "Water Treatment Plant (WTP) Clarifiers",
        "Deep Excavation & Shoring Systems", "Demolition Safety & Waste Management", "Green Building LEED Rating Systems"
    ],
    "electrical_automation_detail": [
        "Protective Relay Coordination", "Overcurrent & Earth Fault Relay Setting", "Differential Protection for Power Transformers",
        "Substation Earthing & Grid Resistance Testing", "Lightning Protection System (Faraday Cage & ESE)", "Busbar Trunking System (BBT)",
        "Automatic Voltage Regulator (AVR)", "Synchronizing Panel & Auto Mains Failure (AMF)", "Harmonic Measurement & Active Harmonic Filter",
        "Power Factor Improvement (PFI) Plant Design", "Siemens S7-1200 / S7-1500 PLC Programming", "Schneider Electric / Modicon PLC",
        "Mitsubishi FX / Q Series PLC", "Delta PLC & HMI Programming", "FactoryTalk View / WinCC SCADA Configuration",
        "Variable Frequency Drive (VFD) Commissioning", "Servo Motors & Motion Controllers", "Modbus RTU over RS-485 Communication",
        "Modbus TCP / Profinet Industrial Protocols", "Distributed Control System (DCS) Operation", "Instrumentation Calibration (4-20mA Sensors)",
        "Ultrasonic & Radar Level Transmitters", "Electromagnetic Flowmeter Setup", "PID Loop Tuning in Industrial Control"
    ],
    "maritime_aviation_detail": [
        "Electronic Chart Display and Information System (ECDIS)", "Global Maritime Distress and Safety System (GMDSS)",
        "Automatic Radar Plotting Aid (ARPA)", "International Regulations for Preventing Collisions at Sea (COLREGs)",
        "Ship Stability & Trim Calculation", "Ballast Water Treatment Systems (BWTS)", "Marine Auxiliary 2-Stroke / 4-Stroke Engines",
        "Purifier & Centrifugal Oil Separator Overhaul", "Oily Water Separator (15 ppm Bilge Alarm)", "International Convention for Prevention of Pollution (MARPOL)",
        "Safety of Life at Sea (SOLAS) Drills", "Container Lashing & Cargo Securing Manual (CSM)", "Rubber Tyred Gantry (RTG) Crane Coordination",
        "Aeronautical Very High Frequency (VHF) Radio", "Instrument Landing System (ILS) Localizer & Glidepath",
        "VHF Omnidirectional Range (VOR / DME)", "Air Traffic Management (ATM) Flight Planning", "Aviation Ramp & Aircraft Pushback Safety",
        "Airport Baggage Handling System (BHS)", "Jet-A1 Fuel Quality & Water Contamination Check"
    ],
    "medical_pharmaceutical_detail": [
        "Arterial Blood Gas (ABG) Analysis", "12-Lead Electrocardiogram (ECG) Interpretation", "Intensive Care Unit (ICU) Mechanical Ventilation",
        "Central Venous Line (CVC) Care", "Endotracheal Intubation Assistance", "Cardiopulmonary Resuscitation (CPR / BLS / ACLS)",
        "Pediatric Advanced Life Support (PALS)", "Advanced Trauma Life Support (ATLS)", "Syringe Infusion Pump Operation",
        "Defibrillator & Cardioversion Operations", "Pharmacokinetics & Pharmacodynamics (PK/PD)", "Biopharmaceutics Classification System (BCS)",
        "Pharmacovigilance & Adverse Drug Reaction (ADR) Reporting", "Accelerated & Real-time Stability Chamber Studies",
        "Fluid Bed Dryer (FBD) Granulation", "Rotary Tablet Compression Machine Tooling (B & D Tooling)", "Aqueous & Organic Film Tablet Coating",
        "Lyophilization (Freeze Drying) in Injectables", "Clean-in-Place (CIP) & Sterilize-in-Place (SIP)", "TOC (Total Organic Carbon) Water Analysis",
        "Purified Water & Water for Injection (WFI) Loop Systems", "Endotoxin Testing (LAL Test) in Sterile Products"
    ],
    "leather_footwear_fashion_detail": [
        "Raw Hide & Skin Curing (Salting / Wet Salting)", "Beamhouse Operations (Soaking, Liming, Dehairing)", "Tannery Deliming & Bating Enzymes",
        "Chrome Tanning (Basic Chromium Sulfate)", "Vegetable Tanning with Mimosa & Quebracho", "Tannery Retanning, Dyeing & Fatliquoring (CRD)",
        "Leather Toggle Drying & Vacuum Drying", "Leather Buffing & Roller Coating Finishing", "Shoe Last Modeling & Toe Spring Calculation",
        "Footwear Upper Clicking & Hand Cutting", "Leather Skiving & Splitting Machines", "Upper Stitching & Closing Techniques",
        "Toe Puff & Counter Stiffener Molding", "Goodyear Welted & Strobel Shoe Construction", "Direct Vulcanized Rubber & Direct PU Injection Sole",
        "Shoe Upper to Sole Bond Adhesion Testing (SATRA Standards)", "Bally Flexometer Leather Flex Resistance Testing",
        "Martindale Abrasion Resistance Testing", "Gerber AccuMark Pattern Design", "Lectra Modaris Pattern Software", "CLO 3D Virtual Garment Fitting"
    ],
    "advanced_data_ml_detail": [
        "LangSmith Observability", "DSPy Declarative Prompting", "LoRA & QLoRA Parameter Efficient Tuning",
        "vLLM High-Throughput Inference Engine", "DeepSpeed Distributed Training", "Triton Inference Server",
        "ONNX Runtime Optimization", "TensorRT Model Acceleration", "Weights & Biases (W&B) Experiment Tracking",
        "MLflow Model Registry & Deployment", "Apache Superset BI Dashboards", "Metabase Analytics Tool",
        "dbt (data build tool) Transformation", "Great Expectations Data Validation", "Apache Iceberg Open Table Format",
        "Delta Lake ACID Storage", "Databricks Unified Analytics Platform", "Snowflake Cloud Data Warehouse",
        "Spark Structured Streaming", "Apache Flink Stateful Stream Processing", "Kafka Connect & Schema Registry",
        "Vector Index HNSW (Hierarchical Navigable Small World)", "Cosine Similarity & Dot Product Metrics", "Sentence Transformers & BGE Embeddings"
    ],
    "banking_fintech_detail": [
        "Credit Appraisal Memorandum (CAM) Drafting", "Loan Rescheduling & Interest Waiver Criteria", "Bad Debt Write-off Procedures",
        "Factoring & Invoice Discounting Operations", "Islamic Sukuk Bond Valuation", "Mobile Financial Services e-KYC Verification",
        "Agent Banking Master Agent Coordination", "Subordinated Debt & Tier-2 Capital Calculation", "Basel III Capital to Risk-Weighted Assets (CRAR)",
        "Liquidity Coverage Ratio (LCR) Monitoring", "Net Stable Funding Ratio (NSFR) Calculation", "Foreign Exchange Open Position Limit",
        "Nostro Account Reconciliation", "SWIFT MT103 & MT202 Financial Messaging", "SWIFT MT700 Documentary Credit Messaging",
        "Trade Based Money Laundering (TBML) Detection", "Inward Remittance Incentive Processing", "Automated Challan System (A-Challan) Integration"
    ]
}

for domain, skills in rich_additions.items():
    if domain not in tax:
        tax[domain] = []
    existing_lower = {s.lower(): s for s in tax[domain]}
    for s in skills:
        s_clean = s.strip()
        if s_clean.lower() not in existing_lower:
            tax[domain].append(s_clean)
            existing_lower[s_clean.lower()] = s_clean

total_skills = sum(len(skills) for skills in tax.values() if isinstance(skills, list))
print(f"Total domains: {len(tax)}")
print(f"Total skills in expanded taxonomy: {total_skills}")

with open('nlp_export/skills_taxonomy.json', 'w', encoding='utf-8') as f:
    json.dump(tax, f, indent=2, ensure_ascii=False)

print("Saved updated nlp_export/skills_taxonomy.json!")

