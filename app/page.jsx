"use client"

import { useEffect, useState } from "react";
import { Button } from "components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "components/ui/card";
import { RadioGroup, RadioGroupItem } from "components/ui/radio-group";
import { Checkbox } from "components/ui/checkbox";
import { Label } from "components/ui/label";
import { Progress } from "components/ui/progress";
import { ScrollArea } from "components/ui/scroll-area";
import { Slider } from "components/ui/slider";
import { ArrowRight, BarChart, Brain, Database, ChevronRight, Code2, LineChart, Rocket, Users, BookOpen, FileText, Download } from "lucide-react";
import { jsPDF } from "jspdf";


const quizSections = {
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
}

const roleDefinitions = {
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
}

export default function Component() {
  const [mounted, setMounted] = useState(false);
  const [currentScreen, setCurrentScreen] = useState('welcome');
  const [currentSection, setCurrentSection] = useState('qualification');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState(null);
  const [normalizedResults, setNormalizedResults] = useState(null);

  // Handle client-side mounting
  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render anything until mounted
  if (!mounted) {
    return null;
  }

  const getCurrentSection = () => {
    if (!currentSection || !quizSections[currentSection]) {
      return quizSections['qualification'];
    }
    return quizSections[currentSection];
  };

  const getCurrentQuestion = () => {
    const section = getCurrentSection();
    if (!section?.questions) return null;
    return section.questions[currentQuestionIndex];
  };

  const QuizScreen = () => {
    const currentSectionData = getCurrentSection();
    const currentQuestion = getCurrentQuestion();

    if (!currentSectionData || !currentQuestion) {
      return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center">
          <div className="text-xl text-red-600">Error loading quiz. Please refresh the page.</div>
        </div>
      );
    }

    const SectionIcon = currentSectionData.icon;

    const goBack = () => {
      if (currentQuestionIndex > 0) {
        setCurrentQuestionIndex(currentQuestionIndex - 1);
      } else {
        const sectionKeys = Object.keys(quizSections);
        const currentSectionIndex = sectionKeys.indexOf(currentSection);
        if (currentSectionIndex > 0) {
          setCurrentSection(sectionKeys[currentSectionIndex - 1]);
          const prevSectionData = quizSections[sectionKeys[currentSectionIndex - 1]];
          setCurrentQuestionIndex(prevSectionData.questions.length - 1);
        } else {
          setCurrentScreen("welcome");
        }
      }
    };

    const renderQuestion = (question) => {
      switch (question.type) {
        case "single":
          return (
            <div className="space-y-4">
              <RadioGroup
                value={answers[`${currentSection}-${question.id}`]}
                onChange={(value) => handleAnswer(value)}
                className="grid gap-4"
              >
                {question.options.map((option) => (
                  <div key={option.value} className="flex items-center space-x-2">
                    <RadioGroupItem value={option.value} id={option.value} />
                    <Label
                      htmlFor={option.value}
                      className="flex flex-1 items-center justify-between rounded-lg border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      {option.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
              <Button 
                onClick={goBack}
                className="w-1/2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
              >
                Back
              </Button>
            </div>
          )
        case "multiple":
          return (
            <div className="grid gap-4">
              {question.options.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <Checkbox
                    id={option.value}
                    checked={answers[`${currentSection}-${question.id}`]?.includes(option.value)}
                    onChange={(e) => {
                      const currentAnswers = answers[`${currentSection}-${question.id}`] || []
                      const updatedAnswers = e.target.checked
                        ? [...currentAnswers, option.value]
                        : currentAnswers.filter((value) => value !== option.value)
                      handleAnswer(updatedAnswers)
                    }}
                  />
                  <Label
                    htmlFor={option.value}
                    className="flex flex-1 items-center justify-between rounded-lg border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    {option.label}
                  </Label>
                </div>
              ))}
              <div className="flex gap-4 mt-4">
                <Button 
                  onClick={goBack}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                >
                  Back
                </Button>
                <Button 
                  onClick={moveToNextQuestion} 
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                >
                  Next
                </Button>
              </div>
            </div>
          )
        case "grid":
          return (
            <div className="space-y-4">
              {question.subQuestions.map((subQuestion, index) => (
                <div key={index} className="space-y-2">
                  <Label>{subQuestion}</Label>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    {[1, 2, 3, 4, 5].map((value) => (
                      <span key={value}>{value}</span>
                    ))}
                  </div>
                  <div className="flex justify-between">
                    {[1, 2, 3, 4, 5].map((value) => (
                      <div key={value} className="flex flex-col items-center">
                        <input
                          type="radio"
                          id={`${subQuestion}-${value}`}
                          name={`${currentSection}-${question.id}-${index}`}
                          value={value}
                          checked={answers[`${currentSection}-${question.id}`]?.[index] === value || (answers[`${currentSection}-${question.id}`]?.[index] === undefined && value === 3)}
                          onChange={() => {
                            const currentAnswers = answers[`${currentSection}-${question.id}`] || {}
                            handleAnswer({ ...currentAnswers, [index]: value })
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              <div className="flex gap-4 mt-4">
                <Button 
                  onClick={goBack}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                >
                  Back
                </Button>
                <Button 
                  onClick={moveToNextQuestion} 
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                >
                  Next
                </Button>
              </div>
            </div>
          )
        default:
          return null
      }
    }

    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            {SectionIcon && <SectionIcon className="w-4 h-4" />}
            <span>{currentSectionData.title}</span>
            <ChevronRight className="w-4 h-4" />
            <span>Question {getContinuousQuestionNumber()} of 18</span>
          </div>
          <Progress value={calculateProgress()} className="mb-4 h-2 bg-gray-200 rounded-full">
            <div className="bg-blue-600 h-full rounded-full" style={{ width: `${calculateProgress()}%` }}></div>
          </Progress>
          <CardTitle className="text-xl">{currentQuestion.question}</CardTitle>
        </CardHeader>
        <CardContent>
          {renderQuestion(currentQuestion)}
        </CardContent>
      </Card>
    )
  }

  const startQuiz = () => {
    setCurrentScreen("quiz")
  }

  const handleAnswer = (value) => {
    const currentQuestion = getCurrentQuestion();
    if (!currentQuestion) return;
    
    setAnswers((prev) => ({
      ...prev,
      [`${currentSection}-${currentQuestion.id}`]: value,
    }));

    // Automatically advance for single-choice questions
    if (currentQuestion.type === "single") {
      setTimeout(() => {
        moveToNextQuestion();
      }, 0);
    }
  };

  const moveToNextQuestion = () => {
    const currentQuestion = getCurrentQuestion();
    if (!currentQuestion) return;

    const currentSectionData = getCurrentSection();
    const currentSectionQuestions = currentSectionData.questions;
    
    if (currentQuestionIndex < currentSectionQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      const sectionKeys = Object.keys(quizSections);
      const currentSectionIndex = sectionKeys.indexOf(currentSection);
      if (currentSectionIndex < sectionKeys.length - 1) {
        setCurrentSection(sectionKeys[currentSectionIndex + 1]);
        setCurrentQuestionIndex(0);
      } else {
        calculateResults();
      }
    }
  };

  const calculateResults = () => {
    const results = {
      "Data Analyst": 0,
      "BI Analyst/Engineer": 0,
      "Business Analyst": 0,
      "Full Stack DS": 0,
      "Data Engineer": 0,
      "Analytics Engineer": 0,
      "Product DS": 0,
      "Experimentation DS": 0,
      "Research Scientist": 0,
      "ML Engineer": 0,
      "Marketing DS": 0,
    }

    // Ensure answers exist before processing
    if (answers) {
      // Engineering skills
      if (answers["technical-tech_skills"]) {
        const engineeringSkills = ["python", "sql", "big_data", "cloud"]
        const skillCount = answers["technical-tech_skills"].filter(skill =>
          engineeringSkills.includes(skill)
        ).length

        results["Data Engineer"] += skillCount * 15
        results["ML Engineer"] += skillCount * 15
        results["Full Stack DS"] += skillCount * 10
        results["Analytics Engineer"] += skillCount * 12
      }

      // Analytics skills
      if (answers["statistics-stats_concepts"]) {
        const statsScore = Object.values(answers["statistics-stats_concepts"]).reduce((a, b) => a + b, 0)
        results["Data Analyst"] += statsScore * 2
        results["BI Analyst/Engineer"] += statsScore * 2
        results["Business Analyst"] += statsScore * 2
        results["Product DS"] += statsScore * 1.5
      }

      // Research skills
      if (answers["research-research_experience"] === "phd") {
        results["Research Scientist"] += 50
        results["ML Engineer"] += 20
      }

      // Business skills
      if (answers["business-business_understanding"] === "expert") {
        results["Business Analyst"] += 40
        results["Marketing DS"] += 35
        results["Product DS"] += 35
      }

      // Causal Inference skills
      if (answers["statistics-causal_inference"] === "expert") {
        results["Experimentation DS"] += 50
        results["Research Scientist"] += 30
      }

      if (answers["statistics-ab_testing"] === "expert") {
        results["Experimentation DS"] += 40
        results["Product DS"] += 30
        results["Marketing DS"] += 25
      }

      // ML/AI skills
      if (answers["machineLearning-ml_concepts"]) {
        const mlScore = Object.values(answers["machineLearning-ml_concepts"]).reduce((a, b) => a + b, 0)
        results["ML Engineer"] += mlScore * 2
        results["Research Scientist"] += mlScore * 1.5
        results["Full Stack DS"] += mlScore
      }

      // Domain interests
      if (answers["interests-career_interests"]) {
        if (answers["interests-career_interests"].includes("business")) {
          results["Business Analyst"] += 20
          results["Marketing DS"] += 20
        }
        if (answers["interests-career_interests"].includes("engineering")) {
          results["Data Engineer"] += 25
          results["Analytics Engineer"] += 20
        }
        if (answers["interests-career_interests"].includes("research")) {
          results["Research Scientist"] += 25
          results["ML Engineer"] += 20
        }
      }
    }

    // Normalize scores
    const maxScore = Math.max(...Object.values(results))
    if (maxScore > 0) {
      for (let role in results) {
        results[role] = Math.round((results[role] / maxScore) * 100)
      }
    }

    // Filter out roles with 0% match
    const filteredResults = Object.fromEntries(
      Object.entries(results).filter(([_, value]) => value > 0)
    )

    setResults(filteredResults)
    setNormalizedResults(filteredResults)
    setCurrentScreen("results")
  }

  const calculateProgress = () => {
    const totalQuestions = Object.values(quizSections).reduce((acc, section) => acc + section.questions.length, 0);
    const completedQuestions = Object.keys(answers).filter(key => {
      const [section, questionId] = key.split('-');
      const sectionData = quizSections[section];
      if (!sectionData) return false;
      
      const question = sectionData.questions.find(q => q.id === questionId);
      if (!question) return false;
      
      if (question.type === 'multiple') {
        return answers[key].length > 0;
      }
      return answers[key] !== undefined;
    }).length;
    return (completedQuestions / totalQuestions) * 100;
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(24);
    doc.text('Data Science Path Quiz Results', 20, 20);
    doc.setFontSize(16);
    doc.text('Based on your responses, here are the roles that best suit you:', 20, 35);
    doc.setFontSize(12);
    
    // Add quiz results
    let yPos = 50;
    Object.entries(normalizedResults).forEach(([category, score]) => {
      doc.text(`${category}: ${Math.round(score)}%`, 20, yPos);
      yPos += 10;
    });

    // Add timestamp using a stable format
    const now = new Date();
    const dateStr = now.toISOString().split('T')[0];
    doc.setFontSize(10);
    doc.text(`Generated on: ${dateStr}`, 20, yPos + 10);

    // Save the PDF
    doc.save('data-science-quiz-results.pdf');
  }

  const getContinuousQuestionNumber = () => {
    const sectionKeys = Object.keys(quizSections);
    let questionNumber = 0;
    for (let i = 0; i < sectionKeys.length; i++) {
      if (sectionKeys[i] === currentSection) {
        questionNumber += currentQuestionIndex + 1;
        break;
      }
      questionNumber += quizSections[sectionKeys[i]].questions.length;
    }
    return questionNumber;
  }

  const WelcomeScreen = () => {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Data Science Quiz</h1>
          <p className="text-lg text-gray-600 mb-8">
            Test your knowledge of data science concepts, tools, and best practices.
            This quiz covers technical skills, soft skills, and industry knowledge.
          </p>
          <button
            onClick={() => setCurrentScreen('quiz')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
          >
            Start Quiz
          </button>
        </div>
      </div>
    );
  };

  const ResultsScreen = () => {
    if (!normalizedResults) {
      return <div>Loading results...</div>;
    }

    return (
      <Card className="w-full max-w-2xl mx-auto p-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-bold mb-4">Your Data Science Path Quiz Results</CardTitle>
          <p className="text-lg mb-6">Based on your responses, here are the roles that best suit you, ordered by fit:</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(normalizedResults).map(([role, score]) => (
              <div key={role} className="flex justify-between items-center bg-white text-black p-4 rounded-lg shadow-md">
                <span className="font-semibold">{role}:</span>
                <span className="text-xl font-bold">{Math.round(score)}%</span>
              </div>
            ))}
          </div>
          <div className="flex gap-4 mt-8">
            <Button 
              onClick={() => setCurrentScreen("quiz")}
              variant="outline"
              className="flex-1 bg-white text-blue-600 hover:bg-gray-100"
            >
              Back to Quiz
            </Button>
            <Button 
              onClick={downloadPDF} 
              className="flex-1 bg-blue-700 hover:bg-blue-800 text-white inline-flex items-center justify-center"
            >
              <Download className="mr-2 h-4 w-4" />
              Download Results
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!mounted) {
    return null;
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {currentScreen === 'welcome' && <WelcomeScreen />}
      {currentScreen === 'quiz' && <QuizScreen />}
      {currentScreen === 'results' && <ResultsScreen />}
    </main>
  );
}
