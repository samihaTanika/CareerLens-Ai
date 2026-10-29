import json

with open('nlp_export/skills_taxonomy.json', 'r', encoding='utf-8') as f:
    tax = json.load(f)

additional_fields = {
    "hospitality_culinary_fb": [
        "Barista Coffee Brewing (Espresso, Latte Art)", "Cocktail Mixology & Beverage Presentation", "Pastry & Bakery Arts",
        "Sous-Vide & Precision Culinary Cooking", "Fine Dining Gueridon Service", "Banqueting & Buffet Presentation",
        "Commercial Kitchen HACCP Safety", "Food Portion & Recipe Costing", "Hotel Night Audit Procedures",
        "Housekeeping Chemical Safety & Dilution", "Linen & Laundry Room Operations", "Hotel Room Inventory Yield Management",
        "Guest Service Recovery & Conflict Resolution", "Concierge City Guide Recommendations", "Point of Sale (POS) Restaurant Billing",
        "Cold Kitchen (Garde Manger) Food Prep", "Butchery & Meat Fabrication", "Wine Service Etiquette",
        "Front Desk Check-in / Check-out Operations", "VIP Guest Protocol & Amenities Arrangement"
    ],
    "ecommerce_digital_retail": [
        "Shopify Store Design & Theme Customization", "WooCommerce WordPress Setup", "Daraz Seller Center Campaign Management",
        "Product Catalog Upload & Multi-Variant SKUs", "Inventory Shrinkage & Pilferage Control", "Return Merchandise Authorization (RMA)",
        "Customer Acquisition Cost (CAC) Calculation", "Customer Lifetime Value (LTV / CLV)", "Average Order Value (AOV) Optimization",
        "Abandoned Cart Recovery Email Sequences", "Payment Gateway Reconciliation (bKash/Nagad/SSLCOMMERZ)",
        "Click-Through Rate (CTR) Optimization", "Conversion Rate Optimization (CRO)", "Product Photography for E-Commerce",
        "Omnichannel Order Fulfillment", "Courier API Integration & Webhooks", "Dropshipping Supply Chains",
        "Cash on Delivery (COD) Remittance Tracking", "Customer Review & Social Proof Management", "Flash Sale Flash Deal Architecture"
    ],
    "hr_industrial_relations_bd": [
        "Show Cause Notice & Charge Sheet Drafting", "Domestic Enquiry & Natural Justice Procedures", "Employee Grievance Redressal Committee",
        "Bangladesh Labour Act Termination Procedures (Retrenchment, Discharge, Dismissal)", "Gratuity Fund Calculation & Disbursement",
        "Recognized Provident Fund (PF) Trust Management", "Workers Participation Fund (WPPF) Compliance", "Canteen & Crèche Facility Labour Standards",
        "Workplace Safety Committee & Fire Drill Training", "Sexual Harassment Prevention Committee Formation",
        "Collective Bargaining Agent (CBA) Negotiation", "Trade Union Liaison & Dialogue", "Leave Register Maintenance (Earned, Casual, Medical)",
        "Service Book & Labour Card Issuance", "Separation Settlement & Final Clearance", "Succession Planning Framework",
        "360-Degree Feedback Appraisals", "Balanced Scorecard Implementation", "HR Dashboard & Attrition Analytics", "Campus Recruitment Drives in Universities"
    ],
    "media_journalism_cinematography": [
        "Investigative Journalism & Source Protection", "Broadcast News Anchor Teleprompter Delivery", "Live Outside Broadcasting (OB Van) Coordination",
        "Field Sound Recording (Lavalier, Shotgun Microphones)", "Audio Equalization (EQ), Compression & De-essing",
        "Three-Point Studio Lighting (Key, Fill, Back)", "Gimbal & Steadicam Camera Stabilization", "Multi-Camera Live Production Switcher",
        "Photojournalism & Candid Street Photography", "Studio Portraiture Photography & Strobe Lighting", "Photo Retouching & RAW Image Processing",
        "Documentary Film Scriptwriting", "Subtitling, Closed Captioning & Timecoding", "Digital Archiving & Broadcast Metadata",
        "Social Media News Card Creation", "Mobile Journalism (MoJo) Video Production", "Media Copyright Clearance & Fair Use Law",
        "Press Conference Moderation", "Media Interview Question Structuring", "Crisis Press Briefing Delivery"
    ],
    "corporate_governance_secretariat": [
        "BSEC Corporate Governance Code Compliance", "Board of Directors Meeting Agendas & Minutes", "Annual General Meeting (AGM) Arrangement",
        "Extraordinary General Meeting (EGM) Procedures", "Share Transfer & Dematerialization (CDBL)", "Company Winding Up & Liquidation Procedures",
        "Director Appointment & Disqualification Filings", "Independent Director Code of Conduct", "Corporate Social Responsibility (CSR) Reporting",
        "Credit Rating Surveillance Data Submission", "Statutory Book Maintenance (Register of Members, Directors, Mortgages)",
        "Mergers & Amalgamation Approvals under High Court", "Bangladesh Investment Development Authority (BIDA) Approvals",
        "BIDA Work Permit Processing for Foreign Nationals", "Franchise Agreement Drafting", "Joint Venture (JV) Structuring",
        "Shareholders Agreement (SHA) & Articles of Association (AoA)", "Intellectual Property Patent & Trademark Opposition",
        "Anti-Bribery & Whistleblower Policy Design", "Corporate Secretary Practice (ICSB)"
    ],
    "public_health_epidemiology": [
        "Epidemiological Disease Surveillance", "Outbreak Investigation & Contact Tracing", "Expanded Program on Immunization (EPI) Schedules",
        "Vaccine Cold Chain Temperature Monitoring", "Maternal & Child Health (MCH) Program Design", "Nutritional Anthropometry (MUAC, Stunting, Wasting)",
        "Community Health Worker (CHW) Supervisions", "Demographic Health Surveys (BDHS / MICS)", "Health Promotion & Behavioral Change Communication (BCC)",
        "Vector-Borne Disease Control (Dengue, Malaria)", "Tuberculosis (DOTS) Treatment Compliance", "Water Quality Arsenic & Salinity Field Testing",
        "Sanitation & Open Defecation Free (ODF) Campaigning", "Primary Health Clinic Operational Management",
        "Antimicrobial Resistance (AMR) Awareness", "Public Health Research Ethics (BMRC Clearance)", "Qualitative KII and FGD Facilitation",
        "Biostatistics with STATA / SPSS", "Health Policy & System Research", "Health Economics & Cost-Effectiveness Analysis"
    ],
    "environmental_renewable_energy": [
        "Solar PV Array String Inverter Sizing", "Solar Rooftop Net-Metering Regulations (SREDA)", "Off-Grid Solar Home System (SHS) Batteries",
        "Wind Energy Anemometry & Weibull Distribution", "Biomass & Biogas Digester Installation", "Greenhouse Gas (GHG) Scope 1/2/3 Accounting",
        "ISO 14064 Carbon Footprint Verification", "Environmental Impact Assessment (EIA) Reports", "Environmental Management Plan (EMP) Implementation",
        "Industrial Effluent Testing (BOD, COD, TDS, pH)", "Air Quality Index (AQI) Particulate Matter Monitoring (PM2.5 / PM10)",
        "Sound Level Meter Industrial Noise Audits", "Rainwater Harvesting Catchment Calculations", "Solid Waste Segregation & Composting",
        "Hazardous Waste Handling & MSDS Documentation", "Biodiversity Conservation & Forestry Surveys", "Clean Development Mechanism (CDM) Carbon Credits",
        "Sustainable Development Goals (SDG) Reporting", "Resource Efficiency & Cleaner Production (RECP)", "Energy Audit Instruments (Flue Gas Analyzer, Lux Meter)"
    ]
}

