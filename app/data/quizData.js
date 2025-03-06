import { Users, Code2, LineChart, Brain, FileText, BarChart, Rocket } from "lucide-react";

export const quizSections = {
  qualification: {
    title: "About You",
    icon: Users,
    questions: [
      {
        id: "status",
        question: "What's your current status?",
        type: "single",
        options: [
          { value: "student", label: "I'm a student" },
          { value: "recent_grad", label: "I'm a recent graduate" },
          { value: "working", label: "I'm currently working" },
          { value: "between_jobs", label: "I'm between jobs" },
          { value: "career_change", label: "I'm looking to change careers" },
        ],
      },
      {
        id: "experience",
        question: "How much experience do you have in data-related fields?",
        type: "single",
        options: [
          { value: "none", label: "No experience yet" },
          { value: "internship", label: "Internship or academic projects" },
          { value: "entry", label: "0-2 years of professional experience" },
          { value: "mid", label: "3-5 years of professional experience" },
          { value: "senior", label: "5+ years of professional experience" },
          { value: "lead", label: "10+ years, including leadership roles" },
        ],
      },
    ],
  },
  workStyle: {
    title: "How You Like to Work",
    icon: Users,
    questions: [
      {
        id: "work_preferences",
        question: "Which of these activities do you enjoy most? (Select all that apply)",
        type: "multiple",
        options: [
          { value: "organizing", label: "Organizing tasks and creating project plans" },
          { value: "analyzing", label: "Analyzing data and finding patterns" },
          { value: "innovating", label: "Coming up with creative solutions to problems" },
          { value: "presenting", label: "Presenting findings and explaining complex ideas" },
          { value: "coding", label: "Writing and optimizing code" },
          { value: "researching", label: "Conducting in-depth research on new topics" },
          { value: "mentoring", label: "Teaching and mentoring others" },
          { value: "strategizing", label: "Developing long-term strategies" },
        ],
      },
      {
        id: "group_role",
        question: "In group projects, which roles do you often take on? (Select all that apply)",
        type: "multiple",
        options: [
          { value: "leader", label: "Project leader or coordinator" },
          { value: "analyst", label: "Data analyst or researcher" },
          { value: "innovator", label: "Creative problem-solver" },
          { value: "communicator", label: "Presenter or report writer" },
          { value: "technical_expert", label: "Technical expert or advisor" },
          { value: "mediator", label: "Conflict resolver or team mediator" },
          { value: "quality_assurer", label: "Quality control or tester" },
          { value: "visionary", label: "Big picture thinker or strategist" },
        ],
      },
    ],
  },
  technical: {
    title: "Technical Skills",
    icon: Code2,
    questions: [
      {
        id: "programming",
        question: "How comfortable are you with programming?",
        type: "single",
        options: [
          { value: "expert", label: "Very comfortable - I code regularly and enjoy it" },
          { value: "proficient", label: "Comfortable - I can write code for most tasks I need" },
          { value: "intermediate", label: "Somewhat comfortable - I can modify existing code and write basic scripts" },
          { value: "beginner", label: "Not very comfortable - I'm still learning the basics" },
          { value: "none", label: "No experience with programming yet" },
        ],
      },
      {
        id: "tech_skills",
        question: "Which of these technical skills are you familiar with? (Select all that apply)",
        type: "multiple",
        options: [
          { value: "python", label: "Python" },
          { value: "r", label: "R" },
          { value: "sql", label: "SQL" },
          { value: "tableau", label: "Tableau or other BI tools" },
          { value: "ml", label: "Machine Learning libraries (e.g., scikit-learn, TensorFlow)" },
          { value: "big_data", label: "Big Data technologies (e.g., Hadoop, Spark)" },
          { value: "cloud", label: "Cloud platforms (e.g., AWS, GCP, Azure)" },
          { value: "version_control", label: "Version control (e.g., Git)" },
          { value: "docker", label: "Containerization (e.g., Docker)" },
          { value: "airflow", label: "Workflow management (e.g., Airflow)" },
          { value: "scala", label: "Scala" },
          { value: "java", label: "Java" },
          { value: "cpp", label: "C++" },
        ],
      },
      {
        id: "data_processing",
        question: "How experienced are you with data processing and ETL?",
        type: "single",
        options: [
          { value: "expert", label: "Expert - I've designed and implemented complex data pipelines" },
          { value: "advanced", label: "Advanced - I'm comfortable with most ETL tools and processes" },
          { value: "intermediate", label: "Intermediate - I've worked on ETL tasks but not extensively" },
          { value: "beginner", label: "Beginner - I understand the concepts but have limited hands-on experience" },
          { value: "none", label: "No experience with data processing or ETL" },
        ],
      },
    ],
  },
  statistics: {
    title: "Statistics Knowledge",
    icon: LineChart,
    questions: [
      {
        id: "stats_concepts",
        question: "How would you rate your understanding of these statistical concepts?",
        type: "grid",
        subQuestions: [
          "Descriptive statistics (mean, median, mode)",
          "Probability distributions",
          "Hypothesis testing",
          "Regression analysis",
          "Bayesian statistics",
          "Time series analysis",
          "Experimental design",
        ],
        scale: [
          { value: 1, label: "No knowledge" },
          { value: 2, label: "Basic understanding" },
          { value: 3, label: "Comfortable applying" },
          { value: 4, label: "Advanced knowledge" },
          { value: 5, label: "Expert level" },
        ],
      },
      {
        id: "causal_inference",
        question: "How familiar are you with causal inference techniques?",
        type: "single",
        options: [
          { value: "expert", label: "Expert - I can design and implement causal inference studies" },
          { value: "proficient", label: "Proficient - I understand the concepts and have applied them" },
          { value: "familiar", label: "Familiar - I know the basic concepts but haven't applied them" },
          { value: "novice", label: "Novice - I've heard of it but don't really understand it" },
          { value: "unfamiliar", label: "Unfamiliar - I've never heard of causal inference" },
        ],
      },
      {
        id: "ab_testing",
        question: "How experienced are you with A/B testing?",
        type: "single",
        options: [
          { value: "expert", label: "Expert - I regularly design and analyze complex A/B tests" },
          { value: "proficient", label: "Proficient - I've conducted several A/B tests and can interpret results" },
          { value: "familiar", label: "Familiar - I understand the concept and have participated in A/B tests" },
          { value: "novice", label: "Novice - I know what A/B testing is but haven't done it" },
          { value: "unfamiliar", label: "Unfamiliar - I'm not sure what A/B testing is" },
        ],
      },
    ],
  },
  machineLearning: {
    title: "Machine Learning Knowledge",
    icon: Brain,
    questions: [
      {
        id: "ml_concepts",
        question: "Rate your familiarity with these ML concepts:",
        type: "grid",
        subQuestions: [
          "Supervised vs Unsupervised Learning",
          "Feature Engineering",
          "Model Evaluation Metrics",
          "Ensemble Methods",
          "Deep Learning Architectures",
          "Natural Language Processing",
          "Computer Vision",
          "Reinforcement Learning",
        ],
        scale: [
          { value: 1, label: "No knowledge" },
          { value: 2, label: "Basic understanding" },
          { value: 3, label: "Comfortable applying" },
          { value: 4, label: "Advanced knowledge" },
          { value: 5, label: "Expert level" },
        ],
      },
      {
        id: "ml_deployment",
        question: "How experienced are you with deploying machine learning models?",
        type: "single",
        options: [
          { value: "expert", label: "Expert - I've deployed and maintained ML models in production environments" },
          { value: "proficient", label: "Proficient - I've deployed models but not extensively" },
          { value: "familiar", label: "Familiar - I understand the process but haven't done it myself" },
          { value: "novice", label: "Novice - I'm aware of the concept but have no practical experience" },
          { value: "unfamiliar", label: "Unfamiliar - I'm not sure what ML deployment involves" },
        ],
      },
    ],
  },
  research: {
    title: "Research Experience",
    icon: FileText,
    questions: [
      {
        id: "research_experience",
        question: "What is your level of experience with academic research?",
        type: "single",
        options: [
          { value: "phd", label: "I have a Ph.D. or extensive research experience" },
          { value: "masters", label: "I've conducted research at the Master's level" },
          { value: "undergrad", label: "I've participated in undergraduate research projects" },
          { value: "industry", label: "I've conducted research in industry settings" },
          { value: "none", label: "I have no formal research experience" },
        ],
      },
      {
        id: "paper_writing",
        question: "How comfortable are you with writing technical papers or research articles?",
        type: "single",
        options: [
          { value: "expert", label: "Very comfortable - I've published multiple papers" },
          { value: "proficient", label: "Comfortable - I've written or co-authored papers" },
          { value: "intermediate", label: "Somewhat comfortable - I've written technical reports" },
          { value: "beginner", label: "Not very comfortable - I have limited experience" },
          { value: "none", label: "No experience with technical writing" },
        ],
      },
    ],
  },
  business: {
    title: "Business Acumen",
    icon: BarChart,
    questions: [
      {
        id: "business_understanding",
        question: "How would you rate your understanding of business concepts and strategies?",
        type: "single",
        options: [
          { value: "expert", label: "Expert - I have extensive business knowledge and experience" },
          { value: "proficient", label: "Proficient - I understand most business concepts well" },
          { value: "intermediate", label: "Intermediate - I have a good grasp of basic business concepts" },
          { value: "beginner", label: "Beginner - I have limited understanding of business concepts" },
          { value: "none", label: "No knowledge of business concepts" },
        ],
      },
      {
        id: "data_to_insights",
        question: "How comfortable are you with translating data insights into business recommendations?",
        type: "single",
        options: [
          { value: "expert", label: "Very comfortable - I do this regularly and effectively" },
          { value: "proficient", label: "Comfortable - I can do this for most situations" },
          { value: "intermediate", label: "Somewhat comfortable - I can do this with guidance" },
          { value: "beginner", label: "Not very comfortable - I find this challenging" },
          { value: "none", label: "No experience with this" },
        ],
      },
    ],
  },
  interests: {
    title: "Interests and Goals",
    icon: Rocket,
    questions: [
      {
        id: "career_interests",
        question: "Which aspects of data science interest you most? (Select all that apply)",
        type: "multiple",
        options: [
          { value: "analysis", label: "Data analysis and visualization" },
          { value: "ml_ai", label: "Machine learning and AI" },
          { value: "engineering", label: "Data engineering and infrastructure" },
          { value: "business", label: "Business intelligence and strategy" },
          { value: "research", label: "Research and development of new algorithms" },
          { value: "product", label: "Product development and management" },
          { value: "ethics", label: "AI ethics and responsible AI" },
          { value: "nlp", label: "Natural Language Processing" },
          { value: "computer_vision", label: "Computer Vision" },
          { value: "iot", label: "Internet of Things and Edge Computing" },
        ],
      },
      {
        id: "career_goals",
        question: "What are your primary career goals in the data field?",
        type: "single",
        options: [
          { value: "technical_expert", label: "Become a technical expert in a specific area" },
          { value: "solve_problems", label: "Solve complex business problems using data" },
          { value: "innovate", label: "Innovate and develop new data technologies" },
          { value: "lead_teams", label: "Lead data science teams and projects" },
          { value: "business_impact", label: "Drive business strategy through data insights" },
          { value: "research", label: "Conduct cutting-edge research in AI/ML" },
          { value: "entrepreneurship", label: "Start my own data-driven company" },
          { value: "education", label: "Educate and mentor others in data science" },
        ],
      },
    ],
  },
};

