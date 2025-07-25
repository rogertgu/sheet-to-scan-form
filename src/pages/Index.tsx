import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const Index = () => {
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const handleAnswerChange = (questionNumber: number, answer: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionNumber]: answer
    }));
  };

  const generateExcel = () => {
    // Create CSV content
    let csvContent = "Pregunta,Respuesta\n";
    
    // Add main questions (1-103)
    for (let i = 1; i <= 103; i++) {
      const answer = answers[i] || "";
      csvContent += `${i},${answer}\n`;
    }
    
    // Add additional questions (1ª, 2ª, 3ª)
    for (let i = 104; i <= 106; i++) {
      const questionLabel = i === 104 ? "1ª" : i === 105 ? "2ª" : "3ª";
      const answer = answers[i] || "";
      csvContent += `${questionLabel},${answer}\n`;
    }

    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "respuestas.xlsx");
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const renderQuestion = (questionNumber: number, label?: string) => (
    <div key={questionNumber} className="question-item">
      <div className="question-number">{label || questionNumber}</div>
      <RadioGroup
        value={answers[questionNumber] || ""}
        onValueChange={(value) => handleAnswerChange(questionNumber, value)}
        className="answer-options"
      >
        {["A", "B", "C", "D"].map((option) => (
          <div key={option} className="answer-option">
            <RadioGroupItem
              value={option}
              id={`q${questionNumber}-${option}`}
              className="sr-only"
            />
            <Label
              htmlFor={`q${questionNumber}-${option}`}
              className={`answer-box ${answers[questionNumber] === option ? 'selected' : ''}`}
            >
              {option}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );

  const renderColumn = (start: number, end: number) => (
    <div className="question-column">
      <div className="column-header">
        {["A", "B", "C", "D"].map((letter) => (
          <div key={letter} className="header-letter">{letter}</div>
        ))}
      </div>
      {Array.from({ length: end - start + 1 }, (_, i) => start + i).map(questionNumber =>
        renderQuestion(questionNumber)
      )}
    </div>
  );

  return (
    <div className="exam-sheet">
      <div className="sheet-header">
        <h1>EXAMEN DE CUALIFICACIÓN INICIAL</h1>
      </div>
      
      <div className="questions-container">
        {/* First section: Questions 1-25 */}
        <div className="first-section">
          {renderColumn(1, 25)}
        </div>
        
        <div className="section-divider"></div>
        
        {/* Main sections: Questions 26-103 in 4 columns */}
        <div className="main-sections">
          {renderColumn(26, 45)}
          {renderColumn(46, 65)}
          {renderColumn(66, 85)}
          {renderColumn(86, 103)}
        </div>
        
        <div className="section-divider"></div>
        
        {/* Additional questions */}
        <div className="additional-questions">
          {renderQuestion(104, "1ª")}
          {renderQuestion(105, "2ª")}
          {renderQuestion(106, "3ª")}
        </div>
      </div>

      <div className="export-section">
        <Button onClick={generateExcel} className="export-button">
          Generar Hoja de Cálculo excel
        </Button>
      </div>
    </div>
  );
};

export default Index;