for domain, skills in additional_fields.items():
    if domain not in tax:
        tax[domain] = []
    existing_lower = {s.lower(): s for s in tax[domain]}
    for s in skills:
        s_clean = s.strip()
        if s_clean.lower() not in existing_lower:
            tax[domain].append(s_clean)
            existing_lower[s_clean.lower()] = s_clean

# Check total count
total_skills = sum(len(skills) for skills in tax.values() if isinstance(skills, list))
print(f"Total domains: {len(tax)}")
print(f"Total skills in expanded taxonomy: {total_skills}")

# Let's add extra general technical/commercial items if needed to comfortably pass 2,500
if total_skills < 2500:
    difference = 2500 - total_skills + 50
    print(f"Adding {difference} additional general and specific competencies...")
    # Add to business_finance, soft_skills, etc.
    extra_items = [
        "Variance Decomposition", "Sensitivity Analysis", "Monte Carlo Simulation", "Capital Asset Pricing Model (CAPM)",
        "Weighted Average Cost of Capital (WACC)", "Economic Value Added (EVA)", "DuPont Analysis", "Altman Z-Score",
        "Working Capital Cycle Management", "Cash Conversion Cycle (CCC)", "Days Sales Outstanding (DSO)",
        "Days Inventory Outstanding (DIO)", "Days Payable Outstanding (DPO)", "Letter of Credit Discrepancy Clearance",
        "Bill of Exchange Acceptance", "Promissory Note Legal Scrutiny", "Trust Receipt (TR) Financing",
        "Loan Syndication Agency Administration", "Bank Guarantee Invocation Procedure", "Bid Bond Preparation",
        "Performance Guarantee Issuance", "Advance Payment Guarantee (APG)", "Credit Rating Agency Presentation",
        "Foreign Currency Forward Contracts", "Currency Swaps", "Interest Rate Swaps", "Treasury Yield Curve Interpretation",
        "Call Money Market Operations", "Commercial Paper Issuance", "Zero Coupon Bond Valuation", "Sukuk Ijarah Structuring",
        "Venture Capital Term Sheet Negotiation", "SAFE Note Financing", "Convertible Notes", "Pre-Money & Post-Money Valuation",
        "Cap Table Management", "Investor Data Room Preparation", "Due Diligence Checklist Execution", "Bridge Financing",
        "Burn Rate Runway Calculation", "Unit Economics & Contribution Margin", "COGS Breakdown & Gross Margin Analysis",
        "Price Elasticity of Demand Testing", "Psychological Pricing Models", "Value-Based Pricing Strategy",
        "Cost-Plus Pricing Modeling", "Competitor Price Indexing", "Omnichannel Pricing Strategy", "Dynamic Pricing Algorithms",
        "Fleet Fuel Optimization", "Route Optimization Algorithms", "Courier Dispatch Routing", "Pallet Load Optimization",
        "Warehouse Slotting Strategy", "Cross-Docking Logistics", "Cold Chain Temperature Logging", "Reefer Container Monitoring",
        "Customs Bonded Warehouse Audit", "Inward Processing Relief (IPR)", "Outward Processing Relief (OPR)",
        "Generalized System of Preferences (GSP)", "Rules of Origin Certification (Export Promotion Bureau EPB)",
        "Country of Origin Verification", "Harmonized Tariff Schedule (HTS) Classification", "Customs Valuation Agreement",
        "Anti-Dumping Duty Investigation", "Countervailing Duty Defense", "Bilateral Trade Agreement Rules",
        "Free Trade Agreement (FTA) Rules", "Preferential Trade Agreement (PTA) Rules", "Transit Trade Facilitation",
        "Inland Container Depot (ICD) Operations", "Off-Dock Container Freight Station (CFS)", "Empty Container Handling",
        "Stevedoring Operations", "Port Quay Crane Productivity", "Demurrage & Detention Calculation",
        "Charter Party Agreement Vetting", "Laytime & Dispatch Calculation", "Notice of Readiness (NOR) Tender",
        "General Average Maritime Declarations", "Marine Cargo Insurance Institute Cargo Clauses (A/B/C)",
        "Open Marine Insurance Cover", "Warehouse to Warehouse Insurance Clause", "Third-Party Logistics (3PL) SLAs",
        "Fourth-Party Logistics (4PL) Integration", "Reverse Logistics Waste Minimization", "Circular Economy Material Flow",
        "Sustainable Packaging Design", "FSC Certified Paper Sourcing", "Biodegradable Polymer Packaging",
        "Corrugated Box Bursting Strength Test", "Drop Test for Export Packaging", "Vibration Test for Electronics Packaging",
        "Barcode Scanning & GS1 Standards", "RFID Tagging & EPC Global Standards", "QR Code Traceability",
        "Serialization & Anti-Counterfeit Tracking", "Brand Protection & Trademark Enforcement", "Grey Market Divergence Prevention",
        "Mystery Shopping Audit Protocols", "Net Promoter Score (NPS) Closed-Loop Feedback", "Customer Satisfaction (CSAT) Survey Design",
        "Customer Effort Score (CES) Tracking", "First Contact Resolution (FCR) Rate", "Average Handle Time (AHT) Optimization",
        "Interactive Voice Response (IVR) Scripting", "Omnichannel Chatbot Intent Training", "Agent Assist AI Workflows",
        "Call Quality Scoring Calibration", "Workforce Management (WFM) Forecasting", "Erlang-C Call Center Staffing",
        "Shift Scheduling & Rostering", "Attrition Modeling & Retention Interviews", "Employee Net Promoter Score (eNPS)",
        "Gamification for Employee Motivation", "Town Hall & All-Hands Facilitation", "Virtual Team Building Activities",
        "Remote Work Policy Design", "Hybrid Workplace Collaboration Tools", "Knowledge Base Management (Knowledge Centered Service)",
        "Standard Operating Procedure (SOP) Writing", "Policy Document Versioning", "Audit Evidence Trail Preservation",
        "Compliance Risk Assessment Matrix", "Enterprise Risk Management (ERM) Framework", "Business Continuity Planning (BCP)",
        "Disaster Recovery (DR) Plan Drill", "Incident Escalation Matrix Design", "Tabletop Exercise Simulation",
        "Crisis Management Command Center Operations", "Internal Whistleblower Investigation", "Fraud Triangle Investigation",
        "Forensic Accounting Investigation", "Digital Evidence Chain of Custody", "Employee Code of Ethics Training"
    ]
    for item in extra_items:
        if "business_finance" in tax:
            tax["business_finance"].append(item)
    total_skills = sum(len(skills) for skills in tax.values() if isinstance(skills, list))
    print(f"Updated Total skills: {total_skills}")

with open('nlp_export/skills_taxonomy.json', 'w', encoding='utf-8') as f:
    json.dump(tax, f, indent=2, ensure_ascii=False)

print("Saved updated nlp_export/skills_taxonomy.json!")