export const roleDefinitions = {
  "Data Analyst": {
    skills: ["SQL", "Data Visualization", "Statistical Analysis", "Business Understanding"],
    dailyTasks: [
      "Analyze data to identify trends and patterns",
      "Create dashboards and reports",
      "Collaborate with stakeholders",
      "Present findings to business teams",
    ],
    upskilling: [
      { skill: "Advanced Analytics", target: "BI Analyst/Engineer" },
      { skill: "Business Domain", target: "Business Analyst" },
      { skill: "Machine Learning", target: "Full Stack DS" },
    ],
  },
  "BI Analyst/Engineer": {
    skills: ["SQL", "ETL", "Data Warehousing", "Dashboard Development"],
    dailyTasks: [
      "Design and maintain BI solutions",
      "Build data pipelines",
      "Create automated reports",
      "Optimize data models",
    ],
    upskilling: [
      { skill: "Data Engineering", target: "Analytics Engineer" },
      { skill: "Advanced Analytics", target: "Full Stack DS" },
    ],
  },
  "Business Analyst": {
    skills: ["Business Understanding", "Data Analysis", "Requirements Gathering", "Process Modeling"],
    dailyTasks: [
      "Analyze business processes",
      "Gather requirements",
      "Create documentation",
      "Bridge technical and business teams",
    ],
    upskilling: [
      { skill: "Advanced Analytics", target: "Product DS" },
      { skill: "Domain Expertise", target: "Marketing DS" },
    ],
  },
  "Full Stack DS": {
    skills: ["Programming", "Statistics", "Machine Learning", "Data Engineering"],
    dailyTasks: [
      "Build end-to-end data solutions",
      "Develop ML models",
      "Create data pipelines",
      "Deploy solutions to production",
    ],
    upskilling: [
      { skill: "Deep Learning", target: "ML Engineer" },
      { skill: "Causal Inference", target: "Experimentation DS" },
    ],
  },
  "Data Engineer": {
    skills: ["Programming", "Data Pipelines", "Cloud Infrastructure", "Database Management"],
    dailyTasks: [
      "Build data infrastructure",
      "Design ETL processes",
      "Maintain data quality",
      "Optimize performance",
    ],
    upskilling: [
      { skill: "Analytics", target: "Analytics Engineer" },
      { skill: "Machine Learning", target: "ML Engineer" },
    ],
  },
  "Analytics Engineer": {
    skills: ["Data Modeling", "ETL", "Version Control", "Data Quality"],
    dailyTasks: [
      "Transform raw data",
      "Build data models",
      "Implement testing",
      "Document processes",
    ],
    upskilling: [
      { skill: "Machine Learning", target: "Full Stack DS" },
      { skill: "Business Analytics", target: "Product DS" },
    ],
  },
  "Product DS": {
    skills: ["Product Analytics", "A/B Testing", "Business Strategy", "Stakeholder Management"],
    dailyTasks: [
      "Analyze product metrics",
      "Design experiments",
      "Make recommendations",
      "Work with product teams",
    ],
    upskilling: [
      { skill: "Advanced Experimentation", target: "Experimentation DS" },
      { skill: "Domain Expertise", target: "Marketing DS" },
    ],
  },
  "Experimentation DS": {
    skills: ["A/B Testing", "Causal Inference", "Statistical Modeling", "Experiment Design"],
    dailyTasks: [
      "Design experiments",
      "Analyze results",
      "Develop testing frameworks",
      "Provide recommendations",
    ],
    upskilling: [
      { skill: "Advanced Research", target: "Research Scientist" },
      { skill: "Product Analytics", target: "Product DS" },
    ],
  },
  "Research Scientist": {
    skills: ["Machine Learning", "Statistics", "Research Methods", "Academic Writing"],
    dailyTasks: [
      "Conduct research",
      "Develop algorithms",
      "Write papers",
      "Present findings",
    ],
    upskilling: [
      { skill: "Deep Learning", target: "ML Engineer" },
      { skill: "Applied ML", target: "Full Stack DS" },
    ],
  },
  "ML Engineer": {
    skills: ["Programming", "Machine Learning", "MLOps", "Software Engineering"],
    dailyTasks: [
      "Build ML systems",
      "Deploy models",
      "Optimize performance",
      "Maintain ML infrastructure",
    ],
    upskilling: [
      { skill: "Research", target: "Research Scientist" },
      { skill: "Domain ML", target: "Marketing DS" },
    ],
  },
  "Marketing DS": {
    skills: ["Marketing Analytics", "Customer Behavior", "A/B Testing", "Business Strategy"],
    dailyTasks: [
      "Analyze marketing campaigns",
      "Build customer segments",
      "Optimize marketing spend",
      "Create attribution models",
    ],
    upskilling: [
      { skill: "Advanced Marketing", target: "Advertising DS" },
      { skill: "Product Analytics", target: "Product DS" },
    ],
  },
}; 