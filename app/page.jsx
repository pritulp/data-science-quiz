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
import { motion, AnimatePresence } from "framer-motion";
import { quizSections, roleDefinitions } from "./data/quizData";

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
  const [currentScreen, setCurrentScreen] = useState('welcome');
  const [currentSection, setCurrentSection] = useState('qualification');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState(null);
  const [normalizedResults, setNormalizedResults] = useState(null);
  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showResults, setShowResults] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsClient(true);
    setMounted(true);
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (results && Object.keys(results).length > 0) {
      const maxScore = Math.max(...Object.values(results))
      const normalized = {}

      for (let role in results) {
        normalized[role] = Math.round((results[role] / maxScore) * 100)
      }

      setNormalizedResults(normalized)
    }
  }, [results])

  const startQuiz = () => {
    setCurrentScreen("quiz")
  }

  const handleAnswer = (value) => {
    try {
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
    } catch (err) {
      console.error("Error handling answer:", err);
      setError("Failed to process your answer. Please try again.");
    }
  };

  const moveToNextQuestion = () => {
    try {
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
    } catch (err) {
      console.error("Error moving to next question:", err);
      setError("Failed to move to the next question. Please try again.");
    }
  };

  const calculateResults = () => {
    try {
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
      setShowResults(true)
    } catch (err) {
      console.error("Error calculating results:", err);
      setError("Failed to calculate your results. Please try again.");
    }
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

  const getCurrentSection = () => {
    try {
      return quizSections[currentSection];
    } catch (err) {
      console.error("Error getting current section:", err);
      return null;
    }
  };

  const getCurrentQuestion = () => {
    try {
      const section = getCurrentSection();
      if (!section || !section.questions) return null;
      return section.questions[currentQuestionIndex];
    } catch (err) {
      console.error("Error getting current question:", err);
      return null;
    }
  };

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

  const QuizScreen = () => {
    if (isLoading) {
      return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center">
          <div className="text-xl">Loading quiz...</div>
        </div>
      );
    }

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

  if (!isClient) {
    return null; // or a loading spinner
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {currentScreen === 'welcome' && <WelcomeScreen />}
      {currentScreen === 'quiz' && <QuizScreen />}
      {currentScreen === 'results' && <ResultsScreen />}
    </main>
  );
}
