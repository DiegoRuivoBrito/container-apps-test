import { useMemo, useState } from 'react';

const QUESTIONS = [
  {
    question: 'O que o Terraform usa para mapear recursos no provedor?',
    options: [
      'State file',
      'HCL file',
      'Plan file',
      'Backend',
      'Module',
    ],
    correct: 0,
  },
  {
    question: 'Qual comando inicializa um diretório Terraform e baixa providers?',
    options: ['terraform deploy', 'terraform init', 'terraform plan', 'terraform refresh', 'terraform validate'],
    correct: 1,
  },
  {
    question: 'Onde o Terraform guarda o estado dos recursos criados?',
    options: ['No provider', 'No state file', 'No backend remoto', 'Na variável', 'No arquivo de log'],
    correct: 1,
  },
  {
    question: 'Qual bloco define uma infraestrutura reutilizável no Terraform?',
    options: ['resource', 'data', 'module', 'provider', 'output'],
    correct: 2,
  },
  {
    question: 'Qual dos seguintes não é um tipo nativo de variável do Terraform?',
    options: ['string', 'number', 'boolean', 'object', 'function'],
    correct: 4,
  },
  {
    question: 'Como você aplica as mudanças planejadas pelo Terraform?',
    options: ['terraform plan', 'terraform validate', 'terraform init', 'terraform apply', 'terraform destroy'],
    correct: 3,
  },
  {
    question: 'Qual parâmetro define o provider a ser usado?',
    options: ['type', 'source', 'provider', 'backend', 'resource'],
    correct: 1,
  },
  {
    question: 'O que faz o comando `terraform plan`?',
    options: ['Cria recursos', 'Valida variáveis', 'Mostra mudanças esperadas', 'Apaga o estado', 'Registra provider'],
    correct: 2,
  },
  {
    question: 'Qual recurso é usado para acessar dados externos sem criar novo recurso?',
    options: ['resource', 'module', 'backend', 'data', 'output'],
    correct: 3,
  },
  {
    question: 'Qual bloco descreve quais saídas devem ser mostradas?',
    options: ['input', 'variable', 'output', 'provider', 'locals'],
    correct: 2,
  },
  {
    question: 'Como você evita expor uma senha em Terraform?',
    options: ['Usando backend local', 'Definindo variável como sensitive', 'Colocando no provider', 'Usando only_if', 'Criando recurso secreto'],
    correct: 1,
  },
  {
    question: 'O que faz `terraform destroy`?',
    options: ['Destrói recursos gerenciados', 'Aplica novas mudanças', 'Exibe o plano', 'Valida a configuração', 'Atualiza o estado'],
    correct: 0,
  },
  {
    question: 'Qual bloco do Terraform define o nome do recurso?',
    options: ['resource', 'provider', 'output', 'variable', 'data'],
    correct: 0,
  },
  {
    question: 'O que é HCL no contexto do Terraform?',
    options: ['Uma linguagem de programação', 'Um formato de configuração', 'Um provider', 'Um provedor de nuvem', 'Um tipo de recurso'],
    correct: 1,
  },
  {
    question: 'Qual comando atualiza o arquivo `.terraform.lock.hcl`?',
    options: ['terraform providers lock', 'terraform init', 'terraform fmt', 'terraform refresh', 'terraform show'],
    correct: 0,
  },
  {
    question: 'Para que serve um backend remoto no Terraform?',
    options: ['Armazenar logs', 'Guardar estado compartilhado', 'Executar provider', 'Criar variáveis', 'Mostrar outputs'],
    correct: 1,
  },
  {
    question: 'Como você define uma variável com valor padrão?',
    options: ['default = value', 'value = default', 'type = string', 'required = true', 'source = var'],
    correct: 0,
  },
  {
    question: 'O que é um provider no Terraform?',
    options: ['Um recurso de nuvem', 'Um plugin que fala com APIs', 'Um tipo de variável', 'Um backend remoto', 'Uma saída do app'],
    correct: 1,
  },
  {
    question: 'Onde você documenta o uso de uma variável?',
    options: ['in output', 'in backend', 'in description', 'in module', 'in provider'],
    correct: 2,
  },
  {
    question: 'Qual comando verifica se a configuração está sintaticamente correta?',
    options: ['terraform init', 'terraform apply', 'terraform validate', 'terraform plan', 'terraform graph'],
    correct: 2,
  },
];

function App() {
  const [selectedOptions, setSelectedOptions] = useState(Array(5).fill(null));
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const selectedQuestions = useMemo(() => {
    const shuffled = QUESTIONS.slice().sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 5);
  }, []);

  const handleOptionChange = (questionIndex, optionIndex) => {
    if (submitted) return;
    setSelectedOptions((current) => {
      const next = [...current];
      next[questionIndex] = optionIndex;
      return next;
    });
  };

  const handleSubmit = () => {
    const finalScore = selectedQuestions.reduce((acc, question, index) => {
      return acc + (selectedOptions[index] === question.correct ? 1 : 0);
    }, 0);
    setScore(finalScore);
    setSubmitted(true);
  };

  const unanswered = selectedOptions.some((option) => option === null);

  return (
    <div className="app-shell">
      <header className="hero">
        <div>
          <p className="eyebrow">Quiz Terraform</p>
          <h1>Teste seus conhecimentos em Terraform</h1>
          <p className="subtitle">
            Responda 5 perguntas aleatórias a cada carregamento. Depois de enviar, você
            verá sua nota final e as respostas corretas.
          </p>
        </div>
      </header>

      <main className="card-grid">
        <section className="quiz-card">
          {selectedQuestions.map((question, questionIndex) => (
            <article key={questionIndex} className="question-card">
              <div className="question-header">
                <span>Pergunta {questionIndex + 1}</span>
                <p>{question.question}</p>
              </div>
              <div className="answers-list">
                {question.options.map((option, optionIndex) => {
                  const isSelected = selectedOptions[questionIndex] === optionIndex;
                  const isCorrectAnswer = submitted && question.correct === optionIndex;
                  return (
                    <label
                      key={optionIndex}
                      className={`answer-option ${isSelected ? 'selected' : ''} ${isCorrectAnswer ? 'correct' : ''}`}
                    >
                      <input
                        type="radio"
                        name={`question-${questionIndex}`}
                        value={optionIndex}
                        checked={isSelected}
                        disabled={submitted}
                        onChange={() => handleOptionChange(questionIndex, optionIndex)}
                      />
                      {option}
                    </label>
                  );
                })}
              </div>
            </article>
          ))}

          <div className="actions-row">
            <button className="submit-button" onClick={handleSubmit} disabled={unanswered || submitted}>
              Confirmar respostas
            </button>
            {submitted && (
              <div className="result-box">
                Sua nota: <strong>{score} / 5</strong>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
