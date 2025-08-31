'use client';

import React, { useState, useEffect } from 'react';
import quizData from '../../population.json';

interface QuizItem {
  model: string;
  pk: number;
  fields: {
    quiz?: number;
    text?: string;
    nivel?: string;
    question?: number;
    is_correct?: boolean;
    title?: string;
    description?: string;
    time_limit?: number | null;
  };
}

interface Question {
  id: number;
  text: string;
  nivel: string;
  choices: Choice[];
}

interface Choice {
  id: number;
  text: string;
  isCorrect: boolean;
}

interface QuizInfo {
  title: string;
  description: string;
  nivel: string;
}

export default function Quiz() {
  const [quizInfo, setQuizInfo] = useState<QuizInfo | null>(null);
  const [allQuestions, setAllQuestions] = useState<Question[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(new Set());
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [showLevelSelection, setShowLevelSelection] = useState(false);

  useEffect(() => {
    processQuizData();
  }, []);

  useEffect(() => {
    if (timeLeft !== null && timeLeft > 0 && quizStarted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      finishQuiz();
    }
  }, [timeLeft, quizStarted]);

  const processQuizData = () => {
    const quizItems = quizData as QuizItem[];
    
    // Encontrar informações do quiz
    const quizInfoItem = quizItems.find(item => item.model === 'quiz.quiz');
    if (quizInfoItem) {
      setQuizInfo({
        title: quizInfoItem.fields.title || '',
        description: quizInfoItem.fields.description || '',
        nivel: quizInfoItem.fields.nivel || ''
      });
    }

    // Processar todas as perguntas e respostas
    const processedQuestions: Question[] = [];
    const questionItems = quizItems.filter(item => item.model === 'quiz.question');
    const choiceItems = quizItems.filter(item => item.model === 'quiz.choice');

    questionItems.forEach(questionItem => {
      const questionChoices = choiceItems.filter(
        choice => choice.fields.question === questionItem.pk
      );

      const choices: Choice[] = questionChoices.map(choice => ({
        id: choice.pk,
        text: choice.fields.text || '',
        isCorrect: choice.fields.is_correct || false
      }));

      processedQuestions.push({
        id: questionItem.pk,
        text: questionItem.fields.text || '',
        nivel: questionItem.fields.nivel || '',
        choices: choices
      });
    });

    setAllQuestions(processedQuestions);
  };

  const startQuiz = () => {
    // Se nenhum nível foi selecionado, usar todas as perguntas
    if (!selectedLevel) {
      setQuestions(allQuestions);
    }
    
    setQuizStarted(true);
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswer(null);
    setAnsweredQuestions(new Set());
    
    // Definir tempo limite se existir
    if (quizInfo && quizData[0]?.fields?.time_limit) {
      setTimeLeft(quizData[0].fields.time_limit);
    }
  };

  const selectLevel = (level: string) => {
    const levelQuestions = allQuestions.filter(q => q.nivel === level);
    setQuestions(levelQuestions);
    setSelectedLevel(level);
    setShowLevelSelection(false);
    // Iniciar o quiz automaticamente após selecionar o nível
    setQuizStarted(true);
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswer(null);
    setAnsweredQuestions(new Set());
    
    // Definir tempo limite se existir
    if (quizInfo && quizData[0]?.fields?.time_limit) {
      setTimeLeft(quizData[0].fields.time_limit);
    }
  };

  const showLevelSelectionScreen = () => {
    setShowLevelSelection(true);
  };

  const getLevelInfo = (level: string) => {
    const levelQuestions = allQuestions.filter(q => q.nivel === level);
    const levelNames = {
      'F': 'Fácil',
      'I': 'Intermediário', 
      'D': 'Difícil'
    };
    
    return {
      name: levelNames[level as keyof typeof levelNames] || level,
      count: levelQuestions.length,
      level: level
    };
  };

  const handleAnswerSelect = (choiceId: number) => {
    setSelectedAnswer(choiceId);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer !== null) {
      const currentQuestion = questions[currentQuestionIndex];
      const selectedChoice = currentQuestion.choices.find(choice => choice.id === selectedAnswer);
      
      if (selectedChoice?.isCorrect) {
        setScore(score + 1);
      }

      setAnsweredQuestions(prev => new Set([...prev, currentQuestion.id]));

      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer(null);
      } else {
        finishQuiz();
      }
    }
  };

  const finishQuiz = () => {
    setShowResult(true);
    setQuizStarted(false);
    setTimeLeft(null);
  };

  const resetQuiz = () => {
    setQuizStarted(false);
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswer(null);
    setAnsweredQuestions(new Set());
    setTimeLeft(null);
    // Manter o nível selecionado para tentar novamente
  };

  const resetToStart = () => {
    setQuizStarted(false);
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswer(null);
    setAnsweredQuestions(new Set());
    setTimeLeft(null);
    setSelectedLevel(null);
    setQuestions([]);
    setShowLevelSelection(false);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  if (!quizInfo || allQuestions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando quiz...</p>
        </div>
      </div>
    );
  }

  // Tela de seleção de nível
  if (showLevelSelection) {
    const levels = ['F', 'I', 'D'];
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-4xl w-full">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">🎯 Escolha o Nível de Dificuldade</h1>
            <p className="text-gray-600 text-lg mb-6">
              Selecione o nível que melhor se adequa ao seu conhecimento em logística e transporte
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {levels.map((level) => {
              const levelInfo = getLevelInfo(level);
              const getLevelColor = (level: string) => {
                switch(level) {
                  case 'F': return 'from-green-400 to-green-600';
                  case 'I': return 'from-yellow-400 to-yellow-600';
                  case 'D': return 'from-red-400 to-red-600';
                  default: return 'from-blue-400 to-blue-600';
                }
              };
              
              const getLevelEmoji = (level: string) => {
                switch(level) {
                  case 'F': return '🌱';
                  case 'I': return '🌿';
                  case 'D': return '🌳';
                  default: return '📚';
                }
              };

              return (
                <div 
                  key={level}
                  className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border-2 border-gray-200 hover:border-blue-300 transition-all duration-300 cursor-pointer transform hover:scale-105"
                  onClick={() => selectLevel(level)}
                >
                  <div className="text-center">
                    <div className="text-6xl mb-4">{getLevelEmoji(level)}</div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">{levelInfo.name}</h3>
                    <div className={`inline-block bg-gradient-to-r ${getLevelColor(level)} text-white px-4 py-2 rounded-full text-sm font-bold mb-4`}>
                      {level} - {levelInfo.count} perguntas
                    </div>
                    
                    <div className="space-y-2 text-sm text-gray-600">
                      {level === 'F' && (
                        <>
                          <p>• Conceitos básicos</p>
                          <p>• Terminologia fundamental</p>
                          <p>• Ideal para iniciantes</p>
                        </>
                      )}
                      {level === 'I' && (
                        <>
                          <p>• Conceitos intermediários</p>
                          <p>• Aplicações práticas</p>
                          <p>• Para quem já tem base</p>
                        </>
                      )}
                      {level === 'D' && (
                        <>
                          <p>• Conceitos avançados</p>
                          <p>• Análises complexas</p>
                          <p>• Para especialistas</p>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center">
            <button
              onClick={() => setShowLevelSelection(false)}
              className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
            >
              ← Voltar
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!quizStarted && !showResult && !showLevelSelection) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-3xl w-full">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">🧠 {quizInfo.title}</h1>
            <p className="text-gray-600 text-lg mb-6">{quizInfo.description}</p>
            
            {/* Informações do Quiz */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mb-6 border-2 border-blue-200">
              <h3 className="font-bold text-blue-800 text-xl mb-4">📋 Informações do Quiz</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">📊</span>
                  <div>
                    <p className="font-semibold text-gray-800">Total de perguntas</p>
                    <p className="text-blue-600 font-bold">{questions.length}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">🎯</span>
                  <div>
                    <p className="font-semibold text-gray-800">Nível</p>
                    <p className="text-blue-600 font-bold">{quizInfo.nivel}</p>
                  </div>
                </div>
                {quizData[0]?.fields?.time_limit && (
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">⏰</span>
                    <div>
                      <p className="font-semibold text-gray-800">Tempo limite</p>
                      <p className="text-blue-600 font-bold">{formatTime(quizData[0].fields.time_limit)}</p>
                    </div>
                  </div>
                )}
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">📚</span>
                  <div>
                    <p className="font-semibold text-gray-800">Tema</p>
                    <p className="text-blue-600 font-bold">Transporte e Logística</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Instruções */}
            <div className="bg-yellow-50 rounded-xl p-6 mb-6 border-2 border-yellow-200">
              <h3 className="font-bold text-yellow-800 text-xl mb-3">📝 Instruções</h3>
              <ul className="text-left space-y-2 text-gray-700">
                <li className="flex items-start space-x-2">
                  <span className="text-yellow-600">•</span>
                  <span>Escolha o nível de dificuldade que melhor se adequa ao seu conhecimento</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-yellow-600">•</span>
                  <span>Leia cada pergunta com atenção antes de responder</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-yellow-600">•</span>
                  <span>Selecione apenas uma alternativa por pergunta</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-yellow-600">•</span>
                  <span>Você pode ver seu progresso em tempo real</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-yellow-600">•</span>
                  <span>Ao final, você verá seu resultado detalhado</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={showLevelSelectionScreen}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg transition duration-300 transform hover:scale-105 text-xl"
            >
              🎯 Escolher Nível
            </button>
            <button
              onClick={startQuiz}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-lg transition duration-300 transform hover:scale-105 text-xl"
            >
              🚀 Quiz Completo
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (showResult) {
    const percentage = Math.round((score / questions.length) * 100);
    const correctAnswers = score;
    const wrongAnswers = questions.length - score;
    
    const getResultMessage = () => {
      if (percentage >= 80) return { 
        message: "🎉 Excelente! Você domina o conteúdo!", 
        color: "text-green-600",
        emoji: "🏆"
      };
      if (percentage >= 60) return { 
        message: "👍 Bom trabalho! Continue assim!", 
        color: "text-blue-600",
        emoji: "⭐"
      };
      if (percentage >= 40) return { 
        message: "📚 Precisa melhorar! Estude mais!", 
        color: "text-yellow-600",
        emoji: "📖"
      };
      return { 
        message: "💪 Continue estudando! Você consegue!", 
        color: "text-red-600",
        emoji: "🔥"
      };
    };

    const result = getResultMessage();

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-3xl w-full text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">📊 Resultado do Quiz</h2>
          {selectedLevel && (
            <div className="mb-4">
              <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-semibold">
                Nível: {getLevelInfo(selectedLevel).name}
              </span>
            </div>
          )}
          
          {/* Resultado Principal */}
          <div className="mb-8">
            <div className="text-7xl font-bold text-blue-600 mb-4">{percentage}%</div>
            <div className="text-4xl mb-2">{result.emoji}</div>
            <p className={`text-2xl font-semibold ${result.color} mb-2`}>{result.message}</p>
            <p className="text-gray-600 text-lg">
              Você acertou <span className="font-bold text-green-600">{correctAnswers}</span> de <span className="font-bold">{questions.length}</span> perguntas
            </p>
          </div>

          {/* Estatísticas Detalhadas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-green-100 rounded-xl p-6 border-2 border-green-200">
              <div className="text-4xl mb-2">✅</div>
              <h3 className="font-bold text-green-800 text-lg mb-2">Acertos</h3>
              <p className="text-3xl font-bold text-green-600">{correctAnswers}</p>
              <p className="text-sm text-green-700 mt-1">
                {Math.round((correctAnswers / questions.length) * 100)}% do total
              </p>
            </div>
            
            <div className="bg-red-100 rounded-xl p-6 border-2 border-red-200">
              <div className="text-4xl mb-2">❌</div>
              <h3 className="font-bold text-red-800 text-lg mb-2">Erros</h3>
              <p className="text-3xl font-bold text-red-600">{wrongAnswers}</p>
              <p className="text-sm text-red-700 mt-1">
                {Math.round((wrongAnswers / questions.length) * 100)}% do total
              </p>
            </div>
            
            <div className="bg-blue-100 rounded-xl p-6 border-2 border-blue-200">
              <div className="text-4xl mb-2">📝</div>
              <h3 className="font-bold text-blue-800 text-lg mb-2">Total</h3>
              <p className="text-3xl font-bold text-blue-600">{questions.length}</p>
              <p className="text-sm text-blue-700 mt-1">Perguntas respondidas</p>
            </div>
          </div>

          {/* Barra de Progresso Visual */}
          <div className="mb-8">
            <h3 className="font-semibold text-gray-700 mb-3">Distribuição de Respostas</h3>
            <div className="flex h-8 rounded-full overflow-hidden border-2 border-gray-200">
              <div 
                className="bg-green-500 flex items-center justify-center text-white font-bold text-sm"
                style={{ width: `${(correctAnswers / questions.length) * 100}%` }}
              >
                {correctAnswers > 0 && `${correctAnswers}`}
              </div>
              <div 
                className="bg-red-500 flex items-center justify-center text-white font-bold text-sm"
                style={{ width: `${(wrongAnswers / questions.length) * 100}%` }}
              >
                {wrongAnswers > 0 && `${wrongAnswers}`}
              </div>
            </div>
            <div className="flex justify-between text-sm text-gray-600 mt-2">
              <span>✅ Acertos</span>
              <span>❌ Erros</span>
            </div>
          </div>

          {/* Mensagem Motivacional */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 mb-8 border-l-4 border-blue-400">
            <p className="text-gray-700 font-medium">
              {percentage >= 80 
                ? "Parabéns! Você demonstrou excelente conhecimento em logística e transporte!"
                : percentage >= 60
                ? "Bom trabalho! Com um pouco mais de estudo, você pode melhorar ainda mais!"
                : percentage >= 40
                ? "Não desanime! Cada erro é uma oportunidade de aprendizado. Continue estudando!"
                : "Não se preocupe! O importante é continuar aprendendo. Revise o conteúdo e tente novamente!"
              }
            </p>
          </div>

          {/* Botões de Ação */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={resetQuiz}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg transition duration-300 transform hover:scale-105"
            >
              🔄 Tentar Novamente
            </button>
            <button
              onClick={showLevelSelectionScreen}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-lg transition duration-300 transform hover:scale-105"
            >
              🎯 Outro Nível
            </button>
            <button
              onClick={resetToStart}
              className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-bold py-4 px-8 rounded-lg transition duration-300 transform hover:scale-105"
            >
              🏠 Voltar ao Início
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header com progresso e tempo */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-2 sm:mb-0">
              Pergunta {currentQuestionIndex + 1} de {questions.length}
            </h2>
            {timeLeft !== null && (
              <div className="bg-red-100 rounded-lg px-4 py-2">
                <span className="text-red-800 font-semibold">
                  ⏰ Tempo: {formatTime(timeLeft)}
                </span>
              </div>
            )}
          </div>
          
          {/* Barra de progresso */}
          <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
            <div 
              className="bg-blue-600 h-3 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          
          {/* Estatísticas em tempo real */}
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="bg-green-100 rounded-lg p-3 text-center">
              <div className="text-sm font-semibold text-green-800">✅ Acertos</div>
              <div className="text-xl font-bold text-green-600">{score}</div>
            </div>
            <div className="bg-red-100 rounded-lg p-3 text-center">
              <div className="text-sm font-semibold text-red-800">❌ Erros</div>
              <div className="text-xl font-bold text-red-600">{answeredQuestions.size - score}</div>
            </div>
            <div className="bg-blue-100 rounded-lg p-3 text-center">
              <div className="text-sm font-semibold text-blue-800">📊 Progresso</div>
              <div className="text-xl font-bold text-blue-600">{Math.round((answeredQuestions.size / questions.length) * 100)}%</div>
            </div>
          </div>
          
          <div className="text-sm text-gray-600">
            Nível: {currentQuestion.nivel}
          </div>
        </div>

        {/* Pergunta */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">
            {currentQuestion.text}
          </h3>

          {/* Alternativas */}
          <div className="space-y-3">
            {currentQuestion.choices.map((choice) => (
              <button
                key={choice.id}
                onClick={() => handleAnswerSelect(choice.id)}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                  selectedAnswer === choice.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <span className="font-medium text-gray-800">{choice.text}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Botão de próxima pergunta */}
        <div className="flex justify-end">
          <button
            onClick={handleNextQuestion}
            disabled={selectedAnswer === null}
            className={`px-8 py-3 rounded-lg font-semibold transition-all duration-300 ${
              selectedAnswer === null
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 text-white transform hover:scale-105'
            }`}
          >
            {currentQuestionIndex === questions.length - 1 ? 'Finalizar' : 'Próxima Pergunta'}
          </button>
        </div>
      </div>
    </div>
  );
} 