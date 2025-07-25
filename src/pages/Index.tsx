import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import * as XLSX from 'xlsx';

const Index = () => {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [textField, setTextField] = useState("");
  const [fileName, setFileName] = useState("respuestas");

  const handleAnswerChange = (questionNumber: number, answer: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionNumber]: answer
    }));
  };

  const generateExcel = () => {
    // Create data array for Excel
    const data = [];
    
    // Add header row
    data.push(['Pregunta', 'Respuesta']);
    
    // Add main questions (1-100)
    for (let i = 1; i <= 100; i++) {
      const answer = answers[i] || "";
      data.push([i.toString(), answer]);
    }
    
    // Add additional questions (1ª, 2ª, 3ª) - questions 101, 102, 103
    for (let i = 101; i <= 103; i++) {
      const questionLabel = i === 101 ? "1ª" : i === 102 ? "2ª" : "3ª";
      const answer = answers[i] || "";
      data.push([questionLabel, answer]);
    }

    // Add text field data if provided
    if (textField.trim()) {
      data.push(['Texto adicional', textField]);
    }

    // Create workbook and worksheet
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(data);
    
    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(wb, ws, "Respuestas");
    
    // Generate Excel file and download
    const filename = fileName.trim() ? `${fileName}.xlsx` : 'respuestas.xlsx';
    XLSX.writeFile(wb, filename);
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
      
      <div className="header-fields">
        <div className="field-group">
          <Label htmlFor="textField">Texto adicional (máx. 100 caracteres):</Label>
          <Input
            id="textField"
            value={textField}
            onChange={(e) => setTextField(e.target.value.slice(0, 100))}
            maxLength={100}
            placeholder="Escriba aquí..."
          />
          <span className="char-counter">{textField.length}/100</span>
        </div>
        <div className="field-group">
          <Label htmlFor="fileName">Nombre del archivo:</Label>
          <Input
            id="fileName"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            placeholder="respuestas"
          />
        </div>
      </div>
      
      <div className="questions-container">
        {/* First section: Questions 1-25 in 5 columns */}
        <div className="first-section">
          {renderColumn(1, 5)}
          {renderColumn(6, 10)}
          {renderColumn(11, 15)}
          {renderColumn(16, 20)}
          {renderColumn(21, 25)}
        </div>
        
        <div className="section-divider"></div>
        
        {/* Main sections: Questions 26-100 in 5 columns */}
        <div className="main-sections">
          {renderColumn(26, 40)}
          {renderColumn(41, 55)}
          {renderColumn(56, 70)}
          {renderColumn(71, 85)}
          {renderColumn(86, 100)}
        </div>
        
        <div className="section-divider"></div>
        
        {/* Additional questions */}
        <div className="additional-questions">
          {renderQuestion(101, "1ª")}
          {renderQuestion(102, "2ª")}
          {renderQuestion(103, "3ª")}
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
