import json

with open('nlp_export/skills_taxonomy.json', 'r', encoding='utf-8') as f:
    tax = json.load(f)

# Comprehensive additions across all domains
additions = {
    "programming_languages": [
        "Python", "Java", "JavaScript", "TypeScript", "C", "C++", "C#", "Go", "Golang", "Rust",
        "Ruby", "PHP", "Swift", "Kotlin", "Scala", "R", "MATLAB", "Perl", "Lua", "Dart",
        "Objective-C", "Shell", "Bash", "PowerShell", "Zsh", "SQL", "PL/SQL", "T-SQL", "HTML",
        "HTML5", "CSS", "CSS3", "Sass", "SCSS", "Less", "GraphQL", "Solidity", "Assembly",
        "Haskell", "Elixir", "Clojure", "Erlang", "Fortran", "COBOL", "VHDL", "Verilog",
        "Julia", "Groovy", "F#", "Visual Basic", "VBA", "ActionScript", "Apex", "Racket",
        "Scheme", "OCaml", "Nim", "Zig", "Crystal", "Ada", "Prolog", "LabVIEW", "ABAP"
    ],
    "web_frontend": [
        "React", "React.js", "Vue", "Vue.js", "Angular", "AngularJS", "Svelte", "SvelteKit",
        "Next.js", "Nuxt.js", "Gatsby", "Remix", "Astro", "jQuery", "Tailwind CSS", "TailwindCSS",
        "Bootstrap", "Material-UI", "MUI", "Chakra UI", "Ant Design", "styled-components",
        "Emotion", "Redux", "Redux Toolkit", "MobX", "Zustand", "Recoil", "Vuex", "Pinia",
        "Webpack", "Vite", "Rollup", "Parcel", "Babel", "ESLint", "Prettier", "npm", "yarn",
        "pnpm", "WebSockets", "Socket.io", "Service Workers", "PWA", "IndexedDB", "Web Workers",
        "DOM Manipulation", "AJAX", "Fetch API", "Axios", "Shadcn UI", "Radix UI", "Framer Motion",
        "GSAP", "Three.js", "WebGL", "Canvas API", "SVG", "Responsive Web Design", "Flexbox",
        "CSS Grid", "BEM", "Web Accessibility", "WCAG", "a11y", "Lighthouse", "Core Web Vitals",
        "SEO Optimization", "Micro-frontends", "Storybook", "Turborepo", "Web Components",
        "Alpine.js", "LitElement", "Stencil", "Emotion CSS", "PostCSS", "CSS Modules", "Tailwind Typography",
        "TanStack Query", "React Query", "SWR", "React Router", "Zod", "Yup", "Formik", "React Hook Form",
        "DaisyUI", "Flowbite", "Mantine", "Bulma", "Semantic UI", "Tailwind Forms"
    ],
    "web_backend": [
        "Node.js", "Express", "Express.js", "NestJS", "Fastify", "Koa", "Django", "Django REST Framework",
        "DRF", "Flask", "FastAPI", "Tornado", "Celery", "Spring", "Spring Boot", "Spring Cloud",
        "Hibernate", "JPA", "Micronaut", "Quarkus", "Ruby on Rails", "Rails", "Sinatra", "Laravel",
        "Symfony", "CodeIgniter", "Yii", "ASP.NET", "ASP.NET Core", ".NET", ".NET Core", "Entity Framework",
        "Fiber", "Gin", "Echo", "Gorilla Mux", "Actix Web", "Rocket", "RESTful API", "REST",
        "GraphQL", "gRPC", "Protobuf", "Protocol Buffers", "JSON-RPC", "SOAP", "Microservices",
        "Monolithic Architecture", "Serverless", "AWS Lambda", "API Gateway", "OAuth2", "OpenID Connect",
        "JWT", "JSON Web Tokens", "SAML", "CORS", "Rate Limiting", "Caching", "Reverse Proxy",
        "Message Queues", "Event-Driven Architecture", "CQRS", "Domain-Driven Design", "DDD",
        "BullMQ", "Sidekiq", "RabbitMQ Client", "Kafka Client", "Prisma ORM", "TypeORM", "Sequelize",
        "Mongoose", "SQLAlchemy", "Tortoise ORM", "GORM", "Dapper", "Pydantic", "Joi", "Passport.js",
        "Bcrypt", "Argon2", "Webhooks", "Swagger", "OpenAPI", "SSE (Server-Sent Events)", "ZeroMQ"
    ],
    "database": [
        "PostgreSQL", "MySQL", "MariaDB", "SQLite", "Oracle Database", "Microsoft SQL Server",
        "MSSQL", "MongoDB", "Cassandra", "Couchbase", "DynamoDB", "Amazon DynamoDB", "CouchDB",
        "Redis", "Memcached", "Neo4j", "ArangoDB", "Amazon Neptune", "Elasticsearch", "OpenSearch",
        "Solr", "InfluxDB", "TimescaleDB", "ClickHouse", "BigQuery", "Snowflake", "Redshift",
        "Amazon Redshift", "Firebase Realtime Database", "Firestore", "Cloud Firestore", "Supabase",
        "PlanetScale", "Neon", "CockroachDB", "FaunaDB", "Database Design", "Schema Design",
        "Normalization", "Denormalization", "Indexing", "Query Optimization", "Stored Procedures",
        "Triggers", "Views", "Database Migration", "Liquibase", "Flyway", "Prisma", "TypeORM",
        "Sequelize", "SQLAlchemy", "Alembic", "Transactions", "ACID", "Sharding", "Replication",
        "Connection Pooling", "WAL (Write-Ahead Logging)", "B-Tree Indexes", "Full-Text Search",
        "PostGIS", "Vector Search", "pgvector", "Pinecone", "Milvus", "Qdrant", "ChromaDB", "Weaviate"
    ],
    "cloud_devops": [
        "Amazon Web Services", "AWS", "Google Cloud Platform", "GCP", "Microsoft Azure", "Azure",
        "DigitalOcean", "Linode", "Heroku", "Vercel", "Netlify", "Cloudflare", "EC2", "S3",
        "RDS", "Lambda", "ECS", "EKS", "Fargate", "CloudFront", "Route 53", "VPC", "IAM",
        "CloudWatch", "CloudFormation", "Compute Engine", "Cloud Storage", "Cloud Functions",
        "Cloud Run", "GKE", "BigQuery", "Azure App Service", "Azure Functions", "Blob Storage",
        "AKS", "Docker", "Docker Compose", "Docker Swarm", "Podman", "Kubernetes", "k8s",
        "Helm", "Terraform", "Ansible", "Puppet", "Chef", "Vagrant", "Jenkins", "GitHub Actions",
        "GitLab CI", "GitLab CI/CD", "CircleCI", "Travis CI", "ArgoCD", "Flux CD", "Prometheus",
        "Grafana", "ELK Stack", "Elasticsearch", "Logstash", "Kibana", "Splunk", "Datadog",
        "New Relic", "Jaeger", "OpenTelemetry", "Nagios", "Zabbix", "Nginx", "Apache HTTP Server",
        "Apache", "HAProxy", "Traefik", "Envoy", "Istio", "Linkerd", "Site Reliability Engineering",
        "SRE", "Infrastructure as Code", "IaC", "CI/CD", "Continuous Integration", "Continuous Deployment",
        "GitOps", "Chaos Engineering", "Zero-Downtime Deployment", "Blue-Green Deployment",
        "Canary Releases", "SonarQube", "HashiCorp Vault", "Karpenter", "Cert-Manager", "CoreDNS"
    ],
    "ai_llm_engineering": [
        "Large Language Models", "LLMs", "Generative AI", "GenAI", "OpenAI API", "GPT-4",
        "GPT-3.5", "ChatGPT", "Claude", "Gemini", "Llama", "Llama 2", "Llama 3", "Mistral",
        "Prompt Engineering", "Prompt Design", "LangChain", "LlamaIndex", "Haystack", "Hugging Face",
        "Transformers", "Vector Databases", "Embeddings", "RAG", "Retrieval-Augmented Generation",
        "Semantic Search", "Fine-Tuning", "LoRA", "QLoRA", "PEFT", "RLHF", "DPO", "Model Quantization",
        "GGUF", "AWQ", "vLLM", "Ollama", "Text Generation", "Text Summarization", "Function Calling",
        "AI Agents", "Autonomous Agents", "CrewAI", "AutoGen", "LangGraph", "LangSmith", "Guardrails AI",
        "DSPy", "ChromaDB", "Pinecone", "Milvus", "Qdrant", "Sentence Transformers", "Tiktoken",
        "Whisper", "Speech-to-Text", "Text-to-Speech", "TTS", "ElevenLabs", "Diffusion Models",
        "Stable Diffusion", "Midjourney", "DALL-E", "ControlNet", "ComfyUI", "LoRA Training"
    ],
    "data_science_ml": [
        "Machine Learning", "ML", "Deep Learning", "DL", "Supervised Learning", "Unsupervised Learning",
        "Reinforcement Learning", "Scikit-learn", "TensorFlow", "Keras", "PyTorch", "XGBoost",
        "LightGBM", "CatBoost", "Pandas", "NumPy", "SciPy", "Matplotlib", "Seaborn", "Plotly",
        "Bokeh", "Statsmodels", "Linear Regression", "Logistic Regression", "Decision Trees",
        "Random Forest", "Support Vector Machines", "SVM", "K-Means", "PCA", "t-SNE",
        "Gradient Boosting", "Neural Networks", "CNN", "Convolutional Neural Networks", "RNN",
        "Recurrent Neural Networks", "LSTM", "Transformers", "BERT", "ResNet", "YOLO",
        "Object Detection", "Image Segmentation", "Image Classification", "Computer Vision",
        "CV", "OpenCV", "Natural Language Processing", "NLP", "NLTK", "SpaCy", "Tokenization",
        "Lemmatization", "Sentiment Analysis", "Named Entity Recognition", "NER", "Topic Modeling",
        "Word Embeddings", "Word2Vec", "GloVe", "FastText", "A/B Testing", "Hypothesis Testing",
        "Exploratory Data Analysis", "EDA", "Feature Engineering", "Model Evaluation", "Cross-Validation",
        "Hyperparameter Tuning", "Optuna", "MLflow", "Weights & Biases", "W&B", "Jupyter", "JupyterLab",
        "Google Colab", "AutoML", "SHAP", "LIME", "Time Series Forecasting", "ARIMA", "Prophet"
    ],
    "data_engineering": [
        "Apache Spark", "PySpark", "Spark SQL", "Apache Kafka", "Kafka", "Apache Flink",
        "Apache Airflow", "Airflow", "Prefect", "Dagster", "Luigi", "dbt", "data build tool",
        "Apache Hadoop", "HDFS", "Apache Hive", "Presto", "Trino", "Apache Cassandra", "Delta Lake",
        "Apache Iceberg", "Apache Hudi", "ETL", "ELT", "Data Pipeline", "Data Warehousing",
        "Data Lake", "Data Lakehouse", "Data Modeling", "Dimensional Modeling", "Star Schema",
        "Snowflake Schema", "Data Quality", "Great Expectations", "Data Governance", "Apache Beam",
        "Google Cloud Dataflow", "AWS Glue", "Azure Data Factory", "Kafka Streams", "Debezium",
        "CDC (Change Data Capture)", "Vector Databases", "DuckDB", "Apache Arrow", "Parquet", "Avro", "ORC"
    ],
    "mobile": [
        "Android", "Android Development", "iOS", "iOS Development", "React Native", "Flutter",
        "Dart", "Swift", "SwiftUI", "Objective-C", "Kotlin", "Java", "Android Jetpack",
        "Jetpack Compose", "UIKit", "Core Data", "Room Database", "Realm", "Retrofit",
        "Alamofire", "CocoaPods", "Swift Package Manager", "SPM", "Gradle", "Expo", "Capacitor",
        "Ionic", "Cordova", "Xamarin", "MAUI", ".NET MAUI", "App Store Submission",
        "Google Play Publishing", "Push Notifications", "Firebase Cloud Messaging", "FCM",
        "Apple Push Notification service", "APNs", "Mobile UI Design", "Deep Linking", "In-App Purchases",
        "Mobile Analytics", "Crashlytics", "Fastlane", "BLE (Bluetooth Low Energy)", "Mobile Security",
        "ProGuard", "R8", "Android NDK", "KMM (Kotlin Multiplatform Mobile)"
    ],
    "cybersecurity": [
        "Information Security", "InfoSec", "Network Security", "Application Security", "AppSec",
        "Cloud Security", "Endpoint Security", "Penetration Testing", "Pen Testing", "Ethical Hacking",
        "Vulnerability Assessment", "VAPT", "Incident Response", "Threat Hunting", "Threat Intelligence",
        "Digital Forensics", "SIEM", "SOC", "Splunk", "QRadar", "Wazuh", "Wireshark", "Nmap",
        "Metasploit", "Burp Suite", "OWASP", "OWASP Top 10", "Firewalls", "IDS/IPS", "VPN",
        "Zero Trust", "IAM", "Identity and Access Management", "Multi-Factor Authentication", "MFA",
        "Public Key Infrastructure", "PKI", "Cryptography", "Encryption", "AES", "RSA", "SSL/TLS",
        "Security Compliance", "SOC 2", "ISO 27001", "PCI-DSS", "HIPAA", "GDPR", "CIS Benchmarks",
        "NIST Framework", "Malware Analysis", "Reverse Engineering", "Security Auditing", "Kali Linux",
        "OSCP", "CEH", "CISSP", "CompTIA Security+", "CISA", "CISM", "SAST", "DAST", "Snyk", "Trivy"
    ],
    "networking": [
        "Computer Networking", "TCP/IP", "UDP", "DNS", "DHCP", "HTTP", "HTTPS", "HTTP/2",
        "HTTP/3", "QUIC", "FTP", "SSH", "Telnet", "SMTP", "SNMP", "BGP", "OSPF", "EIGRP",
        "RIP", "VLAN", "Subnetting", "CIDR", "NAT", "Routing", "Switching", "Load Balancing",
        "Firewall Configuration", "Proxy", "VPN", "IPsec", "OpenVPN", "WireGuard", "SD-WAN",
        "MPLS", "QoS", "Network Monitoring", "Network Troubleshooting", "Wireshark", "Packet Analysis",
        "Cisco IOS", "Juniper Junos", "Arista EOS", "MikroTik RouterOS", "Fortinet FortiGate",
        "Palo Alto PAN-OS", "CCNA", "CCNP", "CCIE", "Network Virtualization", "SDN", "Network Topology",
        "Fiber Optics", "OTDR", "DWDM", "Microwave Transmission", "4G LTE", "5G Core"
    ],
    "architecture_concepts": [
        "Design Patterns", "SOLID Principles", "DRY", "KISS", "Clean Architecture", "Hexagonal Architecture",
        "Ports and Adapters", "Onion Architecture", "Microservices Architecture", "Service-Oriented Architecture",
        "SOA", "Monolithic Architecture", "Event-Driven Architecture", "EDA", "CQRS", "Event Sourcing",
        "Domain-Driven Design", "DDD", "RESTful Architecture", "GraphQL Architecture", "Serverless Architecture",
        "Peer-to-Peer", "P2P", "Model-View-Controller", "MVC", "MVVM", "Micro-frontends",
        "Distributed Systems", "High Availability", "Fault Tolerance", "Scalability", "Horizontal Scaling",
        "Vertical Scaling", "Load Balancing", "CAP Theorem", "PACELC Theorem", "Data Consistency",
        "Eventual Consistency", "ACID", "BASE", "Idempotency", "Circuit Breaker Pattern", "Saga Pattern",
        "Strangler Fig Pattern", "Enterprise Integration Patterns", "System Design", "UML Modeling"
    ],
    "testing_qa": [
        "Unit Testing", "Integration Testing", "Functional Testing", "System Testing",
        "End-to-End Testing", "E2E Testing", "Regression Testing", "Smoke Testing", "Sanity Testing",
        "Performance Testing", "Load Testing", "Stress Testing", "Usability Testing", "Acceptance Testing",
        "UAT", "A/B Testing", "Test-Driven Development", "TDD", "Behavior-Driven Development", "BDD",
        "Test Automation", "Manual Testing", "Test Case Design", "Test Planning", "Test Execution",
        "Bug Tracking", "Defect Management", "Jest", "Mocha", "Chai", "Jasmine", "PyTest",
        "unittest", "JUnit", "TestNG", "Selenium", "Selenium WebDriver", "Cypress", "Playwright",
        "Puppeteer", "Appium", "Postman", "Newman", "RestAssured", "JMeter", "Gatling", "k6",
        "Locust", "SonarQube", "Code Coverage", "Mocking", "Test Doubles", "Jira", "TestRail", "Zephyr"
    ],
    "version_control": [
        "Git", "GitHub", "GitLab", "Bitbucket", "Git branching", "Gitflow", "Trunk-Based Development",
        "Merge Conflicts", "Rebase", "Cherry-pick", "Git submodules", "Git LFS", "Pull Requests",
        "Code Review", "Version Control", "Semantic Versioning", "SemVer", "Changelog Management",
        "SVN", "Subversion", "Mercurial", "Perforce", "Git Hooks", "Husky", "Conventional Commits"
    ],
    "design_ux": [
        "UI Design", "User Interface Design", "UX Design", "User Experience Design", "Interaction Design",
        "IxD", "Information Architecture", "IA", "User Research", "Usability Testing", "User Personas",
        "User Journey Mapping", "Wireframing", "Prototyping", "Rapid Prototyping", "Design Systems",
        "Style Guides", "Typography", "Color Theory", "Layout", "Visual Hierarchy", "Accessibility",
        "A11y", "Responsive Design", "Mobile-First Design", "Design Thinking", "Figma", "Sketch",
        "Adobe XD", "InVision", "Framer", "Axure RP", "Balsamiq", "Miro", "Zeplin", "Principle",
        "Lottie Animation", "Affinity Designer", "Canva", "Heuristic Evaluation", "Design Tokens"
    ],
    "project_management": [
        "Agile", "Scrum", "Kanban", "Scrumban", "Lean", "Waterfall", "Agile Coaching", "Sprint Planning",
        "Daily Standup", "Sprint Review", "Sprint Retrospective", "Backlog Grooming", "Backlog Refinement",
        "Story Point Estimation", "Velocity Tracking", "Burn-Down Charts", "Product Roadmap",
        "Product Management", "Feature Prioritization", "OKRs", "KPIs", "User Stories", "Acceptance Criteria",
        "Risk Management", "Stakeholder Management", "Scope Management", "Cost Estimation", "Budgeting",
        "Jira", "Confluence", "Trello", "Asana", "Monday.com", "ClickUp", "Notion", "Linear",
        "Basecamp", "Wrike", "Microsoft Project", "Smartsheet", "PMP", "CAPM", "PRINCE2", "Scrum Master", "PSM", "CSM"
    ],
    "blockchain_web3": [
        "Blockchain", "Smart Contracts", "Ethereum", "Solidity", "Web3.js", "Ethers.js", "Hardhat",
        "Truffle", "Foundry", "Remix IDE", "IPFS", "DeFi", "Decentralized Finance", "NFTs",
        "Non-Fungible Tokens", "ERC-20", "ERC-721", "ERC-1155", "DAOs", "DEX", "Automated Market Makers",
        "AMM", "Staking", "Yield Farming", "Layer 2", "Rollups", "Optimistic Rollups", "ZK-Rollups",
        "Zero-Knowledge Proofs", "ZKP", "Solana", "Rust for Solana", "Anchor Framework", "Polygon",
        "Binance Smart Chain", "Avalanche", "Cosmos", "Polkadot", "Cardano", "Hyperledger Fabric",
        "MetaMask", "WalletConnect", "Cryptography", "Consensus Algorithms", "Proof of Work", "Proof of Stake"
    ],
    "game_development": [
        "Game Development", "Game Design", "Unity", "Unity 3D", "Unreal Engine", "UE4", "UE5",
        "Godot", "GameMaker", "C# for Unity", "C++ for Unreal", "Blueprints", "GDScript",
        "2D Game Development", "3D Game Development", "Game Physics", "Collision Detection",
        "Game AI", "Pathfinding", "A* Algorithm", "Animation", "Rigging", "Skeletal Animation",
        "Shaders", "Shader Graph", "HLSL", "GLSL", "Particle Systems", "VFX", "Level Design",
        "Sound Design", "Audio Integration", "FMOD", "Wwise", "Multiplayer Game Development",
        "Netcode", "Photon", "Mirror", "Spatial Audio", "AR Development", "Augmented Reality",
        "VR Development", "Virtual Reality", "XR", "ARKit", "ARCore", "OpenXR", "Blender", "Maya", "3ds Max"
    ],
    "embedded_iot": [
        "Embedded Systems", "Embedded C", "Embedded C++", "Microcontrollers", "MCU", "Arduino",
        "Raspberry Pi", "ESP32", "ESP8266", "STM32", "ARM Cortex", "PIC Microcontrollers", "AVR",
        "RTOS", "FreeRTOS", "Zephyr RTOS", "Embedded Linux", "Yocto Project", "Device Drivers",
        "GPIO", "I2C", "SPI", "UART", "USART", "CAN Bus", "RS-485", "RS-232", "ADC", "DAC",
        "PWM", "Timers", "Interrupts", "DMA", "PCB Design", "Schematic Design", "KiCad",
        "Altium Designer", "Eagle", "Soldering", "Oscilloscope", "Logic Analyzer", "Multimeter",
        "Hardware Debugging", "Firmware Development", "OTA Updates", "IoT", "Internet of Things",
        "MQTT", "CoAP", "HTTP for IoT", "Bluetooth", "BLE", "Bluetooth Low Energy", "Wi-Fi",
        "Zigbee", "Z-Wave", "LoRa", "LoRaWAN", "Cellular IoT", "NB-IoT", "Edge Computing"
    ],
    "business_finance": [
        "Financial Analysis", "Financial Modeling", "Corporate Finance", "Accounting", "Bookkeeping",
        "Budgeting", "Forecasting", "Variance Analysis", "Financial Reporting", "P&L Management",
        "Balance Sheet", "Cash Flow Statement", "Cash Flow Management", "Valuation", "DCF",
        "Discounted Cash Flow", "Capital Budgeting", "NPV", "IRR", "Financial Auditing", "Internal Audit",
        "External Audit", "Tax Planning", "Tax Preparation", "Corporate Tax", "Income Tax", "VAT",
        "Sales Tax", "Payroll Processing", "Accounts Payable", "AP", "Accounts Receivable", "AR",
        "General Ledger", "Bank Reconciliation", "QuickBooks", "Xero", "FreshBooks", "SAP", "SAP ERP",
        "SAP FICO", "Oracle Financials", "NetSuite", "TallyPrime", "Zoho Books", "Excel",
        "Advanced Excel", "Financial Risk Management", "Credit Risk", "Market Risk", "Operational Risk",
        "Mergers and Acquisitions", "M&A", "Due Diligence", "Investment Analysis", "Portfolio Management",
        "Asset Management", "Wealth Management", "Private Equity", "Venture Capital", "Treasury Management"
    ],
    "soft_skills": [
        "Communication", "Written Communication", "Verbal Communication", "Presentation Skills",
        "Public Speaking", "Active Listening", "Negotiation", "Persuasion", "Conflict Resolution",
        "Mediation", "Interpersonal Skills", "Relationship Building", "Networking", "Collaboration",
        "Teamwork", "Cross-Functional Collaboration", "Leadership", "Team Leadership", "People Management",
        "Mentoring", "Coaching", "Delegation", "Decision Making", "Strategic Thinking", "Problem Solving",
        "Analytical Thinking", "Critical Thinking", "Creative Problem Solving", "Troubleshooting",
        "Root Cause Analysis", "Time Management", "Prioritization", "Organization", "Multi-tasking",
        "Attention to Detail", "Adaptability", "Flexibility", "Resilience", "Stress Management",
        "Emotional Intelligence", "Empathy", "Self-Motivation", "Work Ethic", "Accountability",
        "Cultural Awareness", "Diversity & Inclusion", "Customer Empathy", "Executive Storytelling"
    ],
    # 🇧🇩 Specific Bangladesh Domains
    "bangladesh_civil_service_govt": [
        "BCS Preliminary Preparation", "BCS Written Examination", "Bangladesh Affairs & History",
        "Liberation War History 1971", "Constitution of Bangladesh", "Father of the Nation Bangabandhu Studies",
        "International Relations & Geopolitics", "Bangla Grammar & Bhasha Andolan", "Bangla Literature History",
        "English Essay & Precis Writing", "General Science & Everyday Technology", "Mental Ability & Mathematical Reasoning",
        "Public Administration Fundamentals", "Good Governance & Citizen Charter", "Public Procurement Act (PPA 2006)",
        "Public Procurement Rules (PPR 2008)", "National Integrity Strategy (NIS)", "Right to Information (RTI Act 2009)",
        "Citizen Charter Delivery", "Secretariat Instructions & File Notings", "Nothi e-Filing (D-Nothi / e-Nothi)",
        "Disaster Management Framework of BD", "Upazila Administration & Revenue Court", "Executive Magistrate Mobile Court Act 2009",
        "Annual Performance Agreement (APA)", "Govt Service Conduct Rules 1979", "Govt Servants (Discipline and Appeal) Rules 2018",
        "National Pay Scale 2015", "Govt Pension & GPF Rules", "Voter List & Election Conduct Procedures",
        "Teletalk AllJobs Application Procedures", "BPSC Cadre & Non-Cadre Verification", "Govt Office Bangla Drafting (Sarkari Potrachar)"
    ],
    "bangladesh_banking_finance_public": [
        "Bangladesh Bank Guidelines", "Banking Company Act 1991", "Foreign Exchange Regulation Act 1947",
        "Money Laundering Prevention Act 2012", "Anti-Terrorism Act 2009", "BFIU Suspicious Transaction Reporting (STR)",
        "Internal Credit Risk Rating System (ICRRS)", "Single Borrower Exposure Limit (SBEL)", "Asset Liability Management (ALM)",
        "Non-Performing Loan (NPL) Recovery", "Artha Rin Adalat Ain 2003", "Negotiable Instruments Act 1881",
        "Core Banking Solution (CBS)", "Finacle Banking Software", "Temenos T24 Software", "Flora Bank CBS",
        "Bangladesh Automated Clearing House (BACH)", "BEFTN (Electronic Funds Transfer)", "RTGS (Real-Time Gross Settlement)",
        "NPSB (National Payment Switch BD)", "MFS Regulations (bKash, Nagad, Rocket)", "Credit Information Bureau (CIB) Inquiry",
        "Agricultural Credit Policy", "SME Foundation Refinance Schemes", "JAIBB Certification (IBB)", "DAIBB Certification (IBB)",
        "Letter of Credit (LC) LCAF Regulations", "Import Surcharge & Customs Duty Assessment", "Export Development Fund (EDF)",
        "Treasury Bills & Bangladesh Bank Repo/Reverse Repo", "Islamic Banking Shariah Guidelines (AAOIFI)", "Mudaraba & Murabaha Accounting"
    ],
    "accounting_audit_tax_bd": [
        "Income Tax Act 2023", "Income Tax Rules 2023", "Value Added Tax (VAT) Act 2012", "VAT Rules 2016",
        "Withholding Tax (TDS) Slabs", "Withholding VAT (VDS) Mushak 6.3 / 6.6", "Customs Act 2023",
        "ASYCUDA World Customs Clearance", "NBR e-Return Filing", "e-TIN Generation & Tax Assessment",
        "Tax Deducted at Source (TDS) Monitoring System", "CA Articleship (ICAB)", "CMA Certification (ICMAB)",
        "Statutory Audit under Bangladesh Standards on Auditing (BSA)", "Financial Reporting Act 2015 (FRA)",
        "Financial Reporting Council (FRC) Oversight", "TallyPrime ERP Accounting", "SAP FICO Implementation",
        "QuickBooks Online", "Cost Audit & Cost Accounting Standards (CAS)", "Transfer Pricing Regulations BD",
        "Tax Holiday & Special Economic Zone (BEZA) Tax Exemption", "Company Law 1994 & RJSC Annual Return (Form XII)"
    ],
    "engineering_power_civil_bd": [
        "Bangladesh National Building Code (BNBC 2020)", "AutoCAD 2D/3D Architecture", "ETABS Structural Analysis",
        "SAP2000 Structural Modeling", "SAFE Foundation Design", "STAAD.Pro Engineering", "Revit BIM Architecture",
        "Primavera P6 Construction Scheduling", "MS Project Scheduling", "BOQ & Rate Analysis (PWD Schedule of Rates)",
        "LGED Rate Schedule & Guidelines", "RHD Standard Specifications for Roads & Bridges", "Geotechnical Soil Test Interpretation",
        "Pile Load Test & Integrity Testing", "Concrete Slump & Cube Crushing Strength Testing", "Rebar Tensile Testing",
        "Power System Operation & BPDB Grid Code", "Substation 33/11kV Equipment Commissioning", "132/230/400kV High Voltage Transmission",
        "Transformer Oil Dielectric Testing", "Vacuum Circuit Breaker (VCB) Maintenance", "Gas Insulated Switchgear (GIS)",
        "SCADA Energy Management Systems (EMS)", "Smart Grid AMI Metering", "Solar PV Rooftop (Net Metering Guidelines)"
    ],
    "telecom_network_bd": [
        "BTRC Regulatory Telecom Directives", "2G/3G/4G/5G Cellular Network Architecture", "Radio Frequency (RF) Site Planning",
        "Cellular Drive Test Analysis (TEMS / Nemo)", "Microwave Link Budget & Alignment", "Optical Fiber Transmission (DWDM / SDH)",
        "Optical Time Domain Reflectometer (OTDR) Testing", "Fiber Splicing & Patching", "Fiber@Home NTTN Infrastructure",
        "Summit Communications NTTN Network", "BTS Tower Maintenance & edotco Protocols", "Network Operations Center (NOC) Surveillance",
        "MikroTik BGP Routing (ISP Tier-1/2/3)", "Cisco Core Routing & Switching", "FTTH GPON / EPON Network Design"
    ],
    "textile_apparel_merchandising_bd": [
        "Apparel Costing & Consumption Calculation", "Time and Action Calendar (T&A)", "Fabric Tech Pack Interpretation",
        "Woven Garment Merchandising", "Knitwear & Circular Knitting Merchandising", "Sweater & Flat Knitting Gauge Calculation",
        "Yarn Count & Denier Measurement", "Dyeing Recipe & Color Matching (Spectrophotometer)", "AATCC Washing & Rubbing Fastness Testing",
        "Fabric Shrinkage & GSM Testing", "AQL 1.5 / 2.5 Quality Inspection Protocol", "Standard Allowed Minute (SAM) & SMV Calculation",
        "General Sewing Data (GSD)", "Sewing Floor Line Balancing", "Lean Manufacturing in Garments (5S, Kaizen)",
        "RSC / Accord Fire & Building Safety Protocols", "Social Compliance Auditing (BSCI, SEDEX, WRAP)", "OEKO-TEX Standard 100",
        "GOTS (Global Organic Textile Standard)", "Effluent Treatment Plant (ETP) Biological Operations", "FastReact Production Planning"
    ],
    "pharmaceutical_healthcare_bd": [
        "Current Good Manufacturing Practices (cGMP)", "Directorate General of Drug Administration (DGDA) Rules",
        "High Performance Liquid Chromatography (HPLC)", "Gas Chromatography (GC)", "UV-Visible Spectrophotometry",
        "Dissolution Rate & In-Vitro Testing", "Microbial Limit Testing (MLT)", "Clean Room HVAC Validation (Class A/B/C/D)",
        "Method Validation (ICH Guidelines Q2)", "Stability Testing (ICH Zone IVb for BD Climate)", "Wet Granulation & Tablet Compression",
        "Sterile Injectable Vial Filling", "Medical Detailing & Doctor Prescription Tracking", "BMDC Medical Registration Protocols",
        "BNMC Nursing Standards", "Emergency Medical Triage & Resuscitation (BLS)", "Hospital Information System (HIS)",
        "Hospital Infection Control Protocols", "JCI Accreditation Healthcare Standards"
    ],
    "agriculture_food_science_bd": [
        "Crop Agronomy & Hybrid Seed Technology", "BRRI Modern Rice Cultivation Techniques", "Soil Testing & Fertilizer Dose Calculation (BARC)",
        "Integrated Pest Management (IPM)", "Agrochemical Sales & Dealer Channel Management", "Poultry Biosecurity & Vaccination Schedule",
        "Doctor of Veterinary Medicine (DVM) Protocols", "Broiler & Layer Feed Conversion Ratio (FCR)", "Brackish Water Shrimp Farming (Vannamei / Bagda)",
        "Biofloc Fish Farming System", "Induced Carp Breeding in Hatcheries", "BSTI Standards for Packaged Food (BDS)",
        "HACCP & ISO 22000 Food Safety Standards", "Food Chemical & Microbial Laboratory Testing", "Cold Storage Temperature Management",
        "Sensory Quality Evaluation of Foods", "Halal Food Production Certification"
    ],
    "legal_judiciary_bd": [
        "Code of Civil Procedure 1908 (CPC)", "Code of Criminal Procedure 1898 (CrPC)", "Penal Code 1860",
        "Evidence Act 1872", "Specific Relief Act 1877", "Transfer of Property Act 1882",
        "Bangladesh Bar Council Advocacy Canons", "Supreme Court of Bangladesh Rules", "Dhaka Law Reports (DLR) Citations",
        "Bangladesh Legal Decisions (BLD)", "Civil Court Practice & Injunction Applications", "Criminal Bail Petition Drafting",
        "Writ Petition Jurisdiction (Article 102)", "Bangladesh Labour Act 2006", "Bangladesh Labour Rules 2015",
        "Labour Court Procedures & Grievance Petitions", "Company Act 1994", "RJSC Incorporation & Mortgages",
        "Negotiable Instruments Act (Section 138 Dishonor Cases)", "Money Loan Court Act (Artha Rin Adalat)",
        "Arbitration Act 2001", "Trademarks Act 2009", "Copyright Act 2000", "Cyber Security Act 2023"
    ],
    "sales_commercial_fmcg_bd": [
        "FMCG Route-to-Market Strategy", "Distributor Management System (DMS)", "Secondary Sales Tracking & Retail Strike Rate",
        "Key Account Management (KAM)", "Modern Trade & Superstore Channel (Shwapno, Unimart, Agora)", "General Trade Wholesale Coverage (Moulvibazar, Khatunganj)",
        "Dealer Network Incentive Schemes", "Trade Marketing & Point of Sale Materials (POSM)", "B2B Institutional Tender Pitching",
        "Letter of Credit (LC) Sourcing & Negotiation", "Freight Forwarding & Shipping Line Coordination", "Incoterms 2020 Commercial Contracts",
        "Chattogram Port Clearing & Forwarding (C&F)", "Benapole Land Port Import Formalities", "Bonded Warehouse Licensing & Entitlement",
        "Brand Equity & Positioning Strategy", "Consumer Insight Focus Group Discussions (FGD)", "ATL & BTL Marketing Activations"
    ],
    "digital_marketing_creative_bd": [
        "Meta Ads Manager Campaign Setup", "Facebook Pixel & Conversion API", "Google Search & Display Ads",
        "Search Engine Optimization (SEO On-Page & Off-Page)", "Technical SEO & Schema Markup", "Google Analytics 4 (GA4) Tracking",
        "Google Tag Manager (GTM) Container Setup", "Social Media Community Management", "Bilingual Content Writing (Bangla & English)",
        "Brand Tone of Voice & Copywriting", "Adobe Photoshop Graphic Creative", "Adobe Illustrator Vector Graphics",
        "Adobe Premiere Pro Video Editing", "DaVinci Resolve Color Correction", "Adobe After Effects Motion Graphics",
        "Short-Form Video Production (Reels, TikTok, Shorts)", "Influencer Marketing & KOL Management BD", "PR Press Release Distribution in Dhaka"
    ],
    "ngo_social_development_bd": [
        "Project Cycle Management (PCM)", "Logical Framework Analysis (LFA)", "Theory of Change (ToC)",
        "Donor Reporting (USAID, FCDO, EU, Global Fund)", "KoboToolbox Mobile Data Collection", "ODK (Open Data Kit) Field Surveys",
        "SPSS / Stata Statistical Data Analysis", "Participatory Rural Appraisal (PRA)", "Focus Group Discussion (FGD) Facilitation",
        "Community Vulnerability & Capacity Assessment (CVCA)", "Disaster Risk Reduction (DRR) Planning", "Water, Sanitation and Hygiene (WASH)",
        "Sphere Humanitarian Charter Standards", "Refugee Camp Coordination (Rohingya Camp Cox's Bazar)", "Gender & Protection Mainstreaming",
        "Child Protection Safeguarding Policies", "Microfinance Village Organization (VO) Meetings", "Monitoring, Evaluation, Accountability & Learning (MEAL)"
    ]
}

# Merge and deduplicate
for domain, skill_list in additions.items():
    if domain not in tax:
        tax[domain] = []
    
    # Existing lower-case set
    existing_lower = {s.lower(): s for s in tax[domain]}
    
    for s in skill_list:
        s_clean = s.strip()
        if s_clean.lower() not in existing_lower:
            tax[domain].append(s_clean)
            existing_lower[s_clean.lower()] = s_clean

# Calculate stats
total_skills = sum(len(skills) for skills in tax.values() if isinstance(skills, list))
print(f"Total domains: {len(tax)}")
print(f"Total skills in expanded taxonomy: {total_skills}")

# Save updated skills taxonomy
with open('nlp_export/skills_taxonomy.json', 'w', encoding='utf-8') as f:
    json.dump(tax, f, indent=2, ensure_ascii=False)

print("Saved nlp_export/skills_taxonomy.json successfully!")
